<div align="center">
  <a href="https://demo.flyfish.group">
    <img src="./assets/office-preview-logo-dark.webp" alt="Office Preview JS" width="360" />
  </a>

  <h1>Office Preview JS</h1>

  <p>
    A production-ready static Office preview bundle for Word, PowerPoint, and Excel files.
  </p>

  <p>
    <a href="https://demo.flyfish.group"><img alt="Live Demo" src="https://img.shields.io/badge/demo-online-2563eb?style=for-the-badge" /></a>
    <img alt="Static Bundle" src="https://img.shields.io/badge/deploy-static%20bundle-16a34a?style=for-the-badge" />
    <img alt="Formats" src="https://img.shields.io/badge/formats-doc%20%7C%20docx%20%7C%20ppt%20%7C%20pptx%20%7C%20xls%20%7C%20xlsx-7c3aed?style=for-the-badge" />
    <img alt="License" src="https://img.shields.io/badge/license-commercial-111827?style=for-the-badge" />
  </p>

  <p>
    <strong>English</strong> · <a href="./README.zh-CN.md">简体中文</a>
  </p>
</div>

---

## Overview

Office Preview JS is the public static distribution of the Flyfish Office Preview product line. This repository contains built browser assets that can be used to evaluate high-fidelity Office document preview in a static hosting environment.

Live demo:

[https://demo.flyfish.group](https://demo.flyfish.group)

![Flyfish Office Preview product hero](docs/images/flyfish-office-hero.png)

## Official Links

| Resource | URL |
| --- | --- |
| Live Demo | [https://demo.flyfish.group](https://demo.flyfish.group) |
| Product Site | [https://product.flyfish.group](https://product.flyfish.group) |
| Flyfish Dev Platform | [https://dev.flyfish.group](https://dev.flyfish.group) |
| Shop / Purchase | [https://dev.flyfish.group/shop](https://dev.flyfish.group/shop) |
| Blog | [https://blog.flyfish.dev](https://blog.flyfish.dev) |
| Viewer Product Line | [https://viewer.flyfish.dev](https://viewer.flyfish.dev) |
| Git Service | [https://git.flyfish.dev](https://git.flyfish.dev) |

## Supported Formats

- Word: `.doc`, `.docx`
- PowerPoint: `.ppt`, `.pptx`
- Excel: `.xls`, `.xlsx`

## Highlights

- Runs as a static frontend bundle without a server-side conversion service.
- Loads document-specific WebAssembly and JavaScript chunks on demand.
- Provides a browser-based preview experience for Word, PowerPoint, and Excel files.
- Includes sample documents for quick local verification.
- Supports local file upload, automatic format detection, and built-in diagnostics.
- Uses document-style loading states so users can see rendering progress clearly.
- Includes a domain-scoped evaluation build for the public demo environment.

## Screenshots

The following screenshots are shared from the Flyfish Office Preview product page.

| Word Preview | PowerPoint Preview | Excel Preview |
| --- | --- | --- |
| ![Word preview screenshot](docs/images/preview-word.png) | ![PowerPoint preview screenshot](docs/images/preview-slides.png) | ![Excel preview screenshot](docs/images/preview-spreadsheet.png) |

## Quick Start

This repository is already built. Start any static file server from the repository root:

```bash
python3 -m http.server 5178 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5178/
```

You can also deploy the repository with any static hosting service, such as Nginx, Cloudflare Pages, Netlify, Vercel, or an internal static web server.

The public evaluation build is prepared for:

```text
https://demo.flyfish.group
```

For production, private deployment, additional domains, or source delivery, please purchase the matching commercial license.

## Deployment Notes

- Upload the complete static bundle, including `index.html`, `assets/`, `wasm/`, `samples/`, and `favicon.png`.
- Serve `.wasm` files with the `application/wasm` MIME type.
- Keep the relative directory structure unchanged.
- `samples/` is provided for evaluation. Production integrations can replace it with their own file source.
- If you deploy behind Nginx, CDN, or an enterprise gateway, make sure JavaScript, CSS, WASM, and sample files are not blocked by response headers.

## License

This repository contains built demo artifacts for evaluation only. Publishing this repository publicly does not grant an open-source license, commercial license, private deployment license, redistribution right, or source-code access.

Commercial use, private deployment, authorized domain activation, redistribution, source delivery, and custom integration require a separate written agreement.

See [LICENSE](./LICENSE) for details.

## Contact

For licensing, enterprise integration, or deployment support:

- Shop: [https://dev.flyfish.group/shop](https://dev.flyfish.group/shop)
- WeChat: `Yous_Gift`
- Support Email: [wybaby168@gmail.com](mailto:wybaby168@gmail.com)
- Business Email: [727842003@qq.com](mailto:727842003@qq.com)
- Live Demo: [https://demo.flyfish.group](https://demo.flyfish.group)
- Product Site: [https://product.flyfish.group](https://product.flyfish.group)

When contacting us, please include your deployment domain, target formats, deployment environment, expected file size range, and approximate daily usage. This helps us recommend the right delivery plan.

| WeChat Support | WeChat Official Account |
| --- | --- |
| <img src="docs/images/customer-wechat.jpg" width="260" alt="WeChat support QR code"> | <img src="docs/images/wechat-mp.jpg" width="220" alt="WeChat official account QR code"> |
