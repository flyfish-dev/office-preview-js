import { parseExcelWorkbook } from './data.js';
import { clamp, shouldVirtualizeSheetModel } from './shared.js';

let loadedWorkbook = null;

self.onmessage = async (event) => {
  const message = event.data || {};
  const { id, type } = message;
  try {
    if (type === 'load') {
      await loadWorkbook(id, message.input, message.options || {});
      return;
    }
    if (type === 'window') {
      postWindow(id, message.sheetId, message.range || {});
      return;
    }
    if (type === 'dispose') {
      loadedWorkbook = null;
      post(id, 'disposed', {});
      return;
    }
    throw new Error(`Unknown excel worker message: ${type}`);
  } catch (error) {
    post(id, 'error', {
      message: error?.message || String(error),
      stack: error?.stack || ''
    });
  }
};

async function loadWorkbook(id, input, options) {
  postProgress(id, 'received', 0.04, '已接收文件，准备解析');
  postProgress(id, 'parsing', 0.12, '正在 worker 中解析工作簿');
  const workbook = await parseExcelWorkbook(input, options);

  postProgress(id, 'normalizing', 0.82, '正在整理工作表结构');
  const shell = createWorkbookShell(workbook, options);
  loadedWorkbook = { workbook, shell, options };

  postProgress(id, 'ready', 1, '工作簿已准备完成', {
    sheets: shell.sheets.length,
    windowedSheets: shell.sheets.filter((sheet) => sheet.virtualWindowed).length
  });
  post(id, 'ready', { workbook: shell });
}

function postWindow(id, sheetId, range) {
  if (!loadedWorkbook?.workbook) throw new Error('Workbook is not loaded');
  const sheet = loadedWorkbook.workbook.sheets.find((item) => String(item.id) === String(sheetId));
  if (!sheet) throw new Error(`Sheet not found: ${sheetId}`);
  const windowData = buildSheetWindow(sheet, range);
  post(id, 'window', { window: windowData });
}

function createWorkbookShell(model, options) {
  return {
    kind: model.kind,
    engine: model.engine,
    format: model.format,
    workbook: compactWorkbookInfo(model.workbook),
    cellImageMap: model.cellImageMap,
    sheets: model.sheets.map((sheet) => createSheetShell(sheet, model, options)),
    activeSheetId: model.activeSheetId,
    warnings: model.warnings || []
  };
}

function compactWorkbookInfo(workbook = {}) {
  return {
    activeSheet: workbook.activeSheet,
    defaultFont: workbook.defaultFont,
    date1904: workbook.date1904,
    properties: workbook.properties,
    themeColors: workbook.themeColors
  };
}

function createSheetShell(sheet, model, options) {
  const virtualWindowed = shouldVirtualizeSheetModel(sheet, options);
  const source = virtualWindowed ? compactSheetSource(sheet.source, model) : sheet.source;
  return {
    id: sheet.id,
    sourceIndex: sheet.sourceIndex,
    name: sheet.name,
    hidden: sheet.hidden,
    veryHidden: sheet.veryHidden,
    rowCount: sheet.rowCount,
    colCount: sheet.colCount,
    virtualWindowed,
    source,
    model: {
      data: virtualWindowed ? [] : sheet.model?.data || [],
      cells: virtualWindowed ? new Map() : sheet.model?.cells,
      merges: source.merges || [],
      columns: source.columns || [],
      rowDefs: source.rowDefs,
      sheetFormat: source.sheetFormat
    }
  };
}

function compactSheetSource(source = {}, model) {
  return {
    name: source.name,
    hidden: source.hidden,
    veryHidden: source.veryHidden,
    columns: source.columns || [],
    rowDefs: source.rowDefs,
    sheetFormat: source.sheetFormat,
    merges: source.merges || [],
    images: source.images || [],
    charts: hydrateCharts(source.charts || [], model, source.name),
    textBoxes: source.textBoxes || [],
    backgroundImage: source.backgroundImage,
    cells: new Map(),
    rows: [],
    rowWindow: null,
    rowWindows: [],
    windowRange: null
  };
}

function hydrateCharts(charts, model, currentSheetName) {
  return charts.map((chart) => ({
    ...chart,
    series: (chart.series || []).map((series) => ({
      ...series,
      cachedValues: chartRangeValuesOrCache(model, series.valuesRef, currentSheetName, series.cachedValues),
      cachedCategories: chartRangeValuesOrCache(model, series.categoriesRef, currentSheetName, series.cachedCategories)
    }))
  }));
}

function chartRangeValuesOrCache(model, ref, currentSheetName, cachedValues) {
  const rangeValues = readWorkbookRange(model, ref, currentSheetName);
  return rangeValues.length ? rangeValues : cachedValues || [];
}

