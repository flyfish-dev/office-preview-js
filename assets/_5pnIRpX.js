var e=`
.pptxv-root {
  width: 100%;
  min-width: 0;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  overflow-x: hidden;
  background: #eef2f6;
}
.pptxv-bare-frame,
.pptxv-bare-frame-canvas {
  position: relative;
}
.pptxv-bare-frame {
  flex: 0 0 auto;
  margin: 0 auto;
}
.pptxv-slide {
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 30px rgba(23, 23, 23, 0.18);
  border-radius: 0;
  isolation: isolate;
  margin: 0 auto;
}
.pptxv-slide-background {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
.pptxv-slide--loading {
  background: #ffffff;
}
.pptxv-slide--loading::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 28%;
  height: 3px;
  background: #c43e2f;
  animation: pptxv-slide-loading 900ms ease-in-out infinite alternate;
}
.pptxv-slide--loading[data-load-error='true']::after {
  width: 100%;
  animation: none;
  background: #a4262c;
}
@keyframes pptxv-slide-loading {
  from { transform: translateX(-100%); }
  to { transform: translateX(360%); }
}
.pptxv-surface,
.pptxv-picture,
.pptxv-table,
.pptxv-chart,
.pptxv-media,
.pptxv-fallback,
.pptxv-group,
.pptxv-group-scale,
.pptxv-group-offset,
.pptxv-text-overlay {
  position: absolute;
  box-sizing: border-box;
}
.pptxv-group,
.pptxv-group-scale,
.pptxv-group-offset {
  overflow: visible;
}
.pptxv-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: visible;
  word-break: normal;
  overflow-wrap: normal;
  line-break: auto;
}
.pptxv-text-flow {
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
}
.pptxv-text-content {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}
.pptxv-text p {
  margin: 0;
}
.pptxv-text span,
.pptxv-text a {
  white-space: inherit;
}
.pptxv-text a {
  color: inherit;
  text-decoration: underline;
}
.pptxv-shape-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.pptxv-shape-path,
.pptxv-custom-path,
.pptxv-picture-path {
  vector-effect: non-scaling-stroke;
}
.pptxv-picture img,
.pptxv-picture svg,
.pptxv-media video,
.pptxv-media audio {
  width: 100%;
  height: 100%;
}
.pptxv-picture svg {
  display: block;
  overflow: visible;
}
.pptxv-chart svg {
  display: block;
  width: 100%;
  height: 100%;
}
.pptxv-picture {
  overflow: hidden;
}
.pptxv-table table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.pptxv-comment-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pptxv-comment {
  position: absolute;
  min-width: 10px;
  min-height: 10px;
  border-radius: 999px;
  background: rgba(255, 199, 0, 0.92);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
}
.pptxv-comment > span {
  position: absolute;
  left: 14px;
  top: -4px;
  max-width: 240px;
  background: rgba(255, 255, 210, 0.98);
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 8px 10px;
  font: 12px/1.4 system-ui, sans-serif;
  white-space: normal;
}
.pptxv-notes {
  margin: 8px auto 0;
  max-width: min(100%, 960px);
  font: 13px/1.5 system-ui, sans-serif;
  color: #333;
}
.pptxv-fallback {
  background: rgba(244, 244, 244, 0.95);
  color: #555;
  border: 1px dashed #888;
  border-radius: 8px;
  padding: 6px 8px;
  font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  overflow: hidden;
}
.pptxv-slide-meta {
  font: 12px/1.4 system-ui, sans-serif;
  color: #666;
}

.pptxv-app {
  width: 100%;
  min-height: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: #242424;
  background: #f3f3f3;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  font-family: 'Segoe UI', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  scrollbar-width: thin;
  scrollbar-color: #b9b9b9 transparent;
}
.pptxv-app * {
  box-sizing: border-box;
  letter-spacing: 0;
}
.pptxv-app:focus-visible {
  outline: 2px solid #c43e2f;
  outline-offset: -2px;
}
.pptxv-app button {
  font: inherit;
}
.pptxv-app button:focus-visible,
.pptxv-slideshow button:focus-visible {
  outline: 2px solid #c43e2f;
  outline-offset: 1px;
}
.pptxv-app[data-show-toolbar='false'] .pptxv-toolbar {
  display: none;
}
.pptxv-app[data-show-thumbnails='false'] .pptxv-body {
  grid-template-columns: minmax(0, 1fr);
}
.pptxv-app[data-show-thumbnails='false'] .pptxv-sidebar {
  display: none;
}
.pptxv-toolbar {
  min-height: 46px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  background: #ffffff;
  border-bottom: 1px solid #d8d8d8;
}
.pptxv-toolbar-title {
  flex: 0 0 auto;
  margin-right: 8px;
  color: #343434;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}
.pptxv-toolbar-spacer {
  flex: 1 1 auto;
}
.pptxv-toolbar-group {
  height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding-left: 7px;
  border-left: 1px solid #e2e2e2;
}
.pptxv-segmented {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  padding: 2px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  background: #f7f7f7;
}
.pptxv-toggle,
.pptxv-nav-btn,
.pptxv-stage-nav,
.pptxv-icon-button {
  appearance: none;
  border: 1px solid transparent;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    opacity 160ms ease;
}
.pptxv-toggle {
  height: 27px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
  border-radius: 3px;
  background: transparent;
  color: #4a4a4a;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.pptxv-toggle[aria-pressed='true'] {
  background: #ffffff;
  border-color: #c8c8c8;
  color: #a62c20;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}
.pptxv-icon-button,
.pptxv-nav-btn {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 3px;
  background: transparent;
  color: #383838;
  cursor: pointer;
}
.pptxv-icon-button:hover,
.pptxv-nav-btn:hover,
.pptxv-stage-nav:hover {
  border-color: #d1d1d1;
  background: #ededed;
}
.pptxv-icon-button[aria-pressed='true'] {
  color: #a62c20;
  background: #f4e9e7;
}
.pptxv-icon-button:disabled,
.pptxv-nav-btn:disabled,
.pptxv-stage-nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.pptxv-icon {
  flex: 0 0 auto;
  pointer-events: none;
}
.pptxv-counter {
  width: 58px;
  min-width: 58px;
  padding: 0 4px;
  text-align: center;
  color: #555555;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.pptxv-zoom-label {
  width: 44px;
  text-align: center;
  color: #555555;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.pptxv-body {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: 204px minmax(0, 1fr);
  transition: grid-template-columns 180ms ease;
}
.pptxv-sidebar {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 5px 8px 7px;
  overflow: hidden;
  background: #f7f7f7;
  border-right: 1px solid #cfcfcf;
}
.pptxv-sidebar-title {
  height: 24px;
  padding: 3px 8px;
  color: #595959;
  font-size: 11px;
  font-weight: 600;
}
.pptxv-thumb-list {
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
}
.pptxv-thumb-virtual-spacer {
  position: relative;
  width: 100%;
}
.pptxv-thumb[data-hidden-slide='true'] {
  opacity: 0.58;
}
.pptxv-thumb {
  width: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  align-items: start;
  gap: 4px;
  padding: 5px 4px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  color: #555555;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}
.pptxv-thumb:hover {
  background: #ececec;
  border-color: #d2d2d2;
}
.pptxv-thumb.is-active {
  background: #f4e9e7;
  border-color: #c43e2f;
  box-shadow: inset 3px 0 0 #c43e2f;
}
.pptxv-thumb-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 18px;
  font-size: 11px;
  font-weight: 500;
  color: #5f5f5f;
}
.pptxv-thumb-frame,
.pptxv-slide-card-frame,
.pptxv-stage-frame {
  position: relative;
}
.pptxv-thumb-frame {
  overflow: hidden;
  border: 1px solid #bdbdbd;
  border-radius: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  background: #ffffff;
}
.pptxv-thumb-frame-canvas,
.pptxv-slide-card-frame-canvas,
.pptxv-stage-frame-canvas {
  position: relative;
}
.pptxv-thumb .pptxv-slide {
  box-shadow: none;
}
.pptxv-workspace {
  position: relative;
  min-width: 0;
  min-height: 0;
  background: #d9d9d9;
}
.pptxv-scroll-panel,
.pptxv-stage-panel {
  position: absolute;
  inset: 0;
}
.pptxv-app[data-view-mode='single'] .pptxv-scroll-panel {
  display: none;
}
.pptxv-app[data-view-mode='scroll'] .pptxv-stage-panel {
  display: none;
}
.pptxv-scroll-panel {
  overflow: auto;
  padding: 28px 32px 36px;
  overscroll-behavior: contain;
  transition: opacity 180ms ease;
}
.pptxv-scroll-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-type: y proximity;
}
.pptxv-slide-card {
  width: min(100%, max-content);
  padding: 0;
  border: 1px solid transparent;
  background: transparent;
  scroll-snap-align: start;
}
.pptxv-slide-card.is-active {
  border-color: #b7b7b7;
}
.pptxv-slide-card-frame {
  margin: 0 auto;
}
.pptxv-slide-card .pptxv-slide {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
.pptxv-slide-caption {
  margin-top: 6px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  color: #555555;
}
.pptxv-slide-caption-primary {
  font-size: 12px;
  font-weight: 600;
}
.pptxv-slide-caption-secondary {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pptxv-notes-panel {
  margin-top: 10px;
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  background: #ffffff;
  color: #333333;
}
.pptxv-notes-panel p {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
}
.pptxv-notes-panel p + p {
  margin-top: 8px;
}
.pptxv-notes-title {
  margin-bottom: 8px;
  color: #595959;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
.pptxv-stage-panel {
  display: flex;
  min-width: 0;
  min-height: 0;
}
.pptxv-stage-stack {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
}
.pptxv-stage-center {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: #d9d9d9;
}
.pptxv-stage-frame {
  margin: auto;
}
.pptxv-stage-frame .pptxv-slide {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.23);
}
.pptxv-stage-nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 34px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  background: rgba(250, 250, 250, 0.94);
  color: #3b3b3b;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  transform: translateY(-50%);
  cursor: pointer;
}
.pptxv-stage-nav--prev {
  left: 18px;
}
.pptxv-stage-nav--next {
  right: 18px;
}
.pptxv-stage-badge {
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 5px 8px;
  border: 1px solid #c8c8c8;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.94);
  color: #444444;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}
.pptxv-stage-notes {
  display: block;
}
.pptxv-stage-notes[hidden] {
  display: none;
}
.pptxv-stage-notes .pptxv-notes-panel {
  margin-top: 0;
}

.pptxv-slideshow {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  overflow: hidden;
  background: #000000;
  color: #ffffff;
  font-family: 'Segoe UI', Inter, ui-sans-serif, system-ui, sans-serif;
  touch-action: pan-y;
}
.pptxv-slideshow[hidden] {
  display: none;
}
.pptxv-slideshow-stage {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  isolation: isolate;
}
.pptxv-slideshow-slot {
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(var(--pptxv-slideshow-scale, 1));
  transform-origin: center;
}
.pptxv-slideshow-slot[data-active='true'] {
  opacity: 1;
  pointer-events: auto;
}
.pptxv-slideshow-surface {
  position: relative;
  overflow: hidden;
  background: #ffffff;
}
.pptxv-three-transition {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.pptxv-slideshow .pptxv-slide {
  margin: 0;
  box-shadow: none;
}
.pptxv-slideshow-top-controls,
.pptxv-slideshow-controls {
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms ease;
}
.pptxv-slideshow-top-controls {
  top: 12px;
  right: 12px;
}
.pptxv-slideshow-controls {
  left: 50%;
  bottom: 18px;
  gap: 4px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  background: rgba(24, 24, 24, 0.86);
  transform: translateX(-50%);
}
.pptxv-slideshow[data-controls-visible='true'] .pptxv-slideshow-top-controls,
.pptxv-slideshow[data-controls-visible='true'] .pptxv-slideshow-controls,
.pptxv-slideshow:focus-within .pptxv-slideshow-controls {
  opacity: 1;
  pointer-events: auto;
}
.pptxv-slideshow-button {
  width: 36px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
}
.pptxv-slideshow-button:hover {
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.12);
}
.pptxv-slideshow-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.pptxv-slideshow-counter {
  min-width: 70px;
  padding: 0 6px;
  text-align: center;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 1080px) {
  .pptxv-body {
    grid-template-columns: 116px minmax(0, 1fr);
  }
  .pptxv-sidebar {
    padding-left: 10px;
    padding-right: 8px;
  }
  .pptxv-sidebar-title,
  .pptxv-thumb-number {
    display: none;
  }
  .pptxv-thumb {
    grid-template-columns: 1fr;
  }
  .pptxv-toolbar-title,
  .pptxv-zoom-label,
  .pptxv-toggle span {
    display: none;
  }
}

@media (max-width: 760px) {
  .pptxv-toolbar {
    gap: 4px;
    overflow: hidden;
  }
  .pptxv-toolbar-spacer {
    flex-basis: 0;
    min-width: 4px;
  }
  .pptxv-toolbar-group {
    padding-left: 3px;
  }
  .pptxv-zoom-group {
    display: none;
  }
  .pptxv-counter {
    min-width: 52px;
  }
  .pptxv-body {
    grid-template-columns: 84px minmax(0, 1fr);
  }
  .pptxv-stage-nav {
    width: 32px;
    height: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pptxv-app *,
  .pptxv-slideshow * {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;export{e as t};