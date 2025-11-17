# EdgeOne MCP 本地配置说明

该项目已有 `.mcp.json` 声明多个 MCP server，包括 `edgeone-pages-mcp-server`（使用 `npx edgeone-pages-mcp-fullstack --region china` 启动）。下面说明如何在 VS Code 中启动并连接该 MCP。

## 快速开始

1. 打开项目根目录。
2. 在 VS Code 中打开命令面板（Ctrl+Shift+P），选择 `Tasks: Run Task`，然后选择 `Start EdgeOne MCP Server (china)`。
3. 任务将运行 `npx edgeone-pages-mcp-fullstack --region china`，并在终端内启动 MCP 服务（如第一次运行会自动下载依赖）。

## MCP 配置位置

- 项目根 `.mcp.json` 包含了 MCP servers 的声明，VS Code 扩展或其他工具会读取该文件来连接 MCP。

## 环境变量和安全

- `.mcp.json` 示例中可能包含 API key（注意不要将敏感密钥公开在远程仓库）。
- 建议将生产/私密密钥保存在系统环境变量或使用 `.env` 文件并加入 `.gitignore`。

## 验证

1. 运行任务后，检查终端日志，确认 MCP 启动并监听在某个端口或使用 stdio。
2. 若使用 VS Code 的 MCP 客户端扩展，请在扩展设置中添加或指向该 MCP server（通常会自动读取 `.mcp.json`）。

## 常见问题

- 如果 `npx` 下载失败，检查网络或使用 `npm i -g edgeone-pages-mcp-fullstack` 预先安装。
- 如果需要更改 region（例如 `global`），请修改 `.vscode/tasks.json` 中的命令或直接修改 `.mcp.json` 中对应 server 的 args。

## 进一步改进（建议）

- 添加 `launch.json` 来集成调试会话（取决于 MCP 如何暴露端点）。
- 若想用 HTTPS 或自定义端口，检查 `edgeone-pages-mcp-fullstack` 的 CLI 参数并更新任务命令。

---

自动生成于本地，用于让 VS Code 快速启动 EdgeOne MCP。若你希望我把 `launch.json` 也配置好，请告诉我你的调试目标（例如要在浏览器打开哪个 URL，或调试哪个前端/后端运行时）。
