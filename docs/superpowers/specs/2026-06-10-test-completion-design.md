# vue-hooks-plus 子项目②设计：测试完善（coverage 基建 + 补齐附属包 + 加深核心测试）

日期：2026-06-10
状态：已确认（设计阶段）
路线图：见 `2026-06-10-upgrade-roadmap-and-toolchain-design.md`（子项目②）
分支：`test/unit-test-completion`（基于 master @ 89385246，worktree `.worktrees/test-completion`）

## 背景与基线调研

子项目①已合入（vitest 4.1.8 + @vitest/coverage-v8 4.1.8 已安装但未配置）。基线测量（2026-06-10，master @ 89385246）：

- 现有 63 个 spec 文件、216 个测试全绿，全部位于 `packages/hooks`。
- `packages/hooks/src` 行覆盖率 **75.08%**（1392/1854，排除 demo/docs/__tests__ 后），距 80% 门槛缺 462 行中的约 92 行。
- 五个附属包（`use-immer`、`use-url-state`、`use-worker`、`use-request-plugins`、`resolvers`）**零测试**。
- `packages/hooks/src/useUrlState/` 只有 demo 和文档，**没有源码**——useUrlState 的唯一源码在 `packages/use-url-state`（依赖 qs、vue，并 `import useLocalStorageState from 'vue-hooks-plus/es/useLocalStorageState'`，指向构建产物路径）。"补齐 useUrlState 测试" = 给 `packages/use-url-state` 写测试。
- 覆盖缺口分布（未覆盖行数）：useRequest/devtools 79（仅 DEV 生效）、useRequest/plugins 78（其中 useDevtoolsPlugin.ts 占 26，亦为纯 DEV 代码）、useRequest/utils 48、useRequest/component-use 23（0%）、useWebSocket 24、约 10 个浅测试 hook 合计 ~120。
- `useExternal` 现有测试会访问真实网络（须修复）。
- `coverage/` 已在 .gitignore。

## 已确认的决策

1. **覆盖率统计范围**：排除纯 DEV 调试代码 `useRequest/devtools/**` 与 `useRequest/plugins/useDevtoolsPlugin.ts`；`component-use` 保留在统计内并补测试。排除后基线 **79.3%**（1368/1725）。
2. **加深档位**：浅测试加深 + useRequest 核心（缓存链路、utils 订阅模块、component-use）+ useWebSocket。预计最终 ~85%，门槛 80 留有真实余量。
3. **基建方式**：单一根 vitest 配置 + coverage 范围限定核心包；附属包测试由根运行自动拾取、不计入门槛分母；CI 现有 Unit Test 步骤改跑 coverage。

## 设计 §1：覆盖率基建与 CI 门槛

根 `vitest.config.ts` 的 `test` 块新增：

```ts
coverage: {
  provider: 'v8',
  include: ['packages/hooks/src/**'],
  exclude: [
    '**/demo/**', '**/docs/**', '**/__tests__/**', '**/*.d.ts',
    'packages/hooks/src/useRequest/devtools/**',
    'packages/hooks/src/useRequest/plugins/useDevtoolsPlugin.ts',
  ],
  thresholds: { lines: 80 },
  reporter: ['text', 'json-summary'],
},
```

- 根 `package.json` 新增脚本 `"test:coverage": "vitest run --coverage"`。
- `.github/workflows/ci.yml` 的 Unit Test 步骤由 `pnpm run test` 改为 `pnpm run test:coverage`（4 个矩阵格都执行，v8 开销数秒级）。本地 `pnpm test`（watch）不变。
- **alias 增项**：在现有 `'vue-hooks-plus'` alias **之前**增加 `'vue-hooks-plus/es' → packages/hooks/src`（rollup alias 按声明顺序前缀匹配），解决 use-url-state 源码对构建产物路径的 import；不改 use-url-state 源码。
- 附属包测试文件命名 `packages/<pkg>/src/__tests__/index.spec.ts`，vitest 默认 include 自动拾取，与现有测试同一次运行。

