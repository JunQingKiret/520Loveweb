# GitHub Pages 部署指南

本项目已经内置 GitHub Actions 部署配置，推送到 `main` 分支后会自动使用 `pnpm` 构建，并把 `dist/` 发布到 GitHub Pages。

## 1. 前置条件

- 已创建 GitHub 仓库。
- 本地代码已经提交到仓库。
- 仓库默认分支为 `main`。如果你的默认分支是 `master`，需要把 `.github/workflows/deploy.yml` 中的 `branches: [main]` 改为 `branches: [master]`。
- 仓库允许 GitHub Actions 读写 Pages。如果组织策略禁止自动启用 Pages，需要手动在 `Settings -> Pages` 中选择 `GitHub Actions`。

## 2. 项目中的部署配置

部署工作流文件位于：

```text
.github/workflows/deploy.yml
```

它会执行以下步骤：

- 拉取代码。
- 安装 pnpm。
- 安装 Node.js 22。
- 执行 `pnpm install --frozen-lockfile`。
- 执行 `pnpm build`。
- 上传 `dist/`。
- 发布到 GitHub Pages。

工作流已经配置：

```yaml
enablement: true
```

这会让 `actions/configure-pages` 在仓库尚未启用 Pages 时自动启用 Pages，避免 `get-a-apiname-pages-site` 404。

工作流也设置了：

```yaml
FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

这用于提前切换 GitHub 官方 Actions 到 Node.js 24，避免 Node.js 20 弃用警告影响后续运行。

## 3. Vite 路径配置说明

GitHub Pages 的项目站点通常部署在：

```text
https://你的用户名.github.io/仓库名/
```

因此 Vite 需要正确的 `base` 路径。项目中的 `vite.config.js` 已经支持从环境变量读取：

```js
base: process.env.VITE_BASE_PATH || './'
```

Actions 中会自动设置：

```yaml
VITE_BASE_PATH: /${{ github.event.repository.name }}/
```

所以普通项目仓库不需要手动修改仓库名。

如果你部署的是用户主页仓库，例如：

```text
用户名.github.io
```

建议把 `.github/workflows/deploy.yml` 中的构建环境变量改成：

```yaml
VITE_BASE_PATH: /
```

## 4. 开启 GitHub Pages

进入 GitHub 仓库页面：

```text
Settings -> Pages -> Build and deployment
```

把 Source 设置为：

```text
GitHub Actions
```

保存后，GitHub 会使用项目中的 Actions 工作流发布页面。

## 5. 推送并触发部署

在本地执行：

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

推送后打开仓库的 `Actions` 标签页，查看 `Deploy to GitHub Pages` 工作流是否成功。

## 6. 访问地址

部署成功后，访问地址通常是：

```text
https://你的用户名.github.io/仓库名/
```

也可以在仓库的：

```text
Settings -> Pages
```

查看 GitHub 生成的正式访问链接。

## 7. 本地验证

部署前可以先在本地确认构建没有问题：

```bash
pnpm install
pnpm build
pnpm preview
```

如果本地构建成功，但 GitHub Actions 失败，优先检查：

- `pnpm-lock.yaml` 是否已提交。
- GitHub Pages 的 Source 是否设置为 `GitHub Actions`。
- 分支名是否和工作流中的 `branches` 一致。
- 仓库是否允许 Actions 运行。

## 8. 常见问题

### 页面空白或资源 404

通常是 Vite `base` 路径不正确。项目站点应使用：

```yaml
VITE_BASE_PATH: /仓库名/
```

用户主页站点应使用：

```yaml
VITE_BASE_PATH: /
```

### Actions 提示 frozen lockfile 失败

说明 `package.json` 和 `pnpm-lock.yaml` 不一致。执行：

```bash
pnpm install
```

然后提交更新后的 `pnpm-lock.yaml`。

### 默认分支不是 main

修改 `.github/workflows/deploy.yml`：

```yaml
on:
  push:
    branches: [你的分支名]
```

### `get-a-apiname-pages-site` 未找到

报错示例：

```text
Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions.
```

原因通常是仓库还没有启用 GitHub Pages。当前工作流已经给 `actions/configure-pages@v5` 增加：

```yaml
with:
  enablement: true
```

如果仍然失败，按以下顺序检查：

- 进入 `Settings -> Pages`，确认 Source 是 `GitHub Actions`。
- 进入 `Settings -> Actions -> General`，确认 Actions 没有被禁用。
- 如果仓库属于组织，确认组织策略允许 Actions 管理 Pages。
- 确认当前分支是工作流监听的分支，例如 `main`。
