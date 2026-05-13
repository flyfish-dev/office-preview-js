# Office Preview JS

Office Preview JS 是一个多格式 Office 文档在线预览 Demo，当前仓库仅包含已经构建好的静态产物，可直接部署到静态站点或 Vercel。公开 Demo 地址：

[https://demo.flyfish.group](https://demo.flyfish.group)

![Flyfish Office Preview 产品展示](docs/images/flyfish-office-hero.png)

## 官方入口

| 入口 | 链接 |
| --- | --- |
| 在线演示 | [https://demo.flyfish.group](https://demo.flyfish.group) |
| 产品介绍 | [https://product.flyfish.group](https://product.flyfish.group) |
| 飞鱼低代码平台 | [https://dev.flyfish.group](https://dev.flyfish.group) |
| 飞鱼小铺 / 购买 | [https://dev.flyfish.group/shop](https://dev.flyfish.group/shop) |
| 博客 | [https://blog.flyfish.dev](https://blog.flyfish.dev) |
| 文件预览产品线 | [https://viewer.flyfish.dev](https://viewer.flyfish.dev) |
| 代码仓库 | [https://git.flyfish.dev](https://git.flyfish.dev) |

## 支持格式

- Word: `.doc`, `.docx`
- PowerPoint: `.ppt`, `.pptx`
- Excel: `.xls`, `.xlsx`

## 已实现特性

- 纯前端静态部署，无需后端转换服务。
- 文件字节进入 WASM，WASM 输出文档模型，JS 侧负责 DOM、Canvas、SVG 渲染。
- 按文档类型按需加载 WASM 与相关 JS 分块，减少首屏负担。
- 内置部署范围校验，当前 Demo 构建仅允许 `demo.flyfish.group` 与 `127.0.0.1` 访问。
- Word 视图支持固定文档宽度、居中缩放、表格样式保真与 `.docx` 默认不分页渲染。
- PowerPoint 视图支持 `.ppt` 和 `.pptx` 预览，包含图片、常见形状、EMF/WMF/DIB 等兼容处理。
- Excel 视图支持 `.xls` 和 `.xlsx` 工作簿预览、工作表切换、基础样式和表格布局还原。
- 本地上传后自动识别格式并渲染，内置 Word、Excel、PowerPoint 原生风格加载动画。
- 调试信息通过浮动按钮按需展示，不干扰主体预览。
- 默认示例文件覆盖六类格式，可用于快速验收渲染效果。

## 运行截图

以下截图复用自 Flyfish Office Preview 产品页，用于快速了解实际预览效果。

| Word 文档预览 | PowerPoint 演示预览 | Excel 表格预览 |
| --- | --- | --- |
| ![Word 文档预览截图](docs/images/preview-word.png) | ![PowerPoint 演示预览截图](docs/images/preview-slides.png) | ![Excel 表格预览截图](docs/images/preview-spreadsheet.png) |

## 使用方式

本仓库是构建后的静态产物，直接在仓库根目录启动静态服务即可：

```bash
python3 -m http.server 5178 --bind 127.0.0.1
```

然后访问：

```text
http://127.0.0.1:5178/
```

也可以使用任意静态文件服务器部署，例如 Vercel、Nginx、Cloudflare Pages、Netlify。正式线上 Demo 请部署在站点根路径，当前公开演示构建的授权域名为：

```text
https://demo.flyfish.group
```

在其他域名访问会被 WASM 授权校验拦截，这是预期的安全限制。

## 部署说明

- 必须完整上传根目录下的 `index.html`、`assets/`、`wasm/`、`samples/`、`favicon.svg` 等文件。
- Vercel 部署可直接使用本仓库，`vercel.json` 已包含基础安全响应头。
- 如果使用 Nginx 或其他静态服务器，请确保 `.wasm` 使用 `application/wasm` MIME 类型。
- Demo 资源包含 Office 样例文件，生产接入时可删除 `samples/` 并改为业务自己的文件入口。

## 授权与源码说明

本仓库不包含解析器源码，仅用于公开 Demo 展示和接入评估。仓库公开不代表授予开源许可或商业私有化部署授权，所有商业使用、私有部署、二次分发、解除域名限制、源码交付、格式兼容性定制均需单独授权。

## 关于飞鱼

飞鱼低代码平台是轻量级、高性能、便捷的开源低代码集成平台。Office Preview JS 属于飞鱼文档预览产品线，面向 OA、公文流转、档案管理、合同标书、CRM、工单系统、知识库和企业内网系统，提供可私有化交付的 Office 在线预览能力。

如果你希望先了解完整产品方案，请访问 [产品介绍页](https://product.flyfish.group)。如果你希望直接体验多格式文件预览，请访问 [在线 Demo](https://demo.flyfish.group)。

## 商业购买与联系

如需购买授权或企业集成，请联系：

- 飞鱼小铺：[https://dev.flyfish.group/shop](https://dev.flyfish.group/shop)
- 微信客服：`Yous_Gift`
- 售后邮箱：wybaby168@gmail.com
- 商务邮箱：727842003@qq.com
- Demo：[https://demo.flyfish.group](https://demo.flyfish.group)
- 产品介绍：[https://product.flyfish.group](https://product.flyfish.group)

建议在沟通时提供部署域名、需要支持的格式、是否离线部署、预估文件大小和日访问量，便于评估交付方案。

| 客服微信 | 公众号 |
| --- | --- |
| <img src="docs/images/customer-wechat.jpg" width="260" alt="客服微信二维码"> | <img src="docs/images/wechat-mp.jpg" width="220" alt="公众号二维码"> |