## 设计 §2：测试内容与 mock 策略

### A. 五个附属包基础行为测试

| 包 | 测试内容 | mock 策略 |
|---|---|---|
| use-immer | draft 更新、非函数值直接替换、结果冻结、原对象不被改动 | 无 |
| use-url-state | URL query 解析初始值、默认值兜底、setState 后 location.search 同步、置 undefined 移除参数 | happy-dom 自带 location/history，每用例前重置 URL |
| use-worker | lib 纯函数直测（remoteDepsParser、createWorkerBlobUrl、jobRunner）；hook 层 run→SUCCESS、kill→KILLED、timeout→TIMEOUT_EXPIRED | mock 全局 Worker（echo 实现）+ stub URL.createObjectURL/revokeObjectURL |
| use-request-plugins | useFetchingPlugin 全局请求态变化；useBroadcastChannelPlugin 跨实例同步钩子 | broadcast-channel 优先 `simulate` method；不稳则 vi.mock 模块只验证插件挂钩 |
| resolvers | VueHooksPlusResolver 对库内 hook 名返回 `{ name, from: 'vue-hooks-plus' }`、prefix 选项生效、非库名返回 undefined；4 个子 resolver（useImmer/useUrlState/useWorker/useRequest）各自映射到 `@vue-hooks-plus/*` | 主 resolver 经 local-pkg 读 meta-data.json，workspace 内可解析；若解析不稳则 vi.mock local-pkg |

### B. 加深浅测试（重点项）

- **useExternal**（17 行）：对创建的 `<script>/<link>` 手动派发 `load`/`error` 事件，**彻底移除真实网络访问**；测 loading→ready/error、unload 移除 DOM、相同 src 复用元素。
- **useWebSocket**（24 行）：mock 全局 WebSocket 类，测 open/message/close/error、手动 connect/close、自动重连分支（reconnectLimit 耗尽停止）。
- useFullscreen（17）：mock document 全屏 API + fullscreenchange；useDrop/useDrag（21）：合成 DragEvent/paste，验证 onText/onFiles/onUri/onDom 分发；useMouse（9）：dispatch mousemove 断言坐标族；useSize（8）、useNetwork（7）及 useInterval/useTimeout/useScroll 等长尾小缺口各补 1–2 个分支用例。

### C. useRequest 核心加深

- **缓存链路**（useCachePlugin 15 + cache.ts 9 + cacheSubscribe 7 + cachePromise 2）：同 cacheKey 二次挂载读缓存、staleTime 内不重发、并发共享同一 promise、setCache/getCache 自定义、两实例经订阅同步。
- **utils 订阅模块**（limit 7 + subscribeFocus 9 + subscribeReVisible 8 + isOnline 3）：limit 纯函数直测；focus/revisible 经 refreshOnWindowFocus 与 polling 插件路径触发（派发 visibilitychange/focus 事件）。
- **component-use/UseRequest.ts**（23，0%）：mount `<UseRequest :service>`，断言默认插槽 loading→data 流转、service/options 变更触发重新请求。
- retry/polling/autoRun 零星分支（各 5–6 行）用 fake timers 补；Fetch.ts 剩余 19 行会被上述测试自然带到，不单独立任务。

### D. 纪律

- **不改任何运行时源码**。测试中发现疑似真实 bug：记录并报告用户，不静默修复。
- `packages/use-request` 是生成副本，不放测试（sync 排除）。
- 计时类测试优先 fake timers，避免拖慢套件（现有真实 sleep 风格的用例不动）。

## 验收标准

1. `pnpm test:coverage` 全绿，`packages/hooks` 行覆盖率 ≥80%（按上述排除口径；预计 ~85%）。
2. 5 个附属包各有基础行为测试，且在根 vitest 运行中被执行。
3. useExternal 测试无真实网络访问。
4. CI Unit Test 步骤强制覆盖率门槛（thresholds 未达标即失败）。
5. 现有 216 个测试零回归；不改任何运行时源码。
