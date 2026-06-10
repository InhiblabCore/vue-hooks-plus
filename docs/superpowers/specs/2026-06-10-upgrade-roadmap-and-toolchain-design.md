# vue-hooks-plus 全面升级：总体路线图 + 子项目①设计

日期：2026-06-10
状态：已确认（设计阶段）

## 背景与现状调研

用户目标：对项目做全面升级 —— 安全、单测完善、基于最新 Vue 的优化、es-toolkit 替换 lodash。

调研结论（2026-06-10，基于 master @ c6bec412）：

- **lodash → es-toolkit 已完成**：源码与所有 package.json 中无任何 lodash 引用，该方向无需立项。
- **Vue 版本**：工作区安装 Vue 3.5.34，但库 peerDependencies 声明 `^3.2.25`，无法使用 Vue 3.5 新 API。
- **测试**：`packages/hooks` 有 63 个 spec，除 `useUrlState` 外每个 hook 都有测试，但约 10 个 spec 仅 9~27 行（"should be defined" 级别）；`use-immer`、`use-url-state`、`use-worker`、`use-request-plugins`、`resolvers` 五个附属包零测试；未安装 coverage 工具。
- **安全**：生产依赖仅 1 个 moderate 漏洞（`use-request-plugins` → `broadcast-channel@5.x` → 旧版 `@babel/runtime`）；全量 audit 56 个漏洞（3 critical / 9 high / 38 moderate / 6 low），绝大部分来自陈旧开发工具链：`vite 3.0.2`、`vitest 2.1.9`、`vue-tsc 1.0.9`、`prettier 1.19.1`、`@vitejs/plugin-vue 2.3.1`、`happy-dom 15.10.2`。
- **其他发现**：构建已使用 tsdown（无需动）；根目录 vite 仅服务于 vitest（vitepress 自带 vite）；`package.json` 同时存在 husky（生效，`.husky/` 在用）与 `simple-git-hooks` 配置块（死配置）；`@typescript-eslint/eslint-plugin@5` 与 `@types/react-dom` 疑似死依赖。

## 已确认的决策

1. 四个方向按推荐顺序全做（方案 A：四个串行子项目，每个独立 spec → plan → PR）。
2. Vue 兼容策略：peerDependencies 提升到 `^3.5`，在 2.5.0-alpha 版本线上落地；老用户停留在 2.4.x。
3. 测试目标：补齐空白 + 加深浅测试 + 引入覆盖率门槛（核心包行覆盖率 ≥80%，CI 强制）。
4. 安全范围：修复现有漏洞 + CI audit 门禁 + Dependabot + 一次源码级安全审查。

## 总体路线图

| # | 子项目 | 核心产出 | 验收标准 |
|---|--------|---------|---------|
| ① | 工具链升级 + 依赖安全 + CI 门禁 | vitest 3 / vite 7 / vue-tsc / prettier 3 等全量升级；漏洞清零；CI audit 门禁；Dependabot | `pnpm audit --prod` 0 漏洞，全量 audit 无 high/critical；63 个存量 spec 全绿；`pnpm build` 成功 |
| ② | 测试完善 | coverage 基建；补齐 useUrlState 与 5 个附属包测试；加深约 10 个浅测试 | 核心包行覆盖率 ≥80% 且 CI 门槛生效；每个附属包有基础行为测试 |
| ③ | Vue 3.5 升级与内部现代化 | peerDep → `^3.5`；用 `onWatcherCleanup`、`watch` pause/resume 等重构内部实现 | 全测试绿（依赖②的安全网）；类型构建通过；发 2.5.0-alpha.x |
| ④ | 源码安全审查 | 审查 `useExternal`（脚本注入面）、`useCookieState`、`use-worker` 通信等攻击面 | 审查报告 + 每个确认问题有修复和对应测试 |

排序逻辑：①先行使测试写在新工具链上不返工；②为③的重构提供回归保护；④在测试基建完整后收尾。

本 spec 覆盖路线图整体与子项目①的详细设计；②③④在各自启动时另行 brainstorm 出独立 spec。

## 子项目① 详细设计：工具链升级 + 依赖安全 + CI 门禁

### 目标

