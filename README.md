# 心动礼物研究所

一个面向 520、情人节和纪念日场景的女性礼物灵感网站，使用 React + Vite + NodeJS 构建，可直接作为静态 Page 部署。

## 本地运行

```bash
pnpm install
pnpm dev
```

## 构建部署

```bash
pnpm build
```

构建产物位于 `dist/`，可部署到 GitHub Pages、Cloudflare Pages、Vercel、Netlify 或任意静态托管服务。

GitHub Pages 自动部署指南见：`docs/GITHUB_PAGES.md`。

## 内容文档

- PRD 与用户心理分析：`docs/PRD.md`
- 礼物与惊喜源数据：`src/data/gifts.js`
- NodeJS 内容构建脚本：`scripts/build-content.js`
