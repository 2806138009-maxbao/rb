# GitHub MCP 服务器部署指南

本项目已经在 `.mcp.json` 中注册了 `github-mcp-server`，并在 VS Code `tasks.json` 里新增了 **Start GitHub MCP Server** 任务。按照下面步骤即可完成配置与运行。

## 1. 准备 GitHub Token

1. 登录 GitHub → **Settings → Developer settings → Personal access tokens (classic)**。
2. 点击 “Generate new token (classic)”。
3. 至少勾选 `repo`、`workflow`、`write:packages` 等需要的权限。
4. 复制生成的 Token（只会显示一次），用于下一步环境变量。

推荐同时准备 GitHub 用户名，方便在 MCP Server 内部执行 Git 操作。

## 2. 设置环境变量

在系统或终端环境里配置：

```bash
setx GITHUB_TOKEN "<your-token>"
setx GITHUB_USERNAME "<your-github-username>"
```

重新打开终端/VS Code 后，`Start GitHub MCP Server` 任务会自动继承这些变量。如果只想在当前会话中使用，也可在终端运行：

```bash
set GITHUB_TOKEN=<your-token>
set GITHUB_USERNAME=<your-github-username>
```

（PowerShell/Unix shell 使用 `export` 即可。）

> `.mcp.json` 中的 `GITHUB_TOKEN`、`GITHUB_USERNAME` 仅为占位值，实际运行时会被环境变量覆盖，请勿把真实 Token 写进仓库。

## 3. 运行 GitHub MCP Server

1. 在 VS Code 命令面板中运行 `Tasks: Run Task`。
2. 选择 **Start GitHub MCP Server**。
3. 终端会执行 `npx github-mcp-server mcp`，成功后会输出已加载的 Git/MCP 工具列表。

若需要直接从命令行启动，也可运行：

```bash
npx github-mcp-server mcp
```

或提前全局安装：

```bash
npm install -g github-mcp-server
github-mcp-server mcp
```

## 4. 在 MCP 客户端中使用

VS Code、Cursor、Claude Desktop 等 MCP 客户端会读取 `.mcp.json` 并自动连接到 `github-mcp-server`。连接成功后，就能在对话中直接调用 `git-status`、`git-commit`、`git-flow` 等 29 项 Git 操作/工具。

## 5. 常见问题

- **npx 下载缓慢**：可以提前 `npm i -g github-mcp-server`，或配置国内镜像。
- **权限不足**：确认 Token 已包含 `repo`、`workflow` 等权限，并且未过期。
- **命令未找到**：确保本地 Node.js / npm 已安装，且在 PATH 中。

配置完成后，你的 GitHub 仓库就能通过 MCP 与 AI 助手联动，实现自动化 Git 管理。需要进一步自定义（如多仓库、只读权限等），可以在 `.mcp.json` 中添加更多配置，或参考 `npm view github-mcp-server readme` 获取完整文档。