在不改变任何 hook 源码行为的前提下，把开发工具链升至当前主流版本、清除依赖漏洞、建立防回归的安全门禁。

### 升级清单

**测试栈**（耦合，一组升级）：

| 依赖 | 现状 | 目标 |
|------|------|------|
| vitest（含 @vitest/ui） | 2.1.9 | 3.x 最新 |
| vite（根目录，仅 vitest 使用） | 3.0.2 | 7.x |
| @vitejs/plugin-vue | 2.3.1 | 与 vite 7 匹配的最新版 |
| happy-dom | 15.10.2 | 最新（audit 漏洞来源之一） |
| @vitest/coverage-v8 | 未安装 | 安装（门槛配置留给子项目②） |

**构建/类型栈**：

| 依赖 | 现状 | 目标 |
|------|------|------|
| vue-tsc | 1.0.9 | 最新（`packages/hooks` build 依赖其 `--noEmit`） |
| typescript | 声明 ^5.0.4（实际 5.9.3） | 声明对齐为 ^5.9 |

**其他工具**：

- prettier 1.19.1 → 3.x。**唯一需要改代码的点**：`scripts/bootstrap.ts` 中 `prettier.format()` 在 v3 为异步，需 `await`；同步检查 `scripts/utilts.ts` 的 prettierConfig。
- husky 8 → 9（保留 husky，`.husky/` 已在用）；删除 `package.json` 中无效的 `simple-git-hooks` 配置块。
- 清理死依赖：`@typescript-eslint/eslint-plugin@5`（eslint 9 flat config 经 `@vue/eslint-config-typescript@14` 引入新版 typescript-eslint，验证旧插件未被 `eslint.config.js` 引用后删除）、`@types/react-dom`。

**生产依赖漏洞修复**：

- `packages/use-request-plugins` 的 `broadcast-channel` ^5.1.0 → 最新，消除旧版 `@babel/runtime` 漏洞。

**兜底策略**：升级后仍残留的传递依赖漏洞用根 `pnpm.overrides` 钉版本；vitepress 保持 1.6.3 不动（1.x 最新版，升 2.x 超出本项目范围）。

### 实施顺序（每步独立 commit、独立可验证）

| 步骤 | 内容 | 验证 |
|------|------|------|
| 1 | 清死配置（simple-git-hooks 块）与死依赖（@typescript-eslint@5、@types/react-dom） | `pnpm install` + 63 spec 全绿 + pre-commit 钩子（lint-staged）可用 |
| 2 | 升测试栈：vitest 3 / vite 7 / plugin-vue / happy-dom / coverage-v8 | `pnpm vitest run` 63 spec 全绿 |
| 3 | 升构建栈：vue-tsc / typescript 声明 | `pnpm build` 成功 |
| 4 | prettier 3 + 适配 `scripts/bootstrap.ts`；husky 9 | `pnpm bootstrap` 后 `meta-data.json` diff 为空；pre-commit / commit-msg 钩子可用 |
| 5 | broadcast-channel 升级 + overrides 兜底 | `pnpm audit --prod` 0 漏洞；全量 audit 无 high/critical |
| 6 | CI：audit 门禁步骤 + `.github/dependabot.yml` | CI 全绿 |

### CI 门禁设计

- `ci.yml` 新增步骤：`pnpm audit --prod --audit-level=high` —— 生产依赖出现 high/critical 即失败；dev 依赖不阻塞（避免误伤日常开发）。
- 新增 `.github/dependabot.yml`：`npm` 与 `github-actions` 两个生态，每周扫描。

### 风险与回滚

- **vitest 3 breaking changes**（mock 行为、配置项变更）可能影响存量测试：步骤 2 单独成 commit，63 个 spec 为验收线，失败则在该步内修复或整步回滚。
- **vue-tsc 大版本跨度**可能暴露存量类型错误：属于应修的真问题，但只修到 `--noEmit` 通过为止，不做顺手重构。

### 明确不做（本子项目）

- 不动 `peerDependencies`（子项目③）。
- 不写新测试、不配覆盖率门槛（子项目②）。
- 不动 hooks 源码（除非类型检查强制要求最小修改）。
- 不升级 vitepress。
