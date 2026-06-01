(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e,t){return new URL(e,t).href},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:e,o||(l.as=`script`),l.crossOrigin=``,l.href=i,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,t)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[])t.status===`rejected`&&s(t.reason);return r().catch(s)})},i=[{id:`doc-comprehensive`,format:`doc`,title:`DOC 综合样例`,detail:`联通用户中心登录认证接口规范`,path:`samples/office-demo.doc`},{id:`docx-comprehensive`,format:`docx`,title:`DOCX 综合样例`,detail:`中移铁通档案管理系统测试文档`,path:`samples/office-demo.docx`},{id:`ppt-comprehensive`,format:`ppt`,title:`PPT 综合样例`,detail:`PowerPoint 97-2003 演示文稿`,path:`samples/office-demo.ppt`},{id:`pptx-comprehensive`,format:`pptx`,title:`PPTX 综合样例`,detail:`PowerPoint Open XML 演示文稿`,path:`samples/office-demo.pptx`},{id:`xls-comprehensive`,format:`xls`,title:`XLS 综合样例`,detail:`Excel 97-2003 工作簿样式与表格检查`,path:`samples/office-demo.xls`},{id:`xlsx-comprehensive`,format:`xlsx`,title:`XLSX 综合样例`,detail:`Excel 工作簿样式与表格检查`,path:`samples/office-demo.xlsx`}],a={doc:{label:`DOC`,icon:`W`,group:`文档预览`,tone:`blue`,category:`document`,theme:`word`},docx:{label:`DOCX`,icon:`W`,group:`文档预览`,tone:`blue`,category:`document`,theme:`word`},ppt:{label:`PPT`,icon:`P`,group:`演示文稿`,tone:`orange`,category:`presentation`,theme:`powerpoint`},pptx:{label:`PPTX`,icon:`P`,group:`演示文稿`,tone:`orange`,category:`presentation`,theme:`powerpoint`},xls:{label:`XLS`,icon:`X`,group:`电子表格`,tone:`green`,category:`spreadsheet`,theme:`excel`},xlsx:{label:`XLSX`,icon:`X`,group:`电子表格`,tone:`green`,category:`spreadsheet`,theme:`excel`},xlsb:{label:`XLSB`,icon:`X`,group:`电子表格`,tone:`green`,category:`spreadsheet`,theme:`excel`}},o={all:{label:`全部格式`,sampleTitle:`选择文件格式`},document:{label:`文档预览`,sampleTitle:`Word 文档预览`},presentation:{label:`演示文稿`,sampleTitle:`PowerPoint 演示预览`},spreadsheet:{label:`电子表格`,sampleTitle:`Excel 表格预览`}},s={all:`
    <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 10.5 12 4l8 6.5"></path>
      <path d="M6.5 9.5V20h11V9.5"></path>
      <path d="M10 20v-5h4v5"></path>
    </svg>
  `,document:`
    <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 3.5h7l3 3V20.5H7z"></path>
      <path d="M14 3.5v4h4"></path>
      <path d="M9.5 11h5"></path>
      <path d="M9.5 14.5h5"></path>
      <path d="M9.5 18h3"></path>
    </svg>
  `,presentation:`
    <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 5h16v11H4z"></path>
      <path d="M12 16v4"></path>
      <path d="M9 20h6"></path>
      <path d="M8 13v-3"></path>
      <path d="M12 13V8"></path>
      <path d="M16 13v-2"></path>
    </svg>
  `,spreadsheet:`
    <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.5 5.5h15v13h-15z"></path>
      <path d="M4.5 9.5h15"></path>
      <path d="M4.5 13.5h15"></path>
      <path d="M9.5 5.5v13"></path>
      <path d="M14.5 5.5v13"></path>
    </svg>
  `},c=Le();document.body.classList.toggle(`embed-mode`,c),document.body.dataset.theme=Ae(i[0].format);var l={selectedId:`doc-comprehensive`,activeCategory:`all`,currentBytes:null,currentTitle:``,currentFormat:``,modules:new Map,wasmRuntimePromise:null,wasmCorePromise:null,externalSource:null,embedMode:c,diagnosticsOpen:!1,samplesCollapsed:!1,previewInfoOpen:!1,requestToken:0,layoutFrame:0,activeViewerHandle:null,docxViewMode:`flow`},u=document.querySelector(`#app`);u.innerHTML=`
  <main class="app-shell${c?` embed-mode`:``}">
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
        <button type="button" class="side-nav-item active" data-category="all" aria-current="page">${s.all}<span class="nav-label">首页</span></button>
        <button type="button" class="side-nav-item" data-category="document">${s.document}<span class="nav-label">文档预览</span></button>
        <button type="button" class="side-nav-item" data-category="presentation">${s.presentation}<span class="nav-label">演示文稿</span></button>
        <button type="button" class="side-nav-item" data-category="spreadsheet">${s.spreadsheet}<span class="nav-label">电子表格</span></button>
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
          <div class="section-tools">
            <button id="sampleToggle" class="sample-toggle" type="button" aria-expanded="true" aria-controls="sampleGrid">
              收起样例
            </button>
            <label class="sample-select-field">
              <span>快速选择</span>
              <select id="sampleSelect"></select>
            </label>
          </div>
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
          <button id="previewInfoToggle" class="preview-info-toggle" type="button" aria-expanded="false" aria-label="显示预览信息">
            <span class="preview-info-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 17v-6"></path>
                <path d="M12 7.2v.1"></path>
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
              </svg>
            </span>
            <span>信息</span>
          </button>
          <button id="previewCloseButton" class="preview-close-button" type="button" aria-label="关闭预览并返回案例选择">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12"></path>
              <path d="M18 6 6 18"></path>
            </svg>
          </button>
          <div id="preview" class="preview ${c?`preview-loading`:`preview-empty`}">
            ${c?N(`正在加载文档...`):``}
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
`;var d={appShell:document.querySelector(`.app-shell`),navItems:document.querySelectorAll(`.side-nav-item`),sectionTitle:document.querySelector(`#sectionTitle`),sampleSection:document.querySelector(`.sample-section`),sampleSelect:document.querySelector(`#sampleSelect`),sampleToggle:document.querySelector(`#sampleToggle`),sampleGrid:document.querySelector(`#sampleGrid`),fileInput:document.querySelector(`#fileInput`),renderButton:document.querySelector(`#renderButton`),clearButton:document.querySelector(`#clearButton`),diagnosticsToggle:document.querySelector(`#diagnosticsToggle`),diagnosticsOverlay:document.querySelector(`#diagnosticsOverlay`),diagnosticsDrawer:document.querySelector(`#diagnosticsDrawer`),diagnosticsClose:document.querySelector(`#diagnosticsClose`),previewInfoToggle:document.querySelector(`#previewInfoToggle`),previewCloseButton:document.querySelector(`#previewCloseButton`),formatBadge:document.querySelector(`#formatBadge`),fileTitle:document.querySelector(`#fileTitle`),fileDetail:document.querySelector(`#fileDetail`),renderStatus:document.querySelector(`#renderStatus`),timeStatus:document.querySelector(`#timeStatus`),modelStatus:document.querySelector(`#modelStatus`),wasmStatus:document.querySelector(`#wasmStatus`),byteStatus:document.querySelector(`#byteStatus`),previewCard:document.querySelector(`.preview-card`),previewStage:document.querySelector(`.preview-stage`),preview:document.querySelector(`#preview`),diagnostics:document.querySelector(`#diagnostics`)};f();function f(){H(),U(),ee(),ce(),S(Le());let e=Ie();if(e?.error){k();let t=e.error instanceof Error?e.error.message:String(e.error);B(`失败`,`0 ms`,`-`,`参数错误`),d.diagnostics.textContent=t,R(t);return}if(e){ne(e);return}p(l.selectedId,!1,{focusPreview:!1})}function ee(){for(let e of d.navItems)e.addEventListener(`click`,()=>{we(e.dataset.category||`all`)});d.sampleSelect.addEventListener(`change`,()=>{d.sampleSelect.value.startsWith(`__`)||p(d.sampleSelect.value,E())}),d.sampleToggle.addEventListener(`click`,()=>{A(!l.samplesCollapsed)}),d.previewInfoToggle.addEventListener(`click`,()=>{ye(!l.previewInfoOpen)}),d.previewCloseButton.addEventListener(`click`,()=>{be()}),d.sampleGrid.addEventListener(`click`,e=>{let t=e.target.closest(`.sample-card`);t&&p(t.dataset.sampleId,!0)}),d.renderButton.addEventListener(`click`,()=>{m()}),d.diagnosticsToggle.addEventListener(`click`,()=>{J(!l.diagnosticsOpen)}),d.diagnosticsClose.addEventListener(`click`,()=>{J(!1)}),d.diagnosticsOverlay.addEventListener(`click`,()=>{J(!1)}),d.clearButton.addEventListener(`click`,()=>{l.currentBytes=null,l.externalSource=null,l.docxViewMode=`flow`,S(!1),k(),B(`未渲染`,`0 ms`,`-`,`未加载`),d.byteStatus.textContent=`0 KB`,d.diagnostics.textContent=`请选择样例或上传文件，然后点击“渲染当前文件”。`,W()}),d.fileInput.addEventListener(`change`,()=>{te()})}async function te(){let e=++l.requestToken;try{let t=d.fileInput.files?.[0];if(!t)return;let n=je(t.name),r=q(n);if(l.selectedId=`__upload__`,l.activeCategory=r.category,l.externalSource=null,n===`docx`&&(l.docxViewMode=`flow`),S(!1),V(),l.currentTitle=t.name,l.currentFormat=n,H(),U(),x({format:n,title:t.name,detail:`正在读取本地文件`}),j(`正在读取本地文件...`,n),B(`读取上传`,`0 ms`,`-`,`准备渲染`),d.byteStatus.textContent=`0 KB`,d.diagnostics.textContent=`文件已选择，正在读取并准备自动渲染。`,W(),await L(),l.currentBytes=await t.arrayBuffer(),e!==l.requestToken)return;x({format:n,title:t.name,detail:`上传文件，${$(l.currentBytes.byteLength)}`}),d.byteStatus.textContent=$(l.currentBytes.byteLength),F(`文件读取完成，正在启动预览引擎...`,n),d.diagnostics.textContent=`文件已读取，正在自动渲染。`,await m()}catch(e){z(e)}finally{d.fileInput.value=``}}async function p(e,t,n={}){let r=i.find(t=>t.id===e)??i[0];l.selectedId=r.id,l.externalSource=null,S(!1),l.currentBytes=null,l.currentTitle=r.title,l.currentFormat=r.format,r.format===`docx`&&(l.docxViewMode=`flow`),d.sampleSelect.value=r.id,x(r),W(),k(),B(r.path?`已选择`:`等待上传`,`0 ms`,r.path?`-`:`需要 .ppt 文件`,`未加载`),d.byteStatus.textContent=`0 KB`,d.diagnostics.textContent=r.path?`样例已选择，点击“渲染当前文件”开始检查。`:`当前没有内置 .ppt 样例，请上传 .ppt 文件检查。`,t?await m():n.focusPreview!==!1&&D()}async function ne(e){l.selectedId=`__external__`,l.externalSource=e,S(!0),l.currentBytes=null,l.currentTitle=e.name,l.currentFormat=e.format,e.format===`docx`&&(l.docxViewMode=`flow`),C(`__external__`,`可道云文件 - ${e.name}`),d.sampleSelect.value=`__external__`,x({format:e.format,title:e.name,detail:e.detail}),W(),j(`正在读取文档...`,e.format),B(`读取链接`,`0 ms`,`-`,`未加载`),d.byteStatus.textContent=`0 KB`,d.diagnostics.textContent=`检测到可道云传入的同源文件链接，正在读取并渲染。`,await m()}async function m(){let e=++l.requestToken,t=i.find(e=>e.id===l.selectedId);if(!l.currentBytes)if(l.externalSource){j(`正在下载服务器文件...`,l.externalSource.format),B(`读取链接`,`0 ms`,`-`,`未加载`);try{l.currentBytes=await re(l.externalSource.url,{credentials:`include`,cache:`no-store`,format:l.externalSource.format,label:`服务器文件`})}catch(e){z(e);return}d.byteStatus.textContent=$(l.currentBytes.byteLength)}else if(t?.path)j(`正在下载样例文件...`,t.format),B(`读取文件`,`0 ms`,`-`,`未加载`),await L(),l.currentBytes=await re(t.path,{credentials:`same-origin`,format:t.format,label:`样例文件`}),l.currentTitle=t.title,l.currentFormat=t.format,d.byteStatus.textContent=$(l.currentBytes.byteLength);else{B(`等待上传`,`0 ms`,`需要 .ppt 文件`,`未加载`);return}if(e!==l.requestToken)return;if(Pe(l.currentTitle,l.currentBytes)){z(Error(`文件为空或为 Office 临时锁文件（~$），无法预览。请上传实际 Office 文件。`));return}let n=Fe(l.currentFormat,l.currentBytes);if(n!==l.currentFormat){let e=l.currentFormat;l.currentFormat=n,n===`docx`&&(l.docxViewMode=`flow`),x({format:n,title:l.currentTitle,detail:`文件内容识别为 ${n.toUpperCase()}（原扩展名 .${e}）`})}w(l.currentFormat),M(`正在准备预览环境...`,l.currentFormat),B(`按需加载`,`0 ms`,`-`,`准备 WASM`),d.renderButton.disabled=!0,await L();try{let t=performance.now(),n=await ve(l.currentFormat,l.currentBytes);if(e!==l.requestToken)return;if(!n.ok){let e=n.error?.message||`WASM 安全校验未通过。`,t=n.error?.code||`wasm-check-failed`;throw Error(`WASM 安全校验未通过：${t}。${e}`)}let r=await oe(l.currentFormat,l.currentBytes,e);if(e!==l.requestToken)return;g();let i=Math.round(performance.now()-t),a=n.ok?`正常`:`需检查`;B(`完成`,`${i} ms`,r.summary,a),d.diagnostics.textContent=JSON.stringify({文件:l.currentTitle,格式:l.currentFormat,字节:l.currentBytes.byteLength,渲染:r,WASM:n},null,2)}catch(e){z(e)}finally{d.renderButton.disabled=!1}}async function re(e,t={}){let{format:n=l.currentFormat,label:r=`服务器文件`,...i}=t;F(`正在下载${r}...`,n),I({received:0,total:0,label:r});let a=await fetch(e,i);if(!a.ok)throw Error(`${r}读取失败：${a.status} ${a.statusText}`);let o=ie(a.headers.get(`content-length`));if(!a.body||typeof a.body.getReader!=`function`){let e=await a.arrayBuffer();return I({received:e.byteLength,total:e.byteLength,label:r}),d.byteStatus.textContent=$(e.byteLength),new Uint8Array(e)}let s=a.body.getReader(),c=[],u=0;for(;;){let{value:e,done:t}=await s.read();if(t)break;e&&(c.push(e),u+=e.byteLength,d.byteStatus.textContent=o?`${$(u)} / ${$(o)}`:$(u),I({received:u,total:o,label:r}),F(o?`正在下载${r}，${Math.min(99,Math.floor(u/o*100))}%`:`正在下载${r}，已接收 ${$(u)}`,n))}let f=ae(c,u);return I({received:f.byteLength,total:o||f.byteLength,label:r}),F(`${r}下载完成，正在启动预览引擎...`,n),d.byteStatus.textContent=$(f.byteLength),f}function ie(e){if(!e)return 0;let t=Number(e);return Number.isFinite(t)&&t>0?t:0}function ae(e,t){let n=new Uint8Array(t),r=0;for(let t of e)n.set(t,r),r+=t.byteLength;return n}async function oe(e,t,n){if(e===`doc`){B(`加载 DOC 渲染器`,`0 ms`,`-`,`正常`),await P(`正在加载 Word 渲染器...`,e);let{parseMsDoc:n,renderMsDoc:r,mountMsDoc:i,convertMetafileToSvg:a}=await y(`doc`);B(`解析 DOC`,`0 ms`,`-`,`正常`),await P(`正在解析 Word 二进制文档...`,e);let o=n(t,{});B(`渲染 DOC`,`0 ms`,`-`,`正常`),await P(`正在生成 Word 页面...`,e);let s=await he(o,a),c=r(o);O(),i(d.preview,c),l.activeViewerHandle={destroy(){d.preview.__msdocCleanup?.(),delete d.preview.__msdocCleanup}};let u=d.preview.querySelectorAll(`.msdoc-page`).length;return{summary:u?`${u} 页`:`${o.blocks.length} 个块`,warnings:c.warnings.length,blocks:o.blocks.length,assets:o.assets.length,pages:u,vectorAssets:s}}if(e===`docx`){B(`加载 DOCX 渲染器`,`0 ms`,`-`,`正常`),await P(`正在加载 Word 渲染器...`,e);let{renderAsync:n}=await y(`docx`),r=l.docxViewMode===`paged`?`paged`:`flow`,i=r===`paged`;d.preview.classList.toggle(`docx-flow-mode`,!i),d.preview.classList.toggle(`docx-paged-mode`,i),B(`渲染 DOCX`,`0 ms`,`-`,`正常`),await P(`正在解析并排版 Word 文档...`,e),await n(new Blob([t]),d.preview,d.preview,{inWrapper:!0,breakPages:i,ignoreWidth:!1,ignoreHeight:!i,strictWordCompatibility:!0,awaitLayout:!0,paginationTolerance:2,maxDynamicPaginationPasses:1e3}),le(r);let a=d.preview.querySelectorAll(`section.docx`).length,o=d.preview.querySelectorAll(`img`).length,s=d.preview.querySelectorAll(`table`).length;return{summary:i?`${a||1} 页`:`流式 / ${a||1} 节`,viewMode:r,sections:a||1,tables:s,images:o}}if(e===`ppt`){B(`加载 PPT 渲染器`,`0 ms`,`-`,`正常`),await P(`正在加载 PowerPoint 渲染器...`,e);let{parsePptBinary:r,renderSlideToHtmlAsync:i,defaultPptViewerCss:a}=await y(`ppt`);B(`解析 PPT`,`0 ms`,`-`,`正常`),await P(`正在解析 PowerPoint 二进制内容...`,e);let o=r(t,{});return B(`渲染 PPT`,`0 ms`,`-`,`正常`),await P(`正在生成首屏幻灯片...`,e),await se(o,{renderSlideToHtmlAsync:i,defaultPptViewerCss:a,token:n}),{summary:`${o.slides.length} 页`,slides:o.slides.length,masters:o.masters?.length??0}}if(e===`pptx`){B(`加载 PPTX 渲染器`,`0 ms`,`-`,`正常`),await P(`正在加载 PowerPoint 渲染器...`,e);let{parsePptx:n,renderPresentationToElement:r}=await y(`pptx`);B(`解析 PPTX`,`0 ms`,`-`,`正常`),await P(`正在解析 PowerPoint Open XML 内容...`,e);let i=await n(t,{onProgress(t){d.renderStatus.textContent=t.stage,F(t.stage||`正在解析 PowerPoint 内容...`,e)}});return B(`渲染 PPTX`,`0 ms`,`-`,`正常`),await P(`正在建立按需渲染画布...`,e),O(),d.preview.innerHTML=``,l.activeViewerHandle=r(i,d.preview,{uiMode:`bare`,virtualize:!0,showNotes:!1,rootMargin:`1200px 0px`}),await L(),g(),{summary:`${i.presentation.slides.length} 页`,slides:i.presentation.slides.length,masters:i.presentation.slideMasters.length,layouts:i.presentation.slideLayouts.length,warnings:i.warnings.length}}if(Y(e)){B(`加载 Excel 渲染器`,`0 ms`,`-`,`正常`),await P(`正在加载 Excel 渲染器...`,e);let{createExcelWorkerClient:n,mountExcel:r}=await y(`excel`);B(`解析 Excel`,`0 ms`,`-`,`正常`),await P(`正在启动 Excel Worker...`,e);let i=n({worker:await me()}),a=t=>xe(t,e);try{let n=await i.load(t,{format:e,onProgress:a});B(`渲染 Excel`,`0 ms`,`-`,`正常`),await P(`正在生成表格预览...`,e);let o=r(d.preview,n,{workerClient:i,onProgress:a,terminateWorkerOnDestroy:!0});l.activeViewerHandle=o;let s=n.sheets.find(e=>e.id===n.activeSheetId)||n.sheets[0];return{summary:o.summary,sheets:n.sheets.length,activeSheet:s?.name,rows:s?.rowCount??0,columns:s?.colCount??0,engine:n.engine,virtualSheets:n.sheets.filter(e=>e.virtualWindowed).length}}catch(e){throw i.terminate?.(),e}}throw Error(`不支持的格式：${e}`)}async function se(e,t){let{renderSlideToHtmlAsync:n,defaultPptViewerCss:r,token:i}=t,a=e.slides.length;O(),d.preview.innerHTML=`
    <style>${r()}</style>
    <div class="progressive-render-status" role="status" aria-live="polite">正在渲染第 1 / ${a||1} 页</div>
    <div class="ppt-viewer progressive-render-root"></div>
  `;let o=d.preview.querySelector(`.progressive-render-root`),s=d.preview.querySelector(`.progressive-render-status`);if(o){for(let t=0;t<a;t+=1){if(i!==l.requestToken)return;let r=e.slides[t],c=t+1,u=`正在渲染第 ${c} / ${a} 页`;B(`渲染 PPT`,`0 ms`,`${c}/${a}`,`正常`),s&&(s.textContent=u);let d=await n(r,e);r.html=d,o.insertAdjacentHTML(`beforeend`,d),g(),await L()}s&&(s.textContent=`已完成 ${a} 页渲染`,window.setTimeout(()=>s.remove(),1200)),e.html=d.preview.innerHTML}}function ce(){typeof ResizeObserver<`u`?new ResizeObserver(()=>h()).observe(d.preview):window.addEventListener(`resize`,()=>h())}function h(){l.layoutFrame||=requestAnimationFrame(()=>{l.layoutFrame=0,g()})}function g(){if(l.currentFormat===`doc`){_(`.preview-doc .msdoc-page`,`word-page-frame`);return}if(l.currentFormat===`docx`){if(l.docxViewMode!==`paged`)return;_(`.preview-docx section.docx`,`word-page-frame`);return}if(l.currentFormat===`ppt`||l.currentFormat===`pptx`){if(l.currentFormat===`pptx`&&d.preview.querySelector(`.pptxv-root [data-slide-index]`)){_(`.pptxv-root [data-slide-index]`,`slide-page-frame`);return}_(`.pptxv-slide, .ppt-viewer-slide`,`slide-page-frame`)}}function le(e){let t=document.createElement(`div`);t.className=`docx-viewer-toolbar`,t.setAttribute(`role`,`toolbar`),t.setAttribute(`aria-label`,`DOCX 视图`);for(let[n,r]of[[`flow`,`流式`],[`paged`,`分页`]]){let i=document.createElement(`button`);i.type=`button`,i.textContent=r,i.dataset.docxViewMode=n,i.className=n===e?`active`:``,i.setAttribute(`aria-pressed`,String(n===e)),i.addEventListener(`click`,()=>{ue(n)}),t.appendChild(i)}d.preview.prepend(t)}async function ue(e){l.currentFormat===`docx`&&(e!==`flow`&&e!==`paged`||l.docxViewMode!==e&&(l.docxViewMode=e,await m()))}function _(e,t){let n=Array.from(d.preview.querySelectorAll(e));if(!n.length)return;let r=fe();for(let e of n){let n=de(e,t);e.classList.add(`scaled-preview-page`),e.style.transform=`none`,e.style.transformOrigin=`top left`,e.style.margin=`0`,e.style.maxWidth=`none`;let i=pe(e);e.style.width=`${i}px`,e.style.minWidth=`${i}px`;let a=Math.max(1,e.scrollHeight,e.offsetHeight,e.getBoundingClientRect().height),o=Math.min(1,r/i);n.style.width=`${Math.ceil(i*o)}px`,n.style.height=`${Math.ceil(a*o)}px`,n.style.setProperty(`--preview-page-scale`,o.toFixed(5)),e.style.transform=`scale(${o})`}}function de(e,t){let n=e.parentElement;if(n?.classList.contains(t))return n;let r=document.createElement(`div`);return r.className=t,n?.insertBefore(r,e),r.appendChild(e),r}function fe(){let e=getComputedStyle(d.preview),t=parseFloat(e.paddingLeft||`0`)+parseFloat(e.paddingRight||`0`);return Math.max(280,d.preview.clientWidth-t)}function pe(e){if(e.classList.contains(`word-page`))return 794;let t=v(e.style.width);if(Number.isFinite(t)&&t>0)return t;let n=v(getComputedStyle(e).width);return Number.isFinite(n)&&n>0?n:Math.max(1,e.scrollWidth,e.offsetWidth,e.getBoundingClientRect().width)}function v(e){let t=String(e||``).trim().match(/^(-?\d+(?:\.\d+)?)(px|pt|in|cm|mm|pc|q)?$/i);if(!t)return NaN;let n=Number(t[1]);if(!Number.isFinite(n))return NaN;let r=(t[2]||`px`).toLowerCase();return r===`px`?n:r===`pt`?96/72*n:r===`in`?n*96:r===`cm`?96/2.54*n:r===`mm`?96/25.4*n:r===`pc`?n*16:r===`q`?96/101.6*n:NaN}async function y(e){if(!l.modules.has(e)){let t=r(e===`doc`?()=>import(`./C_r8_Ab9.js`):e===`docx`?()=>import(`./pgL_B536.js`):e===`ppt`?()=>import(`./hrRjU6Vj.js`):e===`pptx`?()=>import(`./D28lHkZG.js`):()=>import(`./Cs_1smMj.js`),[],import.meta.url);l.modules.set(e,t)}return l.modules.get(e)}async function me(){let{default:e}=await r(async()=>{let{default:e}=await import(`./Dg3QxHNX.js`);return{default:e}},[],import.meta.url);return new e}async function he(e,t){let n={scanned:0,converted:0,failed:0},r=(e.assets||[]).filter(e=>e?.type===`image`&&/^image\/(?:emf|wmf)$/i.test(e.mime));for(let e of r){n.scanned+=1;try{let r=await ge(e),i=r?t(e.mime,r):null;if(!i){n.failed+=1;continue}e.mime=i.mime,e.bytes=i.bytes,e.dataUrl=i.dataUrl,e.displayable=!0,e.meta={...e.meta||{},vectorConverted:!0,vectorSourceMime:i.sourceMime,vectorWidth:i.width,vectorHeight:i.height,vectorRecordCount:i.recordCount},n.converted+=1}catch{n.failed+=1}}return n}async function ge(e){let t=e.bytes instanceof Uint8Array?e.bytes:new Uint8Array(e.bytes||[]);return t.length?e.meta?.metafileCompressed&&e.meta.metafileCompression===0&&e.meta.metafileFilter===254?_e(t):t:null}async function _e(e){if(typeof DecompressionStream>`u`)throw Error(`当前浏览器不支持 DecompressionStream，无法解压 DOC 内嵌矢量图。`);let t=new Blob([e.slice()]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(t).arrayBuffer())}async function ve(e,t){B(`加载 WASM`,`0 ms`,`-`,`加载中`),await P(`正在加载 WASM 安全校验...`,e),l.wasmRuntimePromise||=r(()=>import(`./DxnJeu1w.js`),[],import.meta.url);let{loadOfficeWasmCore:n}=await l.wasmRuntimePromise;l.wasmCorePromise||=n(`wasm/office-parser-core.wasm`);let i=await l.wasmCorePromise;if(!i.authorization.ok)return b(i.authorization);if(e===`xls`)return{ok:!0,engine:`assemblyscript-wasm`,parser:`origin-access-control`,wasm:!0,access:i.authorization.access,documentParser:`xls-binary-js-parser`,note:`XLS 二进制解析当前由 excel-viewer 的 hucre 路径处理，渲染前仍必须通过 WASM 域名授权。`};let a=e=>({...b(e),access:i.authorization.access});return e===`doc`?a(i.parseMsdoc(t)):e===`ppt`?a(i.parsePpt(t)):e===`docx`?a(i.parseDocx(t)):e===`xlsx`||e===`xlsb`?a(i.parseXlsx(t)):e===`pptx`?a(i.parsePptx(t)):{ok:!1,error:`不支持的格式：${e}`}}function b(e){return!e||e.error||e.parser===`origin-access-control`?{ok:!!e?.ok,engine:e?.engine??`assemblyscript-wasm`,parser:e?.parser??`unknown`,access:e?.access,error:e?.error}:e.container?{ok:e.ok,engine:e.engine,parser:e.parser,entries:e.container.entries.length,wordDocument:e.wordDocument??void 0,records:e.records??void 0}:{ok:e.ok,engine:e.engine,parser:e.parser,entryCount:e.package.entryCount,mainPart:e.package.mainPart,hasMainPart:e.package.hasMainPart,hasContentTypes:e.package.hasContentTypes}}function x(e){let t=q(e.format);ke(e.format),d.formatBadge.textContent=t.label,d.formatBadge.className=`format-badge tone-${t.tone}`,d.fileTitle.textContent=e.title,d.fileDetail.textContent=e.detail}function S(e){l.embedMode=e,d.appShell.classList.toggle(`embed-mode`,e),document.body.classList.toggle(`embed-mode`,e),e&&J(!1)}function C(e,t){let n=d.sampleSelect.querySelector(`option[value="${e}"]`);n||(n=document.createElement(`option`),n.value=e,d.sampleSelect.prepend(n)),n.textContent=t}function w(e){let t=e===`doc`||e===`docx`?`preview-word`:Y(e)?`preview-excel`:`preview-slides`;T(!0),A(!0),d.preview.className=`preview preview-${e} ${t}`,d.previewStage.dataset.previewMode=t,D()}function T(e){d.appShell.classList.toggle(`preview-active`,!!e),e||ye(!1)}function ye(e){l.previewInfoOpen=!!e,d.appShell.classList.toggle(`preview-info-open`,l.previewInfoOpen),d.previewInfoToggle.setAttribute(`aria-expanded`,String(l.previewInfoOpen)),d.previewInfoToggle.setAttribute(`aria-label`,l.previewInfoOpen?`隐藏预览信息`:`显示预览信息`)}function E(){return window.matchMedia?.(`(max-width: 760px)`).matches??window.innerWidth<=760}function D(){!E()||l.embedMode||requestAnimationFrame(()=>{if(d.appShell.classList.contains(`preview-active`)){window.scrollTo({top:0,left:0,behavior:`auto`});return}d.previewCard?.scrollIntoView({block:`start`,behavior:`smooth`})})}function be(){l.requestToken+=1,k();let e=i.find(e=>e.id===l.selectedId);B(l.currentBytes||l.externalSource||e?.path?`已选择`:`等待上传`,`0 ms`,l.currentBytes?`已缓存`:`-`,`未加载`),d.diagnostics.textContent=`已关闭预览，可重新选择样例或再次渲染当前文件。`,!(!E()||l.embedMode)&&requestAnimationFrame(()=>{d.sampleSection?.scrollIntoView({block:`start`,behavior:`smooth`})})}function O(){if(l.activeViewerHandle){try{l.activeViewerHandle.destroy?.()}catch{}l.activeViewerHandle=null}}function k(){O(),T(!1),A(!1),delete d.previewStage.dataset.previewMode,d.preview.className=`preview preview-empty`,d.preview.innerHTML=``}function A(e){l.samplesCollapsed=!!e;let t=!l.samplesCollapsed;d.appShell.classList.toggle(`samples-collapsed`,l.samplesCollapsed),d.sampleToggle.textContent=t?`收起样例`:`展开样例`,d.sampleToggle.setAttribute(`aria-expanded`,String(t))}function j(e,t=l.currentFormat){t?w(t):d.preview.className=`preview preview-loading`,M(e,t)}function M(e,t=l.currentFormat){O(),d.preview.innerHTML=N(e,t)}function N(e,t=l.currentFormat){let n=q(t),r=Ce(t);return`
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
  `}async function P(e,t=l.currentFormat){F(e,t),await L()}function F(e,t=l.currentFormat){let n=d.preview.querySelector(`.loading-message`);if(!n){t&&w(t),M(e,t);return}n.textContent=e}function I(e){let t=d.preview.querySelector(`.loading-progress`);if(!t)return;let n=t.querySelector(`.loading-progress-bar`),r=t.querySelector(`.loading-progress-text`),i=Number.isFinite(e?.percent)?Math.max(0,Math.min(100,Math.round(e.percent))):null;if(i!==null){t.hidden=!1,n.style.width=`${i}%`,n.classList.remove(`is-indeterminate`),r.textContent=`${i}%`;return}let a=Math.max(0,e?.received??0),o=Math.max(0,e?.total??0),s=a>0||o>0;if(t.hidden=!s,s){if(o>0){let e=Math.max(0,Math.min(100,Math.round(a/o*100)));n.style.width=`${e}%`,n.classList.remove(`is-indeterminate`),r.textContent=`${e}% · ${$(a)} / ${$(o)}`;return}n.style.width=`42%`,n.classList.add(`is-indeterminate`),r.textContent=`已下载 ${$(a)}`}}function xe(e,t=l.currentFormat){let n=e?.message||Se(e?.stage);d.renderStatus.textContent=n,F(n,t),Number.isFinite(e?.progress)&&I({percent:e.progress*100})}function Se(e){return e===`received`?`Excel Worker 已接收文件`:e===`parsing`?`Excel Worker 正在解析工作簿`:e===`normalizing`?`正在整理工作表结构`:e===`ready`?`工作簿已准备完成`:e===`window`?`正在按需加载表格窗口`:`正在处理 Excel 工作簿`}function Ce(e){let t=q(e);return t.theme===`excel`?`Excel 正在加载`:t.theme===`powerpoint`?`PowerPoint 正在加载`:`Word 正在加载`}function L(){return new Promise(e=>{if(typeof requestAnimationFrame!=`function`){setTimeout(e,0);return}requestAnimationFrame(()=>requestAnimationFrame(e))})}function R(e){d.preview.className=`preview preview-message`,d.preview.textContent=e}function z(e){let t=e instanceof Error?e.message:String(e);k(),l.embedMode&&R(t),B(`失败`,`0 ms`,`-`,t.includes(`WASM 安全校验未通过`)?`已拦截`:t.includes(`Office 临时锁文件`)||t.includes(`文件为空`)?`已跳过`:`异常`),d.diagnostics.textContent=e instanceof Error?e.stack||e.message:String(e)}function B(e,t,n,r){d.renderStatus.textContent=e,d.timeStatus.textContent=t,d.modelStatus.textContent=n,d.wasmStatus.textContent=r}function we(e){if(!o[e])return;l.activeCategory=e,V(),H(),U();let t=i.find(e=>e.id===l.selectedId);(!t||!K(t))&&p((G()[0]||i[0]).id,!1,{focusPreview:!1})}function V(){for(let e of d.navItems){let t=e.dataset.category===l.activeCategory;e.classList.toggle(`active`,t),t?e.setAttribute(`aria-current`,`page`):e.removeAttribute(`aria-current`)}d.sectionTitle.textContent=o[l.activeCategory]?.sampleTitle||o.all.sampleTitle}function H(){let e=G();if(d.sampleSelect.innerHTML=e.map(e=>`<option value="${Q(e.id)}">${Z(e.title)} - ${Z(e.detail)}</option>`).join(``),l.selectedId===`__external__`){C(`__external__`,`可道云文件 - ${l.currentTitle||`外部文件`}`),d.sampleSelect.value=`__external__`;return}if(l.selectedId===`__upload__`){C(`__upload__`,`上传文件 - ${l.currentTitle||`本地文件`}`),d.sampleSelect.value=`__upload__`;return}let t=e.some(e=>e.id===l.selectedId)?l.selectedId:e[0]?.id;t&&(d.sampleSelect.value=t)}function U(){d.sampleGrid.innerHTML=G().map(e=>{let t=q(e.format);return`
      <button class="sample-card sample-${e.format}" type="button" data-sample-id="${Q(e.id)}" aria-pressed="false">
        <span class="format-chip tone-${t.tone}">${Z(t.label)}</span>
        ${Te(e,t)}
        <span class="sample-title">${Z(e.title)}</span>
        <span class="sample-detail">${Z(e.detail)}</span>
      </button>
    `}).join(``),W()}function W(){let e=d.sampleGrid.querySelectorAll(`.sample-card`);for(let t of e){let e=t.dataset.sampleId===l.selectedId;t.classList.toggle(`active`,e),t.setAttribute(`aria-pressed`,String(e))}}function G(){return l.activeCategory===`all`?i:i.filter(e=>K(e))}function K(e){return l.activeCategory===`all`?!0:q(e.format).category===l.activeCategory}function Te(e,t){let n=Y(e.format)?`thumb-sheet`:e.format===`ppt`||e.format===`pptx`?`thumb-slide`:`thumb-doc`;return`
    <span class="sample-thumb ${n}" aria-hidden="true">
      <span class="thumb-icon tone-${t.tone}">${Z(t.icon)}</span>
      ${n===`thumb-sheet`?Oe():``}
      ${n===`thumb-slide`?De():``}
      ${n===`thumb-doc`?Ee():``}
    </span>
  `}function Ee(){return`
    <span class="doc-line wide"></span>
    <span class="doc-line"></span>
    <span class="doc-line short"></span>
    <span class="doc-table">
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
    </span>
  `}function De(){return`
    <span class="slide-title"></span>
    <span class="slide-block"></span>
    <span class="slide-bars"><i></i><i></i><i></i></span>
  `}function Oe(){return Array.from({length:24},()=>`<span></span>`).join(``)}function q(e){return a[e]||{label:String(e||`FILE`).toUpperCase(),icon:`F`,group:`文件`,tone:`blue`,category:`document`,theme:`word`}}function J(e){l.diagnosticsOpen=e,d.appShell.classList.toggle(`diagnostics-open`,e),d.diagnosticsToggle.setAttribute(`aria-expanded`,String(e)),d.diagnosticsDrawer.setAttribute(`aria-hidden`,String(!e)),d.diagnosticsOverlay.hidden=!e}function ke(e){let t=Ae(e);document.body.dataset.theme=t,d.appShell.dataset.theme=t}function Ae(e){return q(e).theme}function je(e){let t=e.split(`.`).pop()?.toLowerCase();if(Ne(t))return t;throw Error(`不支持的文件扩展名：${e}`)}function Me(e){let t=String(e||``).replace(/^\./,``).toLowerCase();if(Ne(t))return t;throw Error(`不支持的文件格式：${e}`)}function Ne(e){return[`doc`,`docx`,`ppt`,`pptx`,`xls`,`xlsx`,`xlsb`].includes(e)}function Y(e){return e===`xls`||e===`xlsx`||e===`xlsb`}function Pe(e,t){return!t||t.byteLength===0?!0:(String(e||``).split(/[\\/]/).pop()||``).startsWith(`~$`)}function Fe(e,t){let n=t instanceof Uint8Array?t:new Uint8Array(t||[]);if(n.length<4)return e;if(n[0]===80&&n[1]===75){if(X(n,`word/document.xml`))return`docx`;if(X(n,`ppt/presentation.xml`))return`pptx`;if(X(n,`xl/workbook.xml`))return`xlsx`}return e}function X(e,t){let n=Array.from(t,e=>e.charCodeAt(0));if(!n.length||e.length<n.length)return!1;let r=n[0],i=e.length-n.length;for(let t=0;t<=i;t+=1){if(e[t]!==r)continue;let i=!0;for(let r=1;r<n.length;r+=1)if(e[t+r]!==n[r]){i=!1;break}if(i)return!0}return!1}function Ie(){let e=new URLSearchParams(window.location.search),t=e.get(`file`)||e.get(`src`)||e.get(`url`);if(!t)return null;try{let n=new URL(t,window.location.href);if(n.origin!==window.location.origin)throw Error(`为了离线部署安全，预览文件链接必须与查看器同源。`);let r=e.get(`name`)||Re(n)||`KodCloud Office 文件`,i=e.get(`type`)?Me(e.get(`type`)):je(r);return{url:n.href,name:r,format:i,detail:`可道云传入文件，同源读取`}}catch(e){return{error:e}}}function Le(){let e=new URLSearchParams(window.location.search);return e.has(`file`)||e.has(`src`)||e.has(`url`)}function Re(e){let t=decodeURIComponent(e.pathname.split(`/`).filter(Boolean).pop()||``);return e.searchParams.get(`name`)||e.searchParams.get(`filename`)||t}function Z(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Q(e){return Z(e)}function $(e){return e<1024?`${e} B`:e<1024*1024?`${Math.round(e/1024)} KB`:`${(e/1024/1024).toFixed(1)} MB`}