function buildSheetWindow(sheet, requestedRange) {
  const range = normalizeRange(sheet, requestedRange);
  const readRange = expandRange(sheet, range, 1, 1);
  const cells = new Map();

  for (let row = readRange.rowStart; row <= readRange.rowEnd; row += 1) {
    for (let col = readRange.colStart; col <= readRange.colEnd; col += 1) {
      const cell = getSourceCell(sheet, row, col);
      if (cell !== undefined) cells.set(`${row},${col}`, cell);
    }
  }

  for (const merge of sheet.source.merges || []) {
    if (!mergeIntersectsRange(merge, readRange)) continue;
    addMergeStartCell(sheet, cells, merge.startRow, merge.startCol);
  }

  return {
    sheetId: sheet.id,
    range,
    readRange,
    cells,
    rowWindow: extractRows(sheet, readRange),
    stats: {
      cellCount: cells.size,
      rowCount: readRange.rowEnd - readRange.rowStart + 1,
      colCount: readRange.colEnd - readRange.colStart + 1
    }
  };
}

function normalizeRange(sheet, range) {
  const maxRow = Math.max(0, sheet.rowCount - 1);
  const maxCol = Math.max(0, sheet.colCount - 1);
  const rowStart = clamp(toInteger(range.rowStart, 0), 0, maxRow);
  const rowEnd = clamp(toInteger(range.rowEnd, rowStart), rowStart, maxRow);
  const colStart = clamp(toInteger(range.colStart, 0), 0, maxCol);
  const colEnd = clamp(toInteger(range.colEnd, colStart), colStart, maxCol);
  return { rowStart, rowEnd, colStart, colEnd };
}

function expandRange(sheet, range, rowPad, colPad) {
  return {
    rowStart: clamp(range.rowStart - rowPad, 0, Math.max(0, sheet.rowCount - 1)),
    rowEnd: clamp(range.rowEnd + rowPad, 0, Math.max(0, sheet.rowCount - 1)),
    colStart: clamp(range.colStart - colPad, 0, Math.max(0, sheet.colCount - 1)),
    colEnd: clamp(range.colEnd + colPad, 0, Math.max(0, sheet.colCount - 1))
  };
}

function extractRows(sheet, range) {
  const rows = [];
  for (let row = range.rowStart; row <= range.rowEnd; row += 1) {
    const values = sheet.source.rows?.[row] || [];
    rows.push(values.slice(range.colStart, range.colEnd + 1));
  }
  return {
    startRow: range.rowStart,
    endRow: range.rowEnd,
    startCol: range.colStart,
    endCol: range.colEnd,
    rows
  };
}

function addMergeStartCell(sheet, cells, row, col) {
  const key = `${row},${col}`;
  if (cells.has(key)) return;
  const cell = getSourceCell(sheet, row, col);
  if (cell !== undefined) {
    cells.set(key, cell);
    return;
  }
  const value = sheet.source.rows?.[row]?.[col];
  if (value !== undefined && value !== null && value !== '') cells.set(key, { value });
}

function readWorkbookRange(model, ref, currentSheetName) {
  const parsed = parseA1Range(ref, currentSheetName);
  if (!parsed) return [];
  const sheetModel = model.sheets.find((item) => item.name === parsed.sheetName) || model.sheets[0];
  const sheet = sheetModel?.source;
  if (!sheet) return [];
  const values = [];
  for (let row = parsed.startRow; row <= parsed.endRow; row += 1) {
    for (let col = parsed.startCol; col <= parsed.endCol; col += 1) {
      const cell = sheet.cells?.get?.(`${row},${col}`);
      values.push(cell?.formulaResult ?? cell?.value ?? sheet.rows?.[row]?.[col] ?? null);
    }
  }
  return values;
}

function getSourceCell(sheet, row, col) {
  return getMapValue(sheet.source?.cells, `${row},${col}`);
}

function getMapValue(mapLike, key) {
  if (!mapLike) return undefined;
  if (typeof mapLike.get === 'function') return mapLike.get(key);
  return mapLike[key];
}

function parseA1Range(ref, currentSheetName) {
  if (!ref || typeof ref !== 'string') return undefined;
  const match = ref.replace(/\$/g, '').match(/^(?:(?:'((?:[^']|'')+)'|([^!]+))!)?([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/i);
  if (!match) return undefined;
  const sheetName = (match[1] || match[2] || currentSheetName || '').replace(/''/g, "'");
  const startCol = decodeColumn(match[3]);
  const startRow = Number(match[4]) - 1;
  const endCol = match[5] ? decodeColumn(match[5]) : startCol;
  const endRow = match[6] ? Number(match[6]) - 1 : startRow;
  if ([startCol, startRow, endCol, endRow].some((value) => !Number.isFinite(value) || value < 0)) return undefined;
  return {
    sheetName,
    startRow: Math.min(startRow, endRow),
    endRow: Math.max(startRow, endRow),
    startCol: Math.min(startCol, endCol),
    endCol: Math.max(startCol, endCol)
  };
}

function decodeColumn(value) {
  let index = 0;
  for (const char of String(value).toUpperCase()) index = index * 26 + char.charCodeAt(0) - 64;
  return index - 1;
}

function mergeIntersectsRange(merge, range) {
  return merge.startRow <= range.rowEnd &&
    merge.endRow >= range.rowStart &&
    merge.startCol <= range.colEnd &&
    merge.endCol >= range.colStart;
}

function toInteger(value, fallback) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.floor(numeric) : fallback;
}

function postProgress(id, stage, progress, message, detail = {}) {
  post(id, 'progress', { stage, progress, message, detail });
}

function post(id, type, payload) {
  self.postMessage({ id, type, ...payload });
}
