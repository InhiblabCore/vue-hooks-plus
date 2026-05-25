# VueHooks Plus 2.5.0-alpha.0 更新说明

> **重要提示：最低 Node.js 版本**
>
> 本仓库的开发、构建、CI 和文档构建要求使用 **Node.js >= 22.18.0**。该要求来自当前 `tsdown` 构建工具链。已发布 hooks 在浏览器中的使用仍以 Vue 3 为准，不会额外增加 Node.js 运行时要求。

本次 alpha 是一次全链路稳定性维护版本，重点覆盖 `useRequest` 缓存层、构建工具链、类型产物、示例文档、测试覆盖和历史 issue 复盘。

## 主要变更

- 重构 `useRequest` 缓存能力，支持异步 `getCache` / `setCache`、动态 `cacheKey`，并补齐缓存命中、降级和订阅清理测试。
- 构建链路迁移到 `tsdown`，保留既有 CJS/ESM/IIFE 文件名、深路径导入和类型入口兼容。
- 将开发与 CI 构建环境升级到 Node.js 22.18.0+，避免使用旧 Node 版本运行不受支持的现代构建工具链。
- 升级 `happy-dom` 到安全版本，修复 Socket 报告的关键漏洞，并适配新版 MutationObserver 的异步回调行为。
- 补齐 hooks 示例、核心行为单测、文档说明和 issues 分析报告，提升维护可验证性。

## 迁移提醒

- 本地参与开发或执行 `pnpm build` / `pnpm docs:build` 前，请先确认 Node.js 版本不低于 `22.18.0`。
- 应用侧安装和使用 `vue-hooks-plus` 的浏览器运行时行为保持兼容；本次 Node.js 要求主要针对仓库开发、包构建和文档构建。
- 如果 CI 仍使用 Node.js 18 或 20，需要同步升级到 Node.js 22.18.0 或 24.x。
