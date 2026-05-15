(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e,t){return new URL(e,t).href},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:e,o||(l.as=`script`),l.crossOrigin=``,l.href=i,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,t)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[])t.status===`rejected`&&s(t.reason);return r().catch(s)})},i=[{id:`doc-comprehensive`,format:`doc`,title:`DOC 综合样例`,detail:`联通用户中心登录认证接口规范`,path:`samples/office-demo.doc`},{id:`docx-comprehensive`,format:`docx`,title:`DOCX 综合样例`,detail:`中移铁通档案管理系统测试文档`,path:`samples/office-demo.docx`},{id:`ppt-comprehensive`,format:`ppt`,title:`PPT 综合样例`,detail:`PowerPoint 97-2003 演示文稿`,path:`samples/office-demo.ppt`},{id:`pptx-comprehensive`,format:`pptx`,title:`PPTX 综合样例`,detail:`PowerPoint Open XML 演示文稿`,path:`samples/office-demo.pptx`},{id:`xls-comprehensive`,format:`xls`,title:`XLS 综合样例`,detail:`Excel 97-2003 工作簿样式与表格检查`,path:`samples/office-demo.xls`},{id:`xlsx-comprehensive`,format:`xlsx`,title:`XLSX 综合样例`,detail:`Excel 工作簿样式与表格检查`,path:`samples/office-demo.xlsx`}],a={doc:{label:`DOC`,icon:`W`,group:`文档预览`,tone:`blue`,category:`document`,theme:`word`},docx:{label:`DOCX`,icon:`W`,group:`文档预览`,tone:`blue`,category:`document`,theme:`word`},ppt:{label:`PPT`,icon:`P`,group:`演示文稿`,tone:`orange`,category:`presentation`,theme:`powerpoint`},pptx:{label:`PPTX`,icon:`P`,group:`演示文稿`,tone:`orange`,category:`presentation`,theme:`powerpoint`},xls:{label:`XLS`,icon:`X`,group:`电子表格`,tone:`green`,category:`spreadsheet`,theme:`excel`},xlsx:{label:`XLSX`,icon:`X`,group:`电子表格`,tone:`green`,category:`spreadsheet`,theme:`excel`},xlsb:{label:`XLSB`,icon:`X`,group:`电子表格`,tone:`green`,category:`spreadsheet`,theme:`excel`}},o={all:{label:`全部格式`,sampleTitle:`选择文件格式`},document:{label:`文档预览`,sampleTitle:`Word 文档预览`},presentation:{label:`演示文稿`,sampleTitle:`PowerPoint 演示预览`},spreadsheet:{label:`电子表格`,sampleTitle:`Excel 表格预览`}},s=X();document.body.classList.toggle(`embed-mode`,s),document.body.dataset.theme=K(i[0].format);var c={selectedId:`doc-comprehensive`,activeCategory:`all`,currentBytes:null,currentTitle:``,currentFormat:``,modules:new Map,wasmRuntimePromise:null,wasmCorePromise:null,externalSource:null,embedMode:s,diagnosticsOpen:!1,requestToken:0,layoutFrame:0,activeViewerHandle:null},l=document.querySelector(`#app`);l.innerHTML=`
  <main class="app-shell${s?` embed-mode`:``}">
    <aside class="sidebar">
      <div class="brand-block">
        <div class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 56 56" focusable="false">
            <rect class="logo-shadow-page" x="9" y="15" width="30" height="29" rx="7"></rect>
            <rect class="logo-main-page" x="16" y="9" width="31" height="35" rx="8"></rect>
            <path class="logo-fold" d="M37 9v9h10"></path>
            <path class="logo-line" d="M23 21h13M23 27h17"></path>
            <path class="logo-chart" d="M24 36l5-6 5 4 5-7 4 9"></path>
            <circle class="logo-dot logo-dot-a" cx="13" cy="40" r="4"></circle>
            <circle class="logo-dot logo-dot-b" cx="22" cy="44" r="4"></circle>
            <circle class="logo-dot logo-dot-c" cx="31" cy="44" r="4"></circle>
          </svg>
        </div>
        <div class="brand-copy">
          <strong>Office 预览 Demo</strong>
          <span>本地 WASM 校验与渲染</span>
        </div>
      </div>

      <nav class="side-nav" aria-label="Demo 导航">
        <button type="button" class="side-nav-item active" data-category="all" aria-current="page"><span class="nav-dot"></span>首页</button>
        <button type="button" class="side-nav-item" data-category="document"><span class="nav-dot"></span>文档预览</button>
        <button type="button" class="side-nav-item" data-category="presentation"><span class="nav-dot"></span>演示文稿</button>
        <button type="button" class="side-nav-item" data-category="spreadsheet"><span class="nav-dot"></span>电子表格</button>
      </nav>

      <div class="sidebar-note">
        <span>运行模式</span>
        <strong>按需加载</strong>
        <small>仅在选择格式后加载对应 WASM 与渲染模块。</small>
      </div>
    </aside>

    <section class="app-main">
      <header class="app-header">
        <div class="hero-copy">
          <p class="eyebrow">OFFICE PREVIEW</p>
          <h1>多格式文档预览体验</h1>
          <p>支持 DOC、DOCX、PPT、PPTX、XLS、XLSX 的本地预览与渲染检查。</p>
        </div>
        <div class="top-actions">
          <button id="renderButton" class="primary-button">渲染当前文件</button>
          <label class="upload-button">
            <input id="fileInput" type="file" accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.xlsb" />
            <span>上传文件</span>
          </label>
        </div>
      </header>

      <section class="sample-section" aria-label="内置综合样例">
        <div class="section-heading">
          <div>
            <p class="section-kicker">内置综合样例</p>
            <h2 id="sectionTitle">选择文件格式</h2>
          </div>
          <label class="sample-select-field">
            <span>快速选择</span>
            <select id="sampleSelect"></select>
          </label>
        </div>
        <div id="sampleGrid" class="sample-grid"></div>
      </section>

      <section class="preview-card">
        <div class="card-title">
          <h2>页面预览</h2>
          <span id="byteStatus">0 KB</span>
        </div>
        <div class="preview-stage">
          <section class="preview-toolbar" aria-label="当前文件状态">
            <div class="current-file">
              <span id="formatBadge" class="format-badge">DOC</span>
              <div>
                <strong id="fileTitle">DOC 综合样例</strong>
                <small id="fileDetail">联通用户中心登录认证接口规范</small>
              </div>
            </div>
            <div class="status-strip">
              <div><span>状态</span><strong id="renderStatus">未渲染</strong></div>
              <div><span>耗时</span><strong id="timeStatus">0 ms</strong></div>
              <div><span>模型</span><strong id="modelStatus">-</strong></div>
              <div><span>WASM</span><strong id="wasmStatus">未加载</strong></div>
            </div>
          </section>
          <div id="preview" class="preview ${s?`preview-loading`:`preview-empty`}">
            ${s?A(`正在加载文档...`):``}
          </div>
        </div>
      </section>
    </section>

    <button id="diagnosticsToggle" class="diagnostics-fab" type="button" aria-expanded="false" aria-controls="diagnosticsDrawer">
      解析诊断
    </button>
    <div id="diagnosticsOverlay" class="diagnostics-overlay" hidden></div>
    <aside id="diagnosticsDrawer" class="diagnostics-drawer" aria-hidden="true">
      <div class="drawer-title">
        <div>
          <span>诊断信息</span>
          <h2>解析与 WASM 状态</h2>
        </div>
        <button id="diagnosticsClose" class="plain-button" type="button">关闭</button>
      </div>
      <pre id="diagnostics">请选择样例或上传文件，然后点击“渲染当前文件”。</pre>
      <div class="drawer-actions">
        <button id="clearButton" class="plain-button" type="button">清空当前预览</button>
      </div>
    </aside>
  </main>
`;var u={appShell:document.querySelector(`.app-shell`),navItems:document.querySelectorAll(`.side-nav-item`),sectionTitle:document.querySelector(`#sectionTitle`),sampleSelect:document.querySelector(`#sampleSelect`),sampleGrid:document.querySelector(`#sampleGrid`),fileInput:document.querySelector(`#fileInput`),renderButton:document.querySelector(`#renderButton`),clearButton:document.querySelector(`#clearButton`),diagnosticsToggle:document.querySelector(`#diagnosticsToggle`),diagnosticsOverlay:document.querySelector(`#diagnosticsOverlay`),diagnosticsDrawer:document.querySelector(`#diagnosticsDrawer`),diagnosticsClose:document.querySelector(`#diagnosticsClose`),formatBadge:document.querySelector(`#formatBadge`),fileTitle:document.querySelector(`#fileTitle`),fileDetail:document.querySelector(`#fileDetail`),renderStatus:document.querySelector(`#renderStatus`),timeStatus:document.querySelector(`#timeStatus`),modelStatus:document.querySelector(`#modelStatus`),wasmStatus:document.querySelector(`#wasmStatus`),byteStatus:document.querySelector(`#byteStatus`),preview:document.querySelector(`#preview`),diagnostics:document.querySelector(`#diagnostics`)};d();function d(){z(),B(),f(),ae(),C(X());let e=we();if(e?.error){D();let t=e.error instanceof Error?e.error.message:String(e.error);L(`失败`,`0 ms`,`-`,`参数错误`),u.diagnostics.textContent=t,F(t);return}if(e){te(e);return}p(c.selectedId,!1)}function f(){for(let e of u.navItems)e.addEventListener(`click`,()=>{_e(e.dataset.category||`all`)});u.sampleSelect.addEventListener(`change`,()=>{u.sampleSelect.value.startsWith(`__`)||p(u.sampleSelect.value,!1)}),u.sampleGrid.addEventListener(`click`,e=>{let t=e.target.closest(`.sample-card`);t&&p(t.dataset.sampleId,!0)}),u.renderButton.addEventListener(`click`,()=>{m()}),u.diagnosticsToggle.addEventListener(`click`,()=>{G(!c.diagnosticsOpen)}),u.diagnosticsClose.addEventListener(`click`,()=>{G(!1)}),u.diagnosticsOverlay.addEventListener(`click`,()=>{G(!1)}),u.clearButton.addEventListener(`click`,()=>{c.currentBytes=null,c.externalSource=null,C(!1),D(),L(`未渲染`,`0 ms`,`-`,`未加载`),u.byteStatus.textContent=`0 KB`,u.diagnostics.textContent=`请选择样例或上传文件，然后点击“渲染当前文件”。`,V()}),u.fileInput.addEventListener(`change`,()=>{ee()})}async function ee(){let e=++c.requestToken;try{let t=u.fileInput.files?.[0];if(!t)return;let n=q(t.name),r=W(n);if(c.selectedId=`__upload__`,c.activeCategory=r.category,c.externalSource=null,C(!1),R(),c.currentTitle=t.name,c.currentFormat=n,z(),B(),S({format:n,title:t.name,detail:`正在读取本地文件`}),O(`正在读取本地文件...`,n),L(`读取上传`,`0 ms`,`-`,`准备渲染`),u.byteStatus.textContent=`0 KB`,u.diagnostics.textContent=`文件已选择，正在读取并准备自动渲染。`,V(),await P(),c.currentBytes=await t.arrayBuffer(),e!==c.requestToken)return;S({format:n,title:t.name,detail:`上传文件，${$(c.currentBytes.byteLength)}`}),u.byteStatus.textContent=$(c.currentBytes.byteLength),M(`文件读取完成，正在启动预览引擎...`,n),u.diagnostics.textContent=`文件已读取，正在自动渲染。`,await m()}catch(e){I(e)}finally{u.fileInput.value=``}}async function p(e,t){let n=i.find(t=>t.id===e)??i[0];c.selectedId=n.id,c.externalSource=null,C(!1),c.currentBytes=null,c.currentTitle=n.title,c.currentFormat=n.format,u.sampleSelect.value=n.id,S(n),V(),D(),L(n.path?`已选择`:`等待上传`,`0 ms`,n.path?`-`:`需要 .ppt 文件`,`未加载`),u.byteStatus.textContent=`0 KB`,u.diagnostics.textContent=n.path?`样例已选择，点击“渲染当前文件”开始检查。`:`当前没有内置 .ppt 样例，请上传 .ppt 文件检查。`,t&&await m()}async function te(e){c.selectedId=`__external__`,c.externalSource=e,C(!0),c.currentBytes=null,c.currentTitle=e.name,c.currentFormat=e.format,w(`__external__`,`可道云文件 - ${e.name}`),u.sampleSelect.value=`__external__`,S({format:e.format,title:e.name,detail:e.detail}),V(),O(`正在读取文档...`,e.format),L(`读取链接`,`0 ms`,`-`,`未加载`),u.byteStatus.textContent=`0 KB`,u.diagnostics.textContent=`检测到可道云传入的同源文件链接，正在读取并渲染。`,await m()}async function m(){let e=++c.requestToken,t=i.find(e=>e.id===c.selectedId);if(!c.currentBytes)if(c.externalSource){O(`正在下载服务器文件...`,c.externalSource.format),L(`读取链接`,`0 ms`,`-`,`未加载`);try{c.currentBytes=await h(c.externalSource.url,{credentials:`include`,cache:`no-store`,format:c.externalSource.format,label:`服务器文件`})}catch(e){I(e);return}u.byteStatus.textContent=$(c.currentBytes.byteLength)}else if(t?.path)O(`正在下载样例文件...`,t.format),L(`读取文件`,`0 ms`,`-`,`未加载`),await P(),c.currentBytes=await h(t.path,{credentials:`same-origin`,format:t.format,label:`样例文件`}),c.currentTitle=t.title,c.currentFormat=t.format,u.byteStatus.textContent=$(c.currentBytes.byteLength);else{L(`等待上传`,`0 ms`,`需要 .ppt 文件`,`未加载`);return}if(e===c.requestToken){T(c.currentFormat),k(`正在准备预览环境...`,c.currentFormat),L(`按需加载`,`0 ms`,`-`,`准备 WASM`),u.renderButton.disabled=!0,await P();try{let t=performance.now(),n=await pe(c.currentFormat,c.currentBytes);if(e!==c.requestToken)return;if(!n.ok){let e=n.error?.message||`WASM 安全校验未通过。`,t=n.error?.code||`wasm-check-failed`;throw Error(`WASM 安全校验未通过：${t}。${e}`)}let r=await g(c.currentFormat,c.currentBytes,e);if(e!==c.requestToken)return;v();let i=Math.round(performance.now()-t),a=n.ok?`正常`:`需检查`;L(`完成`,`${i} ms`,r.summary,a),u.diagnostics.textContent=JSON.stringify({文件:c.currentTitle,格式:c.currentFormat,字节:c.currentBytes.byteLength,渲染:r,WASM:n},null,2)}catch(e){I(e)}finally{u.renderButton.disabled=!1}}}async function h(e,t={}){let{format:n=c.currentFormat,label:r=`服务器文件`,...i}=t;M(`正在下载${r}...`,n),N({received:0,total:0,label:r});let a=await fetch(e,i);if(!a.ok)throw Error(`${r}读取失败：${a.status} ${a.statusText}`);let o=ne(a.headers.get(`content-length`));if(!a.body||typeof a.body.getReader!=`function`){let e=await a.arrayBuffer();return N({received:e.byteLength,total:e.byteLength,label:r}),u.byteStatus.textContent=$(e.byteLength),new Uint8Array(e)}let s=a.body.getReader(),l=[],d=0;for(;;){let{value:e,done:t}=await s.read();if(t)break;e&&(l.push(e),d+=e.byteLength,u.byteStatus.textContent=o?`${$(d)} / ${$(o)}`:$(d),N({received:d,total:o,label:r}),M(o?`正在下载${r}，${Math.min(99,Math.floor(d/o*100))}%`:`正在下载${r}，已接收 ${$(d)}`,n))}let f=re(l,d);return N({received:f.byteLength,total:o||f.byteLength,label:r}),M(`${r}下载完成，正在启动预览引擎...`,n),u.byteStatus.textContent=$(f.byteLength),f}function ne(e){if(!e)return 0;let t=Number(e);return Number.isFinite(t)&&t>0?t:0}function re(e,t){let n=new Uint8Array(t),r=0;for(let t of e)n.set(t,r),r+=t.byteLength;return n}async function g(e,t,n){if(e===`doc`){L(`加载 DOC 渲染器`,`0 ms`,`-`,`正常`),await j(`正在加载 Word 渲染器...`,e);let{parseMsDoc:n,renderMsDoc:r,convertMetafileToSvg:i}=await b(`doc`);L(`解析 DOC`,`0 ms`,`-`,`正常`),await j(`正在解析 Word 二进制文档...`,e);let a=n(t,{});L(`渲染 DOC`,`0 ms`,`-`,`正常`),await j(`正在生成 Word 页面...`,e);let o=await ue(a,i),s=r(a);return u.preview.innerHTML=`
      <style>${s.css}</style>
      <article class="word-page doc-page">
        ${s.html}
      </article>
    `,{summary:`${a.blocks.length} 个块`,warnings:s.warnings.length,blocks:a.blocks.length,assets:a.assets.length,vectorAssets:o}}if(e===`docx`){L(`加载 DOCX 渲染器`,`0 ms`,`-`,`正常`),await j(`正在加载 Word 渲染器...`,e);let{renderAsync:n}=await b(`docx`);L(`渲染 DOCX`,`0 ms`,`-`,`正常`),await j(`正在解析并排版 Word 文档...`,e),await n(new Blob([t]),u.preview,u.preview,{inWrapper:!0,breakPages:!1,ignoreWidth:!1,ignoreHeight:!0,strictWordCompatibility:!0,awaitLayout:!0,paginationTolerance:2,maxDynamicPaginationPasses:1e3});let r=u.preview.querySelectorAll(`section.docx`).length,i=u.preview.querySelectorAll(`img`).length,a=u.preview.querySelectorAll(`table`).length;return{summary:`连续文档`,sections:r||1,tables:a,images:i}}if(e===`ppt`){L(`加载 PPT 渲染器`,`0 ms`,`-`,`正常`),await j(`正在加载 PowerPoint 渲染器...`,e);let{parsePptBinary:r,renderSlideToHtmlAsync:i,defaultPptViewerCss:a}=await b(`ppt`);L(`解析 PPT`,`0 ms`,`-`,`正常`),await j(`正在解析 PowerPoint 二进制内容...`,e);let o=r(t,{});return L(`渲染 PPT`,`0 ms`,`-`,`正常`),await j(`正在生成首屏幻灯片...`,e),await ie(o,{renderSlideToHtmlAsync:i,defaultPptViewerCss:a,token:n}),{summary:`${o.slides.length} 页`,slides:o.slides.length,masters:o.masters?.length??0}}if(e===`pptx`){L(`加载 PPTX 渲染器`,`0 ms`,`-`,`正常`),await j(`正在加载 PowerPoint 渲染器...`,e);let{parsePptx:n,renderPresentationToElement:r}=await b(`pptx`);L(`解析 PPTX`,`0 ms`,`-`,`正常`),await j(`正在解析 PowerPoint Open XML 内容...`,e);let i=await n(t,{onProgress(t){u.renderStatus.textContent=t.stage,M(t.stage||`正在解析 PowerPoint 内容...`,e)}});return L(`渲染 PPTX`,`0 ms`,`-`,`正常`),await j(`正在建立按需渲染画布...`,e),E(),u.preview.innerHTML=``,c.activeViewerHandle=r(i,u.preview,{uiMode:`bare`,virtualize:!0,showNotes:!0,rootMargin:`1200px 0px`}),await P(),v(),{summary:`${i.presentation.slides.length} 页`,slides:i.presentation.slides.length,masters:i.presentation.slideMasters.length,layouts:i.presentation.slideLayouts.length,warnings:i.warnings.length}}if(Y(e)){L(`加载 Excel 渲染器`,`0 ms`,`-`,`正常`),await j(`正在加载 Excel 渲染器...`,e);let{createExcelWorkerClient:n,mountExcel:r}=await b(`excel`);L(`解析 Excel`,`0 ms`,`-`,`正常`),await j(`正在启动 Excel Worker...`,e);let i=n({worker:await le()}),a=t=>me(t,e);try{let n=await i.load(t,{format:e,onProgress:a});L(`渲染 Excel`,`0 ms`,`-`,`正常`),await j(`正在生成表格预览...`,e);let o=r(u.preview,n,{workerClient:i,onProgress:a,terminateWorkerOnDestroy:!0});c.activeViewerHandle=o;let s=n.sheets.find(e=>e.id===n.activeSheetId)||n.sheets[0];return{summary:o.summary,sheets:n.sheets.length,activeSheet:s?.name,rows:s?.rowCount??0,columns:s?.colCount??0,engine:n.engine,virtualSheets:n.sheets.filter(e=>e.virtualWindowed).length}}catch(e){throw i.terminate?.(),e}}throw Error(`不支持的格式：${e}`)}async function ie(e,t){let{renderSlideToHtmlAsync:n,defaultPptViewerCss:r,token:i}=t,a=e.slides.length;E(),u.preview.innerHTML=`
    <style>${r()}</style>
    <div class="progressive-render-status" role="status" aria-live="polite">正在渲染第 1 / ${a||1} 页</div>
    <div class="ppt-viewer progressive-render-root"></div>
  `;let o=u.preview.querySelector(`.progressive-render-root`),s=u.preview.querySelector(`.progressive-render-status`);if(o){for(let t=0;t<a;t+=1){if(i!==c.requestToken)return;let r=e.slides[t],l=t+1,u=`正在渲染第 ${l} / ${a} 页`;L(`渲染 PPT`,`0 ms`,`${l}/${a}`,`正常`),s&&(s.textContent=u);let d=await n(r,e);r.html=d,o.insertAdjacentHTML(`beforeend`,d),v(),await P()}s&&(s.textContent=`已完成 ${a} 页渲染`,window.setTimeout(()=>s.remove(),1200)),e.html=u.preview.innerHTML}}function ae(){typeof ResizeObserver<`u`?new ResizeObserver(()=>_()).observe(u.preview):window.addEventListener(`resize`,()=>_())}function _(){c.layoutFrame||=requestAnimationFrame(()=>{c.layoutFrame=0,v()})}function v(){if(c.currentFormat===`doc`){y(`.word-page`,`word-page-frame`);return}if(c.currentFormat===`docx`){y(`.preview-docx .docx-wrapper`,`word-page-frame`);return}if(c.currentFormat===`ppt`||c.currentFormat===`pptx`){if(c.currentFormat===`pptx`&&u.preview.querySelector(`.pptxv-root [data-slide-index]`)){y(`.pptxv-root [data-slide-index]`,`slide-page-frame`);return}y(`.pptxv-slide, .ppt-viewer-slide`,`slide-page-frame`)}}function y(e,t){let n=Array.from(u.preview.querySelectorAll(e));if(!n.length)return;let r=se();for(let e of n){let n=oe(e,t);e.classList.add(`scaled-preview-page`),e.style.transform=`none`,e.style.transformOrigin=`top left`,e.style.margin=`0`,e.style.maxWidth=`none`;let i=ce(e);e.style.width=`${i}px`,e.style.minWidth=`${i}px`;let a=Math.max(1,e.scrollHeight,e.offsetHeight,e.getBoundingClientRect().height),o=Math.min(1,r/i);n.style.width=`${Math.ceil(i*o)}px`,n.style.height=`${Math.ceil(a*o)}px`,n.style.setProperty(`--preview-page-scale`,o.toFixed(5)),e.style.transform=`scale(${o})`}}function oe(e,t){let n=e.parentElement;if(n?.classList.contains(t))return n;let r=document.createElement(`div`);return r.className=t,n?.insertBefore(r,e),r.appendChild(e),r}function se(){let e=getComputedStyle(u.preview),t=parseFloat(e.paddingLeft||`0`)+parseFloat(e.paddingRight||`0`);return Math.max(280,u.preview.clientWidth-t)}function ce(e){if(e.classList.contains(`word-page`)||e.classList.contains(`docx-wrapper`))return 794;let t=parseFloat(e.style.width||``);return Number.isFinite(t)&&t>0?t:Math.max(1,e.scrollWidth,e.offsetWidth,e.getBoundingClientRect().width)}async function b(e){if(!c.modules.has(e)){let t=r(e===`doc`?()=>import(`./DYjH-9n6.js`):e===`docx`?()=>import(`./pgL_B536.js`):e===`ppt`?()=>import(`./DWy6zol6.js`):e===`pptx`?()=>import(`./D28lHkZG.js`):()=>import(`./BdQk17w8.js`),[],import.meta.url);c.modules.set(e,t)}return c.modules.get(e)}async function le(){let{default:e}=await r(async()=>{let{default:e}=await import(`./DT2ednYL.js`);return{default:e}},[],import.meta.url);return new e}async function ue(e,t){let n={scanned:0,converted:0,failed:0},r=(e.assets||[]).filter(e=>e?.type===`image`&&/^image\/(?:emf|wmf)$/i.test(e.mime));for(let e of r){n.scanned+=1;try{let r=await de(e),i=r?t(e.mime,r):null;if(!i){n.failed+=1;continue}e.mime=i.mime,e.bytes=i.bytes,e.dataUrl=i.dataUrl,e.displayable=!0,e.meta={...e.meta||{},vectorConverted:!0,vectorSourceMime:i.sourceMime,vectorWidth:i.width,vectorHeight:i.height,vectorRecordCount:i.recordCount},n.converted+=1}catch{n.failed+=1}}return n}async function de(e){let t=e.bytes instanceof Uint8Array?e.bytes:new Uint8Array(e.bytes||[]);return t.length?e.meta?.metafileCompressed&&e.meta.metafileCompression===0&&e.meta.metafileFilter===254?fe(t):t:null}async function fe(e){if(typeof DecompressionStream>`u`)throw Error(`当前浏览器不支持 DecompressionStream，无法解压 DOC 内嵌矢量图。`);let t=new Blob([e.slice()]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(t).arrayBuffer())}async function pe(e,t){L(`加载 WASM`,`0 ms`,`-`,`加载中`),await j(`正在加载 WASM 安全校验...`,e),c.wasmRuntimePromise||=r(()=>import(`./DxnJeu1w.js`),[],import.meta.url);let{loadOfficeWasmCore:n}=await c.wasmRuntimePromise;c.wasmCorePromise||=n(`wasm/office-parser-core.wasm`);let i=await c.wasmCorePromise;if(!i.authorization.ok)return x(i.authorization);if(e===`xls`)return{ok:!0,engine:`assemblyscript-wasm`,parser:`origin-access-control`,wasm:!0,access:i.authorization.access,documentParser:`xls-binary-js-parser`,note:`XLS 二进制解析当前由 excel-viewer 的 hucre 路径处理，渲染前仍必须通过 WASM 域名授权。`};let a=e=>({...x(e),access:i.authorization.access});return e===`doc`?a(i.parseMsdoc(t)):e===`ppt`?a(i.parsePpt(t)):e===`docx`?a(i.parseDocx(t)):e===`xlsx`||e===`xlsb`?a(i.parseXlsx(t)):e===`pptx`?a(i.parsePptx(t)):{ok:!1,error:`不支持的格式：${e}`}}function x(e){return!e||e.error||e.parser===`origin-access-control`?{ok:!!e?.ok,engine:e?.engine??`assemblyscript-wasm`,parser:e?.parser??`unknown`,access:e?.access,error:e?.error}:e.container?{ok:e.ok,engine:e.engine,parser:e.parser,entries:e.container.entries.length,wordDocument:e.wordDocument??void 0,records:e.records??void 0}:{ok:e.ok,engine:e.engine,parser:e.parser,entryCount:e.package.entryCount,mainPart:e.package.mainPart,hasMainPart:e.package.hasMainPart,hasContentTypes:e.package.hasContentTypes}}function S(e){let t=W(e.format);Se(e.format),u.formatBadge.textContent=t.label,u.formatBadge.className=`format-badge tone-${t.tone}`,u.fileTitle.textContent=e.title,u.fileDetail.textContent=e.detail}function C(e){c.embedMode=e,u.appShell.classList.toggle(`embed-mode`,e),document.body.classList.toggle(`embed-mode`,e),e&&G(!1)}function w(e,t){let n=u.sampleSelect.querySelector(`option[value="${e}"]`);n||(n=document.createElement(`option`),n.value=e,u.sampleSelect.prepend(n)),n.textContent=t}function T(e){let t=e===`doc`||e===`docx`?`preview-word`:Y(e)?`preview-excel`:`preview-slides`;u.preview.className=`preview preview-${e} ${t}`}function E(){if(c.activeViewerHandle){try{c.activeViewerHandle.destroy?.()}catch{}c.activeViewerHandle=null}}function D(){E(),u.preview.className=`preview preview-empty`,u.preview.innerHTML=``}function O(e,t=c.currentFormat){t?T(t):u.preview.className=`preview preview-loading`,k(e,t)}function k(e,t=c.currentFormat){E(),u.preview.innerHTML=A(e,t)}function A(e,t=c.currentFormat){let n=W(t),r=ge(t);return`
    <div class="loading-state loading-${Q(n.theme)}" role="status" aria-live="polite">
      <span class="loading-visual" aria-hidden="true">
        <span class="loading-ring"></span>
        <span class="loading-document">
          <span class="loading-fold"></span>
          <span class="loading-doc-lines">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span class="loading-app-badge tone-${Q(n.tone)}">${Z(n.icon)}</span>
        </span>
      </span>
      <span class="loading-copy">
        <strong>${Z(r)}</strong>
        <span class="loading-message">${Z(e)}</span>
        <span class="loading-progress" hidden>
          <span class="loading-progress-track">
            <span class="loading-progress-bar"></span>
          </span>
          <span class="loading-progress-text"></span>
        </span>
      </span>
    </div>
  `}async function j(e,t=c.currentFormat){M(e,t),await P()}function M(e,t=c.currentFormat){let n=u.preview.querySelector(`.loading-message`);if(!n){t&&T(t),k(e,t);return}n.textContent=e}function N(e){let t=u.preview.querySelector(`.loading-progress`);if(!t)return;let n=t.querySelector(`.loading-progress-bar`),r=t.querySelector(`.loading-progress-text`),i=Number.isFinite(e?.percent)?Math.max(0,Math.min(100,Math.round(e.percent))):null;if(i!==null){t.hidden=!1,n.style.width=`${i}%`,n.classList.remove(`is-indeterminate`),r.textContent=`${i}%`;return}let a=Math.max(0,e?.received??0),o=Math.max(0,e?.total??0),s=a>0||o>0;if(t.hidden=!s,s){if(o>0){let e=Math.max(0,Math.min(100,Math.round(a/o*100)));n.style.width=`${e}%`,n.classList.remove(`is-indeterminate`),r.textContent=`${e}% · ${$(a)} / ${$(o)}`;return}n.style.width=`42%`,n.classList.add(`is-indeterminate`),r.textContent=`已下载 ${$(a)}`}}function me(e,t=c.currentFormat){let n=e?.message||he(e?.stage);u.renderStatus.textContent=n,M(n,t),Number.isFinite(e?.progress)&&N({percent:e.progress*100})}function he(e){return e===`received`?`Excel Worker 已接收文件`:e===`parsing`?`Excel Worker 正在解析工作簿`:e===`normalizing`?`正在整理工作表结构`:e===`ready`?`工作簿已准备完成`:e===`window`?`正在按需加载表格窗口`:`正在处理 Excel 工作簿`}function ge(e){let t=W(e);return t.theme===`excel`?`Excel 正在加载`:t.theme===`powerpoint`?`PowerPoint 正在加载`:`Word 正在加载`}function P(){return new Promise(e=>{if(typeof requestAnimationFrame!=`function`){setTimeout(e,0);return}requestAnimationFrame(()=>requestAnimationFrame(e))})}function F(e){u.preview.className=`preview preview-message`,u.preview.textContent=e}function I(e){let t=e instanceof Error?e.message:String(e);D(),c.embedMode&&F(t),L(`失败`,`0 ms`,`-`,t.includes(`WASM 安全校验未通过`)?`已拦截`:`异常`),u.diagnostics.textContent=e instanceof Error?e.stack||e.message:String(e)}function L(e,t,n,r){u.renderStatus.textContent=e,u.timeStatus.textContent=t,u.modelStatus.textContent=n,u.wasmStatus.textContent=r}function _e(e){if(!o[e])return;c.activeCategory=e,R(),z(),B();let t=i.find(e=>e.id===c.selectedId);(!t||!U(t))&&p((H()[0]||i[0]).id,!1)}function R(){for(let e of u.navItems){let t=e.dataset.category===c.activeCategory;e.classList.toggle(`active`,t),t?e.setAttribute(`aria-current`,`page`):e.removeAttribute(`aria-current`)}u.sectionTitle.textContent=o[c.activeCategory]?.sampleTitle||o.all.sampleTitle}function z(){let e=H();if(u.sampleSelect.innerHTML=e.map(e=>`<option value="${Q(e.id)}">${Z(e.title)} - ${Z(e.detail)}</option>`).join(``),c.selectedId===`__external__`){w(`__external__`,`可道云文件 - ${c.currentTitle||`外部文件`}`),u.sampleSelect.value=`__external__`;return}if(c.selectedId===`__upload__`){w(`__upload__`,`上传文件 - ${c.currentTitle||`本地文件`}`),u.sampleSelect.value=`__upload__`;return}let t=e.some(e=>e.id===c.selectedId)?c.selectedId:e[0]?.id;t&&(u.sampleSelect.value=t)}function B(){u.sampleGrid.innerHTML=H().map(e=>{let t=W(e.format);return`
      <button class="sample-card sample-${e.format}" type="button" data-sample-id="${Q(e.id)}" aria-pressed="false">
        <span class="format-chip tone-${t.tone}">${Z(t.label)}</span>
        ${ve(e,t)}
        <span class="sample-title">${Z(e.title)}</span>
        <span class="sample-detail">${Z(e.detail)}</span>
      </button>
    `}).join(``),V()}function V(){let e=u.sampleGrid.querySelectorAll(`.sample-card`);for(let t of e){let e=t.dataset.sampleId===c.selectedId;t.classList.toggle(`active`,e),t.setAttribute(`aria-pressed`,String(e))}}function H(){return c.activeCategory===`all`?i:i.filter(e=>U(e))}function U(e){return c.activeCategory===`all`?!0:W(e.format).category===c.activeCategory}function ve(e,t){let n=Y(e.format)?`thumb-sheet`:e.format===`ppt`||e.format===`pptx`?`thumb-slide`:`thumb-doc`;return`
    <span class="sample-thumb ${n}" aria-hidden="true">
      <span class="thumb-icon tone-${t.tone}">${Z(t.icon)}</span>
      ${n===`thumb-sheet`?xe():``}
      ${n===`thumb-slide`?be():``}
      ${n===`thumb-doc`?ye():``}
    </span>
  `}function ye(){return`
    <span class="doc-line wide"></span>
    <span class="doc-line"></span>
    <span class="doc-line short"></span>
    <span class="doc-table">
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
    </span>
  `}function be(){return`
    <span class="slide-title"></span>
    <span class="slide-block"></span>
    <span class="slide-bars"><i></i><i></i><i></i></span>
  `}function xe(){return Array.from({length:24},()=>`<span></span>`).join(``)}function W(e){return a[e]||{label:String(e||`FILE`).toUpperCase(),icon:`F`,group:`文件`,tone:`blue`,category:`document`,theme:`word`}}function G(e){c.diagnosticsOpen=e,u.appShell.classList.toggle(`diagnostics-open`,e),u.diagnosticsToggle.setAttribute(`aria-expanded`,String(e)),u.diagnosticsDrawer.setAttribute(`aria-hidden`,String(!e)),u.diagnosticsOverlay.hidden=!e}function Se(e){let t=K(e);document.body.dataset.theme=t,u.appShell.dataset.theme=t}function K(e){return W(e).theme}function q(e){let t=e.split(`.`).pop()?.toLowerCase();if(J(t))return t;throw Error(`不支持的文件扩展名：${e}`)}function Ce(e){let t=String(e||``).replace(/^\./,``).toLowerCase();if(J(t))return t;throw Error(`不支持的文件格式：${e}`)}function J(e){return[`doc`,`docx`,`ppt`,`pptx`,`xls`,`xlsx`,`xlsb`].includes(e)}function Y(e){return e===`xls`||e===`xlsx`||e===`xlsb`}function we(){let e=new URLSearchParams(window.location.search),t=e.get(`file`)||e.get(`src`)||e.get(`url`);if(!t)return null;try{let n=new URL(t,window.location.href);if(n.origin!==window.location.origin)throw Error(`为了离线部署安全，预览文件链接必须与查看器同源。`);let r=e.get(`name`)||Te(n)||`KodCloud Office 文件`,i=e.get(`type`)?Ce(e.get(`type`)):q(r);return{url:n.href,name:r,format:i,detail:`可道云传入文件，同源读取`}}catch(e){return{error:e}}}function X(){let e=new URLSearchParams(window.location.search);return e.has(`file`)||e.has(`src`)||e.has(`url`)}function Te(e){let t=decodeURIComponent(e.pathname.split(`/`).filter(Boolean).pop()||``);return e.searchParams.get(`name`)||e.searchParams.get(`filename`)||t}function Z(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Q(e){return Z(e)}function $(e){return e<1024?`${e} B`:e<1024*1024?`${Math.round(e/1024)} KB`:`${(e/1024/1024).toFixed(1)} MB`}