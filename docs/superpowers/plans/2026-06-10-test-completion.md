# 测试完善（子项目②）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 packages/hooks 建立 ≥80% 行覆盖率 CI 门槛，补齐 5 个附属包的基础行为测试，加深 useRequest 核心与约 10 个浅测试 hook。

**Architecture:** 单一根 vitest 配置承载所有包的测试；coverage include 仅 `packages/hooks/src`（排除纯 DEV 的 devtools 代码），附属包测试由 vitest 默认 include 自动拾取但不计入门槛分母。先建基建（无门槛）→ 分任务补测试 → 最后一个任务启用 thresholds 并切换 CI，保证每个 commit 都是绿的。

**Tech Stack:** vitest 4.1.8 + @vitest/coverage-v8（已安装）、happy-dom 20、@vue/test-utils、test-utils 别名（renderHook/sleep）、pinia（use-request-plugins 已有依赖）。

**Spec:** `docs/superpowers/specs/2026-06-10-test-completion-design.md`
**Worktree/分支:** `.worktrees/test-completion` / `test/unit-test-completion`（基于 master @ 89385246）
**基线（2026-06-10）:** 216 测试全绿；排除 devtools 后行覆盖 79.3%（1368/1725）

---

## 全局约定（每个任务都适用）

1. **绝不修改运行时源码**（`packages/*/src` 下除 `__tests__` 外的任何文件；vitest.config.ts、package.json scripts、ci.yml、tsconfig 等配置除外）。测试若揭示疑似源码 bug：**停止该用例，报告 BLOCKED**，不要静默修复，也不要把断言改成迁就错误行为。
2. 测试环境 `globals: true`：`describe`/`it`/`expect`/`vi` 无需 import。
3. 常用工具：`import renderHook from 'test-utils/renderHook'`（返回 `[hook返回值, app]`，`app.unmount()` 卸载）、`import { sleep } from 'test-utils/sleep'`。
4. 提交一律用 `command git`（绕过 shell 别名），提交后必须验证：`command git log -1 --format='%h %s'` 与 `command git show --stat HEAD`，确认消息与文件清单和预期完全一致（本仓库曾发生外部进程篡改提交）。
5. 运行单个测试文件：`pnpm vitest run <文件路径>`；全量：`pnpm vitest run`；覆盖率：`pnpm test:coverage`（Task 1 之后可用）。
6. 计时类用例优先用小间隔真实计时（`sleep`，与现有用例风格一致）；时序断言留足余量（≥2 倍间隔），避免 flaky。

---

### Task 1: 覆盖率基建（不含门槛）

**Files:**
- Modify: `vitest.config.ts`
- Modify: `package.json`（根，scripts 增一行）

- [ ] **Step 1: 改写 vitest.config.ts**

完整新内容（在现有基础上：alias 增加 `vue-hooks-plus/es` 一条且必须放在 `vue-hooks-plus` **之前**；test 块增加 coverage；其余不动）：

```ts
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      'vue-hooks-plus/es': resolve(__dirname, './packages/hooks/src'),
      'vue-hooks-plus': resolve(__dirname, './packages/hooks/src/index.ts'),
      '@': resolve(__dirname, './packages/hooks/src'),
      'test-utils': resolve(__dirname, './packages/hooks/test-utils'),
    },
    dedupe: ['vue', '@vue/runtime-core'],
  },
  // @ts-ignore
  plugins: [vue()],
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      include: ['packages/hooks/src/**'],
      exclude: [
        '**/demo/**',
        '**/docs/**',
        '**/__tests__/**',
        '**/*.d.ts',
        'packages/hooks/src/useRequest/devtools/**',
        'packages/hooks/src/useRequest/plugins/useDevtoolsPlugin.ts',
      ],
      reporter: ['text', 'json-summary'],
    },
  },
  ssr: {
    noExternal: [/vue-hooks-plus\/.*/],
  },
})
```

注意：**不要在本任务加 thresholds**（当前 79.3% < 80 会立刻红），门槛在 Task 13 启用。

- [ ] **Step 2: 根 package.json scripts 增加**

```json
"test:coverage": "vitest run --coverage",
```

- [ ] **Step 3: 验证**

Run: `pnpm test:coverage`
Expected: 216 tests passed；末尾覆盖率汇总 Lines ≈ 79.3%（1368/1725 左右，devtools 已不在表中）；生成 `coverage/coverage-summary.json`（已被 .gitignore 忽略，不提交）。

- [ ] **Step 4: Commit**

```bash
command git add vitest.config.ts package.json
command git commit -m "test: add coverage infrastructure for packages/hooks"
```

---

### Task 2: use-immer + resolvers 基础测试

**Files:**
- Create: `packages/use-immer/src/__tests__/index.spec.ts`
- Create: `packages/resolvers/src/__tests__/index.spec.ts`

- [ ] **Step 1: 写 use-immer 测试**

源码：`packages/use-immer/src/index.ts`（20 行，`useImmer` 返回 `[shallowReadonly(state), update]`）。

```ts
import { useImmer } from '..'

describe('useImmer', () => {
  it('should update state via draft function', () => {
    const [state, update] = useImmer({ count: 0, nested: { a: 1 } })
    update(draft => {
      draft.count++
    })
    expect(state.value.count).toBe(1)
    expect(state.value.nested.a).toBe(1)
  })

  it('should keep previous snapshot untouched', () => {
    const [state, update] = useImmer({ list: [1, 2] })
    const before = state.value
    update(draft => {
      draft.list.push(3)
    })
    expect(before.list).toEqual([1, 2])
    expect(state.value.list).toEqual([1, 2, 3])
    expect(state.value).not.toBe(before)
  })

  it('should support lazy initializer', () => {
    const [state] = useImmer(() => ({ ready: true }))
    expect(state.value.ready).toBe(true)
  })

  it('should replace state with non-function updater', () => {
    const [state, update] = useImmer<{ a: number }>({ a: 1 })
    update({ a: 2 })
    expect(state.value.a).toBe(2)
  })

  it('should freeze state', () => {
    const [state, update] = useImmer({ a: 1 })
    expect(Object.isFrozen(state.value)).toBe(true)
    update(draft => {
      draft.a = 2
    })
    expect(Object.isFrozen(state.value)).toBe(true)
  })
})
```

- [ ] **Step 2: 写 resolvers 测试**

源码：`packages/resolvers/src/unplugin-auto-import-resolver/`。已导出：`VueHooksPlusResolver`（经 local-pkg 读 meta-data.json）、`VueHooksPlusUseImmerResolver`、`VueHooksPlusUseWorkerResolver`、`VueHooksPlusUseUrlStateResolver`。注意 `useRequestResolver.ts` 存在但**未从 index 导出** —— 这是一个发现，写入最终报告，不要为它改源码。

mock 必须用 `vi.hoisted` 或放在 `vi.mock` 工厂内（`vi.mock` 会被提升到 import 之前）：

```ts
vi.mock('local-pkg', () => ({
  resolveModule: vi.fn(() => '/fake/vue-hooks-plus/meta-data.json'),
}))
vi.mock('node:fs', () => ({
  readFileSync: vi.fn(() => JSON.stringify({ function: ['useBoolean', 'useToggle'] })),
}))

import {
  VueHooksPlusResolver,
  VueHooksPlusUseImmerResolver,
  VueHooksPlusUseWorkerResolver,
  VueHooksPlusUseUrlStateResolver,
} from '..'

describe('VueHooksPlusResolver', () => {
  it('should resolve known hook names from meta-data', () => {
    const resolver = VueHooksPlusResolver()
    expect(resolver('useBoolean')).toEqual({ name: 'useBoolean', from: 'vue-hooks-plus' })
  })

  it('should return undefined for unknown names', () => {
    const resolver = VueHooksPlusResolver()
    expect(resolver('useUnknownThing')).toBeUndefined()
  })

  it('should respect prefix option', () => {
    const resolver = VueHooksPlusResolver({ prefix: 'Vh' })
    expect(resolver('VhuseToggle')).toEqual({ name: 'useToggle', from: 'vue-hooks-plus' })
    expect(resolver('useToggle')).toBeUndefined()
  })
})

describe('sub resolvers', () => {
  it.each([
    [VueHooksPlusUseImmerResolver, 'useImmer', '@vue-hooks-plus/use-immer'],
    [VueHooksPlusUseWorkerResolver, 'useWorker', '@vue-hooks-plus/use-worker'],
    [VueHooksPlusUseUrlStateResolver, 'useUrlState', '@vue-hooks-plus/use-url-state'],
  ])('resolves its own hook', (factory: any, hook: string, from: string) => {
    const resolver = factory()
    expect(resolver(hook)).toEqual({ name: hook, from })
    expect(resolver('useNope')).toBeUndefined()
  })
})
```

注意：先读三个子 resolver 源文件确认 `from` 包名与上表一致，不一致则以源码为准修正断言（这是断言数据，不是源码行为问题）。

- [ ] **Step 3: 运行验证**

Run: `pnpm vitest run packages/use-immer packages/resolvers`
Expected: 全部 PASS。若 resolvers 因 `node:fs` mock 形态失败（包内可能用 `import { readFileSync }`），按实际 import 形态调整 mock 工厂返回（如补 `default` 导出）。

- [ ] **Step 4: Commit**

```bash
command git add packages/use-immer/src/__tests__ packages/resolvers/src/__tests__
command git commit -m "test: add use-immer and resolvers package tests"
```

---

### Task 3: use-url-state 基础测试

**Files:**
- Create: `packages/use-url-state/src/__tests__/index.spec.ts`

源码：`packages/use-url-state/src/index.ts`。关键事实：状态同步到 **`location.hash`**（`#path?params` 形式），默认 `routerPush = s => (location.hash = s)`；`detectNumber` 默认 true；`localStorageKey` 时底层用 useLocalStorageState（经 Task 1 的 `vue-hooks-plus/es` alias 解析到源码）；初始优先级 url > localStorage > 默认值。

- [ ] **Step 1: 写测试**

```ts
import { nextTick } from 'vue'
import useUrlState from '..'
import renderHook from 'test-utils/renderHook'

describe('useUrlState', () => {
  beforeEach(() => {
    location.hash = ''
    localStorage.clear()
  })

  it('should use initial state and write it to location.hash', () => {
    const [state] = renderHook(() => useUrlState({ page: 1 }))
    expect(state.value.page).toBe(1)
    expect(location.hash).toContain('page=1')
  })

  it('should parse initial state from hash and override defaults', () => {
    location.hash = '#/list?page=3&keyword=vue'
    const [state] = renderHook(() => useUrlState({ page: 1, keyword: '' }))
    expect(state.value.page).toBe(3) // detectNumber 默认 true → number
    expect(state.value.keyword).toBe('vue')
  })

  it('should keep string when detectNumber is false', () => {
    location.hash = '#?v=42'
    const [state] = renderHook(() => useUrlState({ v: '' }, { detectNumber: false }))
    expect(state.value.v).toBe('42')
  })

  it('should decode keyword values like true/false/null', () => {
    location.hash = '#?flag=true&empty=null'
    const [state] = renderHook(() => useUrlState<any>({ flag: false, empty: '' }))
    expect(state.value.flag).toBe(true)
    expect(state.value.empty).toBeNull()
  })

  it('should sync state changes through custom routerPush', async () => {
    const pushed: string[] = []
    location.hash = '#/home?count=1'
    const [state] = renderHook(() =>
      useUrlState({ count: 1 }, { routerPush: url => pushed.push(url) }),
    )
    expect(pushed[0]).toBe('/home?count=1') // watch immediate
    state.value.count = 5
    await nextTick()
    expect(pushed[pushed.length - 1]).toBe('/home?count=5')
  })

  it('should drop keys set to undefined from the url', async () => {
    const pushed: string[] = []
    location.hash = '#/p?a=1'
    const [state] = renderHook(() =>
      useUrlState<any>({ a: 1 }, { routerPush: url => pushed.push(url) }),
    )
    state.value.a = undefined
    await nextTick()
    expect(pushed[pushed.length - 1]).toBe('/p?') // qs.stringify 丢弃 undefined
  })

  it('should read initial state from localStorage when url has no params', () => {
    localStorage.setItem('url-state-k', JSON.stringify({ a: 7 }))
    const [state] = renderHook(() => useUrlState({ a: 1 }, { localStorageKey: 'url-state-k' }))
    expect(state.value.a).toBe(7)
  })

  it('should prefer url params over localStorage', () => {
    localStorage.setItem('url-state-k2', JSON.stringify({ a: 7 }))
    location.hash = '#?a=3'
    const [state] = renderHook(() => useUrlState({ a: 1 }, { localStorageKey: 'url-state-k2' }))
    expect(state.value.a).toBe(3)
  })
})
```

- [ ] **Step 2: 运行验证**

Run: `pnpm vitest run packages/use-url-state`
Expected: 全部 PASS。若 `vue-hooks-plus/es/useLocalStorageState` 解析失败，检查 Task 1 的 alias 顺序（`/es` 条目必须在前）。

- [ ] **Step 3: Commit**

```bash
command git add packages/use-url-state/src/__tests__
command git commit -m "test: add use-url-state package tests"
```

---

### Task 4: use-worker 测试

**Files:**
- Create: `packages/use-worker/src/__tests__/lib.spec.ts`（纯函数）
- Create: `packages/use-worker/src/__tests__/index.spec.ts`（hook 状态机）

- [ ] **Step 1: 写 lib 纯函数测试（lib.spec.ts）**

```ts
import remoteDepsParser from '../lib/remoteDepsParser'
import createWorkerBlobUrl from '../lib/createWorkerBlobUrl'
import jobRunner from '../lib/jobRunner'
import { TRANSFERABLE_TYPE } from '..'

describe('remoteDepsParser', () => {
  it('returns empty string for no deps', () => {
    expect(remoteDepsParser([])).toBe('')
  })
  it('builds importScripts statement', () => {
    expect(remoteDepsParser(['http://a.js', 'http://b.js'])).toBe(
      "importScripts('http://a.js','http://b.js')",
    )
  })
})

describe('createWorkerBlobUrl', () => {
  it('creates a blob url embedding fn, deps and transferable flag', async () => {
    const blobs: Blob[] = []
    const orig = { create: URL.createObjectURL, revoke: URL.revokeObjectURL }
    URL.createObjectURL = vi.fn((b: Blob) => {
      blobs.push(b)
      return 'blob:mock-url'
    })
    try {
      const fn = (a: number, b: number) => a + b
      const url = createWorkerBlobUrl(fn, ['http://dep.js'], TRANSFERABLE_TYPE.AUTO)
      expect(url).toBe('blob:mock-url')
      const code = await blobs[0].text()
      expect(code).toContain("importScripts('http://dep.js')")
      expect(code).toContain('a + b')
      expect(code).toContain("transferable: 'auto'")
    } finally {
      URL.createObjectURL = orig.create
      URL.revokeObjectURL = orig.revoke
    }
  })
})

describe('jobRunner', () => {
  it('posts SUCCESS with fn result', async () => {
    const postMessage = vi.fn()
    vi.stubGlobal('postMessage', postMessage)
    const handler = jobRunner({ fn: (a: number, b: number) => a + b, transferable: TRANSFERABLE_TYPE.NONE })
    await handler({ data: [[2, 3]] } as MessageEvent)
    expect(postMessage).toHaveBeenCalledWith(['SUCCESS', 5], [])
    vi.unstubAllGlobals()
  })

  it('posts ERROR when fn throws', async () => {
    const postMessage = vi.fn()
    vi.stubGlobal('postMessage', postMessage)
    const boom = new Error('boom')
    const handler = jobRunner({ fn: () => { throw boom }, transferable: TRANSFERABLE_TYPE.NONE })
    await handler({ data: [[]] } as MessageEvent)
    expect(postMessage).toHaveBeenCalledWith(['ERROR', boom])
    vi.unstubAllGlobals()
  })
})
```

- [ ] **Step 2: 写 hook 测试（index.spec.ts）**

Worker 无法在 happy-dom 真实运行，用可控 echo mock。注意源码细节：`controller.status` 运行时是 `ref`、`controller.kill` 运行时是 `computed`（类型断言掩盖了这一点，测试里用 `as any` 取 `.value`）；`killWorker` 依赖 `worker._url` 与 `URL.revokeObjectURL`。

```ts
import { nextTick } from 'vue'
import { useWorker, WORKER_STATUS } from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

type Behavior = 'success' | 'error' | 'silent'
let behavior: Behavior = 'success'

class MockWorker {
  _url?: string
  onmessage: ((e: { data: [string, unknown] }) => void) | null = null
  onerror: ((e: unknown) => void) | null = null
  constructor(public url: string) {}
  postMessage([args]: [unknown[]]) {
    setTimeout(() => {
      if (behavior === 'success') this.onmessage?.({ data: ['SUCCESS', args] })
      else if (behavior === 'error') this.onmessage?.({ data: ['ERROR', new Error('worker failed')] })
      // silent: 不回复，供 timeout / kill 测试
    }, 10)
  }
  terminate() {}
}

beforeAll(() => {
  vi.stubGlobal('Worker', MockWorker)
  URL.createObjectURL = vi.fn(() => `blob:mock-${Math.random()}`)
  URL.revokeObjectURL = vi.fn()
})
afterAll(() => {
  vi.unstubAllGlobals()
})

const statusOf = (controller: any) => controller.status.value as WORKER_STATUS

describe('useWorker', () => {
  it('runs and resolves with SUCCESS status (echo mock returns args)', async () => {
    behavior = 'success'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n * 2))
    const p = run(21)
    expect(statusOf(controller)).toBe(WORKER_STATUS.RUNNING)
    await expect(p).resolves.toEqual([21])
    expect(statusOf(controller)).toBe(WORKER_STATUS.SUCCESS)
  })

  it('rejects and sets ERROR status', async () => {
    behavior = 'error'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n))
    await expect(run(1)).rejects.toBeInstanceOf(Error)
    expect(statusOf(controller)).toBe(WORKER_STATUS.ERROR)
  })

  it('kill() terminates a running worker', async () => {
    behavior = 'silent'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n))
    run(1).catch(() => {})
    expect(statusOf(controller)).toBe(WORKER_STATUS.RUNNING)
    ;(controller as any).kill.value()
    expect(statusOf(controller)).toBe(WORKER_STATUS.KILLED)
  })

  it('expires with TIMEOUT_EXPIRED when worker never answers', async () => {
    behavior = 'silent'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n, { timeout: 30 }))
    run(1).catch(() => {})
    await sleep(80)
    expect(statusOf(controller)).toBe(WORKER_STATUS.TIMEOUT_EXPIRED)
  })

  it('refuses a second run while one is in flight', async () => {
    behavior = 'silent'
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const [[run]] = renderHook(() => useWorker((n: number) => n))
    run(1).catch(() => {})
    await nextTick() // isRunning 经 watchEffect 同步,需等一个 tick
    await expect(run(2)).rejects.toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})
```

- [ ] **Step 3: 运行验证**

Run: `pnpm vitest run packages/use-worker`
Expected: 全部 PASS。

- [ ] **Step 4: Commit**

```bash
command git add packages/use-worker/src/__tests__
command git commit -m "test: add use-worker package tests"
```

---

### Task 5: use-request-plugins 测试

**Files:**
- Create: `packages/use-request-plugins/src/__tests__/index.spec.ts`

关键事实：`useFetchingPlugin` 内部用 pinia store（包已依赖 pinia ^2.0.30），测试前 `setActivePinia(createPinia())`；`useBroadcastChannelPlugin` 用 `broadcast-channel` 库，测试用其 `{ type: 'simulate' }` 方法保证进程内确定性投递（双方都需 simulate）。插件经 `useRequest(service, { pluginOptions: {...} }, [plugin])` 挂载，跨包类型不严格匹配处用 `as any`。

- [ ] **Step 1: 写测试**

```ts
import { createPinia, setActivePinia } from 'pinia'
import { BroadcastChannel } from 'broadcast-channel'
import { useRequest } from 'vue-hooks-plus'
import { useFetchingPlugin, useBroadcastChannelPlugin } from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

const okService = (v: string) => new Promise<string>(res => setTimeout(() => res(v), 20))

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('useFetchingPlugin', () => {
  it('reports success through onFetching and isFetching', async () => {
    const onFetching = vi.fn()
    const isFetching = vi.fn()
    renderHook(() =>
      useRequest(
        () => okService('a'),
        { pluginOptions: { fetchingKey: () => 'k1', onFetching, isFetching } } as any,
        [useFetchingPlugin as any],
      ),
    )
    await sleep(60)
    expect(onFetching).toHaveBeenCalled()
    const current = onFetching.mock.calls[0][0]
    expect(current.status).toBe('success')
    expect(current.data).toBe('a')
    expect(isFetching).toHaveBeenLastCalledWith(true)
  })

  it('marks error status on failure', async () => {
    const onFetching = vi.fn()
    renderHook(() =>
      useRequest(
        () => Promise.reject(new Error('x')),
        { pluginOptions: { fetchingKey: () => 'k2', onFetching } } as any,
        [useFetchingPlugin as any],
      ),
    )
    await sleep(30)
    const current = onFetching.mock.calls.at(-1)?.[0]
    expect(current.status).toBe('error')
    expect(current.data).toBeNull()
  })
})

describe('useBroadcastChannelPlugin', () => {
  it('broadcasts success result to sibling channels', async () => {
    const received: any[] = []
    const listener = new BroadcastChannel('bc-test-1', { type: 'simulate', webWorkerSupport: false })
    listener.onmessage = msg => received.push(msg)
    renderHook(() =>
      useRequest(
        () => okService('payload'),
        {
          pluginOptions: {
            broadcastChannel: 'bc-test-1',
            broadcastChannelKey: 'k',
            broadcastChannelOptions: { type: 'simulate', webWorkerSupport: false },
          },
        } as any,
        [useBroadcastChannelPlugin as any],
      ),
    )
    await sleep(100)
    expect(received.length).toBeGreaterThan(0)
    expect(received[0].data).toBe('payload')
    expect(received[0].broadcastChannelKey).toBe('k')
    await listener.close()
  })

  it('invokes onBroadcastChannel when a message arrives', async () => {
    const sender = new BroadcastChannel('bc-test-2', { type: 'simulate', webWorkerSupport: false })
    const onBroadcastChannel = vi.fn()
    renderHook(() =>
      useRequest(
        () => okService('init'),
        {
          pluginOptions: {
            broadcastChannel: 'bc-test-2',
            broadcastChannelOptions: { type: 'simulate', webWorkerSupport: false },
            onBroadcastChannel,
          },
        } as any,
        [useBroadcastChannelPlugin as any],
      ),
    )
    await sleep(30)
    await sender.postMessage({ type: 'sync', data: 'remote' })
    await sleep(50)
    expect(onBroadcastChannel).toHaveBeenCalled()
    const [value] = onBroadcastChannel.mock.calls[0]
    expect(value.data).toBe('remote')
    await sender.close()
  })
})
```

- [ ] **Step 2: 运行验证**

Run: `pnpm vitest run packages/use-request-plugins`
Expected: 全部 PASS。若 simulate 投递偶发延迟导致 flaky，把对应 sleep 放宽到 200ms。

- [ ] **Step 3: Commit**

```bash
command git add packages/use-request-plugins/src/__tests__
command git commit -m "test: add use-request-plugins package tests"
```

---

### Task 6: useExternal 测试重写（移除真实网络）

**Files:**
- Modify: `packages/hooks/src/useExternal/__tests__/index.spec.ts`（整体重写）
- Delete: `packages/hooks/src/useExternal/__tests__/Test.vue`（仅被旧测试引用）

源码事实（`packages/hooks/src/useExternal/index.ts`）：创建 `<script src>` / `<link href>` 并监听 `load`/`error`；模块级 `EXTERNAL_USED_COUNT` 引用计数（**每个用例用唯一路径**避免串扰）；无法推断类型时 `console.error` 且状态保持 loading。

- [ ] **Step 1: 重写 spec 文件为以下内容**

```ts
import { nextTick } from 'vue'
import useExternal from '..'
import renderHook from 'test-utils/renderHook'

const fire = (selector: string, type: 'load' | 'error') => {
  document.querySelector(selector)?.dispatchEvent(new Event(type))
}

describe('useExternal', () => {
  it('loads js: loading -> ready on load event', () => {
    const [status] = renderHook(() => useExternal('/mock-a.js'))
    expect(status.value).toBe('loading')
    const script = document.querySelector('script[src="/mock-a.js"]')!
    expect(script).toBeTruthy()
    expect(script.getAttribute('data-status')).toBe('loading')
    fire('script[src="/mock-a.js"]', 'load')
    expect(status.value).toBe('ready')
    expect(script.getAttribute('data-status')).toBe('ready')
  })

  it('sets error status on error event', () => {
    const [status] = renderHook(() => useExternal('/mock-err.js'))
    fire('script[src="/mock-err.js"]', 'error')
    expect(status.value).toBe('error')
  })

  it('loads css link and becomes ready', () => {
    const [status] = renderHook(() => useExternal('/mock.css'))
    expect(document.querySelector('link[href="/mock.css"]')).toBeTruthy()
    fire('link[href="/mock.css"]', 'load')
    expect(status.value).toBe('ready')
  })

  it('is unset without path', () => {
    const [status] = renderHook(() => useExternal())
    expect(status.value).toBe('unset')
  })

  it('warns when type cannot be inferred', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderHook(() => useExternal('/no-extension'))
    expect(errSpy).toHaveBeenCalled()
    errSpy.mockRestore()
  })

  it('supports explicit type option', () => {
    renderHook(() => useExternal('/styles-noext', { type: 'css' }))
    expect(document.querySelector('link[href="/styles-noext"]')).toBeTruthy()
  })

  it('reuses element for same path and removes it after last unmount', async () => {
    const [, app1] = renderHook(() => useExternal('/mock-shared.js'))
    const [, app2] = renderHook(() => useExternal('/mock-shared.js'))
    expect(document.querySelectorAll('script[src="/mock-shared.js"]').length).toBe(1)
    app1.unmount()
    await nextTick()
    expect(document.querySelector('script[src="/mock-shared.js"]')).toBeTruthy()
    app2.unmount()
    await nextTick()
    expect(document.querySelector('script[src="/mock-shared.js"]')).toBeNull()
  })
})
```

- [ ] **Step 2: 删除 Test.vue 并验证**

```bash
command git rm packages/hooks/src/useExternal/__tests__/Test.vue
```

Run: `pnpm vitest run packages/hooks/src/useExternal`
Expected: 全部 PASS，且测试输出无任何网络请求/超时告警。

- [ ] **Step 3: Commit**

```bash
command git add packages/hooks/src/useExternal/__tests__
command git commit -m "test: rewrite useExternal tests without real network access"
```

---

### Task 7: useWebSocket 加深

**Files:**
- Modify: `packages/hooks/src/useWebSocket/__tests__/index.spec.ts`（保留可用旧用例，整体可重写）

源码事实（`packages/hooks/src/useWebSocket/index.ts`）：默认自动连接（manual=false）；`onclose`/`onerror` 触发 `reconnect()`（reconnectLimit 默认 3、interval 默认 3000ms —— 测试传小值）；`disconnect()` 把重连次数置满并 close；`sendMessage` 非 Open 时抛 `'WebSocket disconnected'`；卸载后事件回调全部短路。

- [ ] **Step 1: 写测试**

```ts
import useWebSocket, { ReadyState } from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

class MockWebSocket {
  static instances: MockWebSocket[] = []
  readyState = 0
  onopen: ((e: Event) => void) | null = null
  onclose: ((e: CloseEvent) => void) | null = null
  onmessage: ((e: MessageEvent) => void) | null = null
  onerror: ((e: Event) => void) | null = null
  sent: unknown[] = []
  constructor(public url: string, public protocols?: string | string[]) {
    MockWebSocket.instances.push(this)
  }
  send(data: unknown) {
    this.sent.push(data)
  }
  close() {
    if (this.readyState === 3) return // 幂等:connectWs 会对已关闭实例再调 close,真实 WebSocket 不会重复触发 close 事件
    this.readyState = 3
    this.onclose?.(new Event('close') as CloseEvent)
  }
  _open() {
    this.readyState = 1
    this.onopen?.(new Event('open'))
  }
  _message(data: unknown) {
    this.onmessage?.({ data } as MessageEvent)
  }
  _error() {
    this.readyState = 3
    this.onerror?.(new Event('error'))
  }
}

beforeEach(() => {
  MockWebSocket.instances = []
  vi.stubGlobal('WebSocket', MockWebSocket)
})
afterEach(() => {
  vi.unstubAllGlobals()
})

const last = () => MockWebSocket.instances[MockWebSocket.instances.length - 1]

describe('useWebSocket', () => {
  it('auto connects and tracks open/message', async () => {
    const onOpen = vi.fn()
    const onMessage = vi.fn()
    const [r] = renderHook(() => useWebSocket('ws://test', { onOpen, onMessage }))
    expect(MockWebSocket.instances.length).toBe(1)
    expect(r.readyState.value).toBe(ReadyState.Connecting)
    last()._open()
    expect(r.readyState.value).toBe(ReadyState.Open)
    expect(onOpen).toHaveBeenCalled()
    last()._message('hi')
    expect(r.latestMessage.value?.data).toBe('hi')
    expect(onMessage).toHaveBeenCalled()
  })

  it('sendMessage sends when open and throws when not', () => {
    const [r] = renderHook(() => useWebSocket('ws://test'))
    expect(() => r.sendMessage!('x')).toThrow('WebSocket disconnected')
    last()._open()
    r.sendMessage!('x')
    expect(last().sent).toContain('x')
  })

  it('manual mode connects only on connect()', () => {
    const [r] = renderHook(() => useWebSocket('ws://test', { manual: true }))
    expect(MockWebSocket.instances.length).toBe(0)
    r.connect!()
    expect(MockWebSocket.instances.length).toBe(1)
  })

  it('reconnects on close up to reconnectLimit', async () => {
    renderHook(() =>
      useWebSocket('ws://test', { reconnectLimit: 1, reconnectInterval: 10 }),
    )
    last()._open()
    last().close() // 服务端断开 → 调度重连
    await sleep(40)
    expect(MockWebSocket.instances.length).toBe(2)
    last().close() // 再断,reconnectTimes 已达 limit → 不再重连
    await sleep(40)
    expect(MockWebSocket.instances.length).toBe(2)
  })

  it('disconnect prevents reconnection', async () => {
    const [r] = renderHook(() =>
      useWebSocket('ws://test', { reconnectLimit: 3, reconnectInterval: 10 }),
    )
    last()._open()
    r.disconnect!()
    await sleep(40)
    expect(MockWebSocket.instances.length).toBe(1)
    expect(r.readyState.value).toBe(ReadyState.Closed)
  })

  it('onError triggers reconnect and callback', async () => {
    const onError = vi.fn()
    renderHook(() =>
      useWebSocket('ws://test', { onError, reconnectLimit: 1, reconnectInterval: 10 }),
    )
    last()._error()
    expect(onError).toHaveBeenCalled()
    await sleep(40)
    expect(MockWebSocket.instances.length).toBe(2)
  })

  it('ignores events after unmount', () => {
    const onMessage = vi.fn()
    const [r, app] = renderHook(() => useWebSocket('ws://test', { onMessage }))
    const ws = last()
    ws._open()
    app.unmount()
    ws._message('late')
    expect(onMessage).not.toHaveBeenCalled()
    expect(r.latestMessage.value).toBeUndefined()
  })
})
```

注意：旧 spec 若有真实连接或与上述重复的用例，以新文件为准整体替换；若旧文件有仍有效且不重复的断言（如 `should be defined`）可保留合并。

- [ ] **Step 2: 运行验证**

Run: `pnpm vitest run packages/hooks/src/useWebSocket`
Expected: 全部 PASS。`reconnects on close` 里第二次 close 后实例数不变是关键断言（重连上限分支）。

- [ ] **Step 3: Commit**

```bash
command git add packages/hooks/src/useWebSocket/__tests__
command git commit -m "test: deepen useWebSocket tests with mocked WebSocket and reconnect branches"
```

---

### Task 8: useRequest 缓存链路加深

**Files:**
- Create: `packages/hooks/src/useRequest/__tests__/cache-utils.spec.ts`（utils 直测）
- Create: `packages/hooks/src/useRequest/__tests__/cache-advanced.spec.ts`（集成）

注意：已存在 `cache.spec.ts`，**不要动它**，新用例放新文件。缓存是模块级全局状态：集成测试每个用例用唯一 cacheKey，且 `beforeEach` 清理。

- [ ] **Step 1: 写 cache-utils.spec.ts**

```ts
import { setCache, getCache, clearCache, getCacheAll } from '../utils/cache'
import { subscribe, trigger, otherSubscribe } from '../utils/cacheSubscribe'
import { getCachePromise, setCachePromise } from '../utils/cachePromise'
import { sleep } from 'test-utils/sleep'

describe('cache utils', () => {
  afterEach(() => clearCache())

  it('setCache/getCache roundtrip and expiry', async () => {
    setCache('cu-1', 30, { data: 1, params: [], time: Date.now() })
    expect(getCache('cu-1')?.data).toBe(1)
    await sleep(60)
    expect(getCache('cu-1')).toBeUndefined()
  })

  it('cacheTime -1 never schedules expiry; re-set replaces data', async () => {
    setCache('cu-2', -1, { data: 'a', params: [], time: Date.now() })
    setCache('cu-2', -1, { data: 'b', params: [], time: Date.now() })
    await sleep(20)
    expect(getCache('cu-2')?.data).toBe('b')
  })

  it('getCacheAll snapshots entries; clearCache supports key/array/all', () => {
    setCache('cu-a', 1000, { data: 1, params: [], time: Date.now() })
    setCache('cu-b', 1000, { data: 2, params: [], time: Date.now() })
    expect(Object.keys(getCacheAll())).toEqual(expect.arrayContaining(['cu-a', 'cu-b']))
    clearCache('cu-a')
    expect(getCache('cu-a')).toBeUndefined()
    clearCache(['cu-b'])
    expect(getCache('cu-b')).toBeUndefined()
    setCache('cu-c', 1000, { data: 3, params: [], time: Date.now() })
    clearCache()
    expect(getCache('cu-c')).toBeUndefined()
  })
})

describe('cacheSubscribe', () => {
  it('subscribe/trigger/unsubscribe, plus otherSubscribe side channel', () => {
    const l1 = vi.fn()
    const other = vi.fn()
    const un1 = subscribe('cs-k', l1)
    const unOther = otherSubscribe(other)
    trigger('cs-k', 'v')
    expect(l1).toHaveBeenCalledWith('v')
    expect(other).toHaveBeenCalledWith({ type: 'cs-k', data: 'v' })
    un1()
    unOther()
    trigger('cs-k', 'v2')
    expect(l1).toHaveBeenCalledTimes(1)
    expect(other).toHaveBeenCalledTimes(1)
  })
})

describe('cachePromise', () => {
  it('stores promise and clears it after resolution', async () => {
    const p = Promise.resolve(1)
    setCachePromise('cp-k', p)
    expect(getCachePromise('cp-k')).toBe(p)
    await p
    await sleep(0)
    expect(getCachePromise('cp-k')).toBeUndefined()
  })
})
```

（cachePromise 的 rejection 清理路径经下面集成测试的失败 service 覆盖，不直测——直测会产生故意的 unhandled rejection。）

- [ ] **Step 2: 写 cache-advanced.spec.ts**

```ts
import useRequest from '..'
import { clearCache as clearRequestCache, getCache as getRawCache } from '../utils/cache'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

const makeService = () => {
  const calls = { count: 0 }
  const service = (v: string = 'ok') =>
    new Promise<string>(res => setTimeout(() => res(`${v}-${++calls.count}`), 20))
  return { service, calls }
}

describe('useRequest cache advanced', () => {
  beforeEach(() => clearRequestCache())

  it('fresh cache (staleTime) prevents a new request on remount', async () => {
    const { service, calls } = makeService()
    const [r1, app1] = renderHook(() => useRequest(service, { cacheKey: 'adv-1', staleTime: 10000 }))
    await sleep(60)
    expect(r1.data.value).toBe('ok-1')
    app1.unmount()
    const [r2] = renderHook(() => useRequest(service, { cacheKey: 'adv-1', staleTime: 10000 }))
    expect(r2.data.value).toBe('ok-1')
    expect(r2.loading.value).toBe(false)
    await sleep(60)
    expect(calls.count).toBe(1)
  })

  it('stale cache returns data immediately but revalidates', async () => {
    const { service, calls } = makeService()
    const [, app1] = renderHook(() => useRequest(service, { cacheKey: 'adv-2' }))
    await sleep(60)
    app1.unmount()
    const [r2] = renderHook(() => useRequest(service, { cacheKey: 'adv-2' }))
    expect(r2.data.value).toBe('ok-1')
    expect(r2.loading.value).toBe(true)
    await sleep(60)
    expect(calls.count).toBe(2)
    expect(r2.data.value).toBe('ok-2')
  })

  it('concurrent mounts share one in-flight promise', async () => {
    const { service, calls } = makeService()
    const [a] = renderHook(() => useRequest(service, { cacheKey: 'adv-3' }))
    const [b] = renderHook(() => useRequest(service, { cacheKey: 'adv-3' }))
    await sleep(80)
    expect(calls.count).toBe(1)
    expect(a.data.value).toBe('ok-1')
    expect(b.data.value).toBe('ok-1')
  })

  it('mounted instances stay in sync through cache subscription', async () => {
    const { service } = makeService()
    const [a] = renderHook(() => useRequest(service, { cacheKey: 'adv-4' }))
    await sleep(60)
    const [b] = renderHook(() => useRequest(service, { cacheKey: 'adv-4', manual: true }))
    await sleep(0) // 缓存初始化经插件内 async 路径,让出一个微任务
    expect(b.data.value).toBe('ok-1')
    a.refresh()
    await sleep(60)
    expect(b.data.value).toBe('ok-2')
  })

  it('custom sync setCache/getCache replace internal cache', async () => {
    const store = new Map<string, any>()
    const { service, calls } = makeService()
    const opts = {
      cacheKey: 'adv-5',
      staleTime: 10000,
      setCache: (d: any) => store.set('adv-5', d),
      getCache: () => store.get('adv-5'),
    }
    const [, app1] = renderHook(() => useRequest(service, opts))
    await sleep(60)
    expect(store.get('adv-5')?.data).toBe('ok-1')
    app1.unmount()
    const [r2] = renderHook(() => useRequest(service, opts))
    await sleep(60)
    expect(calls.count).toBe(1)
    expect(r2.data.value).toBe('ok-1')
  })

  it('cacheKey as function derives key from params', async () => {
    const { service } = makeService()
    const [r] = renderHook(() =>
      useRequest(service, {
        cacheKey: (params?: any[]) => `adv-fn-${params?.[0] ?? 'd'}`,
        defaultParams: ['x'],
      }),
    )
    await sleep(60)
    expect(r.data.value).toBe('x-1')
    expect(getRawCache('adv-fn-x')?.data).toBe('x-1')
  })

  it('mutate writes through to cache', async () => {
    const { service } = makeService()
    const [r] = renderHook(() => useRequest(service, { cacheKey: 'adv-6' }))
    await sleep(60)
    r.mutate('mutated')
    expect(getRawCache('adv-6')?.data).toBe('mutated')
  })

  it('failed request clears shared cachePromise (rejection path)', async () => {
    let calls = 0
    const failing = () => {
      calls++
      return Promise.reject(new Error('cache-fail'))
    }
    const [r] = renderHook(() => useRequest(failing, { cacheKey: 'adv-7' }))
    await sleep(30)
    expect(r.error.value).toBeInstanceOf(Error)
    r.refresh() // cachePromise 已清理 → 重新发起
    await sleep(30)
    expect(calls).toBe(2)
  })
})
```

注意：若个别断言与实际行为不符（如 options 类型报错），先核对 `useRequest` 的 typed overloads 与 `useCachePlugin.ts` 逻辑；类型不匹配可用 `as any` 解决，**行为不匹配必须上报而非改断言**。

- [ ] **Step 3: 运行验证**

Run: `pnpm vitest run packages/hooks/src/useRequest/__tests__/cache-utils.spec.ts packages/hooks/src/useRequest/__tests__/cache-advanced.spec.ts`
Expected: 全部 PASS。再跑 `pnpm vitest run packages/hooks/src/useRequest` 确认与现有 cache.spec.ts 无串扰。

- [ ] **Step 4: Commit**

```bash
command git add packages/hooks/src/useRequest/__tests__
command git commit -m "test: deepen useRequest cache chain coverage"
```

---

### Task 9: useRequest 订阅模块与 polling/retry/autoRun 分支

**Files:**
- Create: `packages/hooks/src/useRequest/__tests__/subscriptions.spec.ts`
- Modify: `packages/hooks/src/useRequest/__tests__/polling.spec.ts`（追加用例）
- Modify: `packages/hooks/src/useRequest/__tests__/retry.spec.ts`（追加用例）
- Modify: `packages/hooks/src/useRequest/__tests__/refreshDeps.spec.ts`（追加 refreshDepsAction 用例，若已有等价用例则跳过）

- [ ] **Step 1: 写 subscriptions.spec.ts**

```ts
import useRequest from '..'
import limit from '../utils/limit'
import subscribeFocus from '../utils/subscribeFocus'
import subscribeReVisible from '../utils/subscribeReVisible'
import isOnline from '../utils/isOnline'
import isDocumentVisible from '../utils/isDocumentVisible'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

const setVisibility = (v: 'visible' | 'hidden') => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => v })
}
const restoreVisibility = () => {
  delete (document as any).visibilityState
}
afterEach(restoreVisibility)

describe('limit', () => {
  it('blocks calls within timespan and recovers after', async () => {
    const fn = vi.fn()
    const limited = limit(fn, 30)
    limited(1)
    limited(2)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)
    await sleep(60)
    limited(3)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('isOnline / isDocumentVisible', () => {
  it('reflects document/navigator state', () => {
    expect(isOnline()).toBe(true)
    expect(isDocumentVisible()).toBe(true)
    setVisibility('hidden')
    expect(isDocumentVisible()).toBe(false)
  })
})

describe('subscribeFocus', () => {
  it('notifies on window focus and stops after unsubscribe', () => {
    const l = vi.fn()
    const un = subscribeFocus(l)
    window.dispatchEvent(new Event('focus'))
    expect(l).toHaveBeenCalledTimes(1)
    un()
    window.dispatchEvent(new Event('focus'))
    expect(l).toHaveBeenCalledTimes(1)
  })

  it('skips notification while document is hidden', () => {
    const l = vi.fn()
    const un = subscribeFocus(l)
    setVisibility('hidden')
    window.dispatchEvent(new Event('focus'))
    expect(l).not.toHaveBeenCalled()
    un()
  })
})

describe('subscribeReVisible', () => {
  it('notifies on visibilitychange when visible', () => {
    const l = vi.fn()
    const un = subscribeReVisible(l)
    window.dispatchEvent(new Event('visibilitychange'))
    expect(l).toHaveBeenCalledTimes(1)
    un()
  })
})

describe('refreshOnWindowFocus option', () => {
  it('refreshes the request when window regains focus', async () => {
    let count = 0
    const service = () => new Promise<number>(res => setTimeout(() => res(++count), 10))
    renderHook(() => useRequest(service, { refreshOnWindowFocus: true, focusTimespan: 1 }))
    await sleep(40)
    expect(count).toBe(1)
    window.dispatchEvent(new Event('focus'))
    await sleep(40)
    expect(count).toBe(2)
  })
})
```

- [ ] **Step 2: polling.spec.ts 追加（文件末尾新增 describe）**

```ts
describe('polling extra branches', () => {
  const setVisibility = (v: 'visible' | 'hidden') => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => v })
  }
  afterEach(() => {
    delete (document as any).visibilityState
  })

  it('suspends polling while hidden (pollingWhenHidden=false) and resumes on revisible', async () => {
    let count = 0
    const service = () => new Promise<number>(res => setTimeout(() => res(++count), 5))
    renderHook(() => useRequest(service, { pollingInterval: 20, pollingWhenHidden: false }))
    await sleep(50)
    setVisibility('hidden')
    await sleep(100)
    const frozen = count
    setVisibility('visible')
    window.dispatchEvent(new Event('visibilitychange'))
    await sleep(80)
    expect(count).toBeGreaterThan(frozen)
  })

  it('stops polling after pollingErrorRetryCount consecutive errors', async () => {
    let calls = 0
    const service = () => {
      calls++
      return Promise.reject(new Error('poll-err'))
    }
    renderHook(() => useRequest(service, { pollingInterval: 10, pollingErrorRetryCount: 2 }))
    await sleep(200)
    expect(calls).toBe(3) // 首次 + 2 次错误重试后停止
  })
})
```

（import 按该文件现有头部为准，缺啥补啥；不要改动已有用例。）

- [ ] **Step 3: retry.spec.ts 追加**

```ts
describe('retry extra branches', () => {
  it('honors custom retryInterval and stops after retryCount', async () => {
    let calls = 0
    const service = () => {
      calls++
      return Promise.reject(new Error('always'))
    }
    renderHook(() => useRequest(service, { retryCount: 2, retryInterval: 10 }))
    await sleep(150)
    expect(calls).toBe(3) // 1 + 2 retries
  })

  it('cancel() clears a pending retry timer', async () => {
    let calls = 0
    const service = () => {
      calls++
      return Promise.reject(new Error('always'))
    }
    const [r] = renderHook(() => useRequest(service, { retryCount: 3, retryInterval: 30 }))
    await sleep(10)
    r.cancel()
    await sleep(120)
    expect(calls).toBe(1)
  })
})
```

- [ ] **Step 4: refreshDeps.spec.ts 追加（先确认无等价用例）**

```ts
it('calls refreshDepsAction instead of refresh when provided', async () => {
  const dep = ref(0)
  const refreshDepsAction = vi.fn()
  let calls = 0
  const service = () => Promise.resolve(++calls)
  renderHook(() => useRequest(service, { refreshDeps: [dep], refreshDepsAction }))
  await sleep(20)
  expect(calls).toBe(1)
  dep.value++
  await sleep(20)
  expect(refreshDepsAction).toHaveBeenCalledTimes(1)
  expect(calls).toBe(1) // 没有触发默认 refresh
})
```

- [ ] **Step 5: 运行验证**

Run: `pnpm vitest run packages/hooks/src/useRequest`
Expected: 全部 PASS（含既有用例零回归）。

- [ ] **Step 6: Commit**

```bash
command git add packages/hooks/src/useRequest/__tests__
command git commit -m "test: cover useRequest subscriptions, polling and retry branches"
```

---

### Task 10: component-use `<UseRequest>` 组件测试

**Files:**
- Create: `packages/hooks/src/useRequest/__tests__/component-use.spec.ts`

源码事实（`packages/hooks/src/useRequest/component-use/UseRequest.ts`）：默认导出工厂 `createUseRequestComponent()`，组件 props：`service`(必填)/`manual`/`ready`/`refreshDeps`/`plugins`/`formatResult`；slots：`default`(收到 useRequest 完整返回对象，字段是 ref)/`loading`/`error`；`refreshDeps` prop 变化经 isEqual 比较后触发 `refresh()`。

- [ ] **Step 1: 写测试**

```ts
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import createUseRequestComponent from '../component-use/UseRequest'
import { sleep } from 'test-utils/sleep'

const UseRequest = createUseRequestComponent()

describe('<UseRequest> component', () => {
  it('renders loading slot then default slot with data', async () => {
    const service = () => new Promise<string>(res => setTimeout(() => res('hello'), 20))
    const wrapper = mount(UseRequest as any, {
      props: { service },
      slots: {
        loading: () => h('span', { class: 'loading' }, 'loading...'),
        default: (scope: any) => h('span', { class: 'data' }, String(scope.data?.value ?? '')),
      },
    })
    expect(wrapper.find('.loading').exists()).toBe(true)
    await sleep(60)
    await nextTick()
    expect(wrapper.find('.data').text()).toBe('hello')
  })

  it('renders error slot on failure', async () => {
    const service = () => Promise.reject(new Error('boom'))
    const wrapper = mount(UseRequest as any, {
      props: { service },
      slots: {
        error: (scope: any) => h('span', { class: 'err' }, scope.error?.message ?? ''),
        default: () => h('span', 'ok'),
      },
    })
    await sleep(30)
    await nextTick()
    expect(wrapper.find('.err').text()).toBe('boom')
  })

  it('manual prop prevents auto run', async () => {
    let calls = 0
    const service = () => Promise.resolve(++calls)
    mount(UseRequest as any, {
      props: { service, manual: true },
      slots: { default: () => h('i') },
    })
    await sleep(30)
    expect(calls).toBe(0)
  })

  it('refreshDeps prop change triggers refresh', async () => {
    let calls = 0
    const service = () => Promise.resolve(`v${++calls}`)
    const wrapper = mount(UseRequest as any, {
      props: { service, refreshDeps: [0] },
      slots: { default: (s: any) => h('i', String(s.data?.value ?? '')) },
    })
    await sleep(30)
    expect(calls).toBe(1)
    await wrapper.setProps({ refreshDeps: [1] })
    await sleep(30)
    expect(calls).toBe(2)
  })

  it('applies formatResult', async () => {
    const service = () => Promise.resolve(2)
    const wrapper = mount(UseRequest as any, {
      props: { service, formatResult: (n: number) => n * 10 },
      slots: { default: (s: any) => h('i', String(s.data?.value ?? '')) },
    })
    await sleep(30)
    await nextTick()
    expect(wrapper.find('i').text()).toBe('20')
  })
})
```

- [ ] **Step 2: 运行验证**

Run: `pnpm vitest run packages/hooks/src/useRequest/__tests__/component-use.spec.ts`
Expected: 全部 PASS。

- [ ] **Step 3: Commit**

```bash
command git add packages/hooks/src/useRequest/__tests__/component-use.spec.ts
command git commit -m "test: add UseRequest renderless component tests"
```

---

### Task 11: 浅测试加深批 A（useFullscreen / useDrop / useDrag / useMouse）

**Files:**
- Modify: `packages/hooks/src/useFullscreen/__tests__/index.spec.ts`
- Modify: `packages/hooks/src/useDrop/__tests__/index.spec.ts`
- Modify: `packages/hooks/src/useDrag/__tests__/index.spec.ts`
- Modify: `packages/hooks/src/useMouse/__tests__/index.spec.ts`

均为**追加/替换浅用例**：先读现有 spec，保留有效断言，追加下述用例（重复则合并）。

- [ ] **Step 1: useFullscreen —— mock screenfull 模块**

```ts
const { mockScreenfull, fsListeners } = vi.hoisted(() => {
  const fsListeners: Array<() => void> = []
  const mockScreenfull: any = {
    isEnabled: true,
    element: undefined,
    // 真实 screenfull 的 change 事件是异步的;源码先 request() 后 on('change'),
    // 同步派发会在监听器注册前丢失事件,必须异步派发
    request: vi.fn((el: Element) => {
      mockScreenfull.element = el
      setTimeout(() => mockScreenfull._fire(), 0)
    }),
    exit: vi.fn(() => {
      mockScreenfull.element = undefined
      setTimeout(() => mockScreenfull._fire(), 0)
    }),
    _fire: () => fsListeners.slice().forEach(f => f()),
    on: vi.fn((_ev: string, fn: () => void) => fsListeners.push(fn)),
    off: vi.fn((_ev: string, fn: () => void) => {
      const i = fsListeners.indexOf(fn)
      if (i > -1) fsListeners.splice(i, 1)
    }),
  }
  return { mockScreenfull, fsListeners }
})
vi.mock('screenfull', () => ({ default: mockScreenfull }))

import useFullscreen from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

beforeEach(() => {
  mockScreenfull.element = undefined
  fsListeners.length = 0
  vi.clearAllMocks()
})

describe('useFullscreen', () => {
  it('enter/exit/toggle with callbacks and state', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const onEnter = vi.fn()
    const onExit = vi.fn()
    const [[state, actions]] = renderHook(() => useFullscreen(target, { onEnter, onExit }))
    expect(state.value).toBe(false)
    actions.enterFullscreen()
    expect(mockScreenfull.request).toHaveBeenCalledWith(target)
    await sleep(10)
    expect(state.value).toBe(true)
    expect(onEnter).toHaveBeenCalledTimes(1)
    actions.exitFullscreen()
    await sleep(10)
    expect(state.value).toBe(false)
    expect(onExit).toHaveBeenCalledTimes(1)
    actions.toggleFullscreen()
    await sleep(10)
    expect(state.value).toBe(true)
    expect(actions.isEnabled).toBe(true)
  })
})
```

- [ ] **Step 2: useDrop —— 合成事件**

```ts
import useDrop from '..'
import renderHook from 'test-utils/renderHook'

const makeDropEvent = (data: Record<string, string>, files: File[] = []) => {
  const event = new Event('drop', { bubbles: true, cancelable: true }) as any
  event.dataTransfer = {
    getData: (k: string) => data[k] ?? '',
    files,
    items: [],
  }
  return event
}

describe('useDrop', () => {
  const setup = (options: any) => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    renderHook(() => useDrop(target, options))
    return target
  }

  it('dispatches onDom for custom data (JSON parsed)', () => {
    const onDom = vi.fn()
    const target = setup({ onDom })
    target.dispatchEvent(makeDropEvent({ custom: JSON.stringify({ x: 1 }) }))
    expect(onDom).toHaveBeenCalledWith({ x: 1 }, expect.anything())
  })

  it('dispatches onUri for uri-list data', () => {
    const onUri = vi.fn()
    const target = setup({ onUri })
    target.dispatchEvent(makeDropEvent({ 'text/uri-list': 'https://x.dev' }))
    expect(onUri).toHaveBeenCalledWith('https://x.dev', expect.anything())
  })

  it('dispatches onFiles for dropped files', () => {
    const onFiles = vi.fn()
    const target = setup({ onFiles })
    const file = new File(['a'], 'a.txt')
    target.dispatchEvent(makeDropEvent({}, [file]))
    expect(onFiles).toHaveBeenCalled()
    expect(onFiles.mock.calls[0][0]).toHaveLength(1)
  })

  it('dispatches onText for pasted text', () => {
    const onText = vi.fn()
    const target = setup({ onText })
    const event = new Event('paste', { bubbles: true }) as any
    event.clipboardData = {
      getData: () => '',
      files: [],
      items: [{ getAsString: (cb: (s: string) => void) => cb('hello') }],
    }
    target.dispatchEvent(event)
    expect(onText).toHaveBeenCalledWith('hello', expect.anything())
  })

  it('fires dragenter/dragover/dragleave/onDrop callbacks', () => {
    const onDragEnter = vi.fn()
    const onDragOver = vi.fn()
    const onDragLeave = vi.fn()
    const onDrop = vi.fn()
    const target = setup({ onDragEnter, onDragOver, onDragLeave, onDrop })
    target.dispatchEvent(new Event('dragenter', { bubbles: true, cancelable: true }))
    expect(onDragEnter).toHaveBeenCalled()
    target.dispatchEvent(new Event('dragover', { bubbles: true, cancelable: true }))
    expect(onDragOver).toHaveBeenCalled()
    target.dispatchEvent(new Event('dragleave', { bubbles: true }))
    expect(onDragLeave).toHaveBeenCalled() // dragleave 的 target 即 dragenter 记录的 target
    target.dispatchEvent(makeDropEvent({}))
    expect(onDrop).toHaveBeenCalled()
  })
})
```

- [ ] **Step 3: useDrag —— dragstart/dragend 与 draggable 属性**

```ts
import useDrag from '..'
import renderHook from 'test-utils/renderHook'

describe('useDrag', () => {
  it('sets draggable attribute and writes data on dragstart', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const onDragStart = vi.fn()
    const onDragEnd = vi.fn()
    renderHook(() => useDrag({ id: 7 }, target, { onDragStart, onDragEnd }))
    expect(target.getAttribute('draggable')).toBe('true')

    const setData = vi.fn()
    const start = new Event('dragstart', { bubbles: true }) as any
    start.dataTransfer = { setData }
    target.dispatchEvent(start)
    expect(onDragStart).toHaveBeenCalled()
    expect(setData).toHaveBeenCalledWith('custom', JSON.stringify({ id: 7 }))

    target.dispatchEvent(new Event('dragend', { bubbles: true }))
    expect(onDragEnd).toHaveBeenCalled()
  })

  it('respects draggable: false option', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    renderHook(() => useDrag('d', target, { draggable: false }))
    expect(target.getAttribute('draggable')).toBe('false')
  })
})
```

- [ ] **Step 4: useMouse —— mousemove 坐标族**

```ts
import useMouse from '..'
import renderHook from 'test-utils/renderHook'

describe('useMouse', () => {
  it('tracks cursor coordinates on mousemove', () => {
    const [state] = renderHook(() => useMouse())
    window.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 10, clientY: 20, screenX: 30, screenY: 40 }),
    )
    expect(state.value.clientX).toBe(10)
    expect(state.value.clientY).toBe(20)
    expect(state.value.screenX).toBe(30)
    expect(state.value.screenY).toBe(40)
    expect(state.value.pageX).toBe(10) // pageX 回退 clientX + scrollOffset(0)
  })

  it('computes element-relative coordinates with target', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const [state] = renderHook(() => useMouse(target))
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 15, clientY: 25 }))
    // happy-dom 的 getBoundingClientRect 全为 0,断言为有限数值即可
    expect(Number.isFinite(state.value.elementX)).toBe(true)
    expect(Number.isFinite(state.value.elementY)).toBe(true)
    expect(Number.isFinite(state.value.elementW)).toBe(true)
  })
})
```

- [ ] **Step 5: 运行验证 + Commit**

Run: `pnpm vitest run packages/hooks/src/useFullscreen packages/hooks/src/useDrop packages/hooks/src/useDrag packages/hooks/src/useMouse`
Expected: 全部 PASS。

```bash
command git add packages/hooks/src/useFullscreen/__tests__ packages/hooks/src/useDrop/__tests__ packages/hooks/src/useDrag/__tests__ packages/hooks/src/useMouse/__tests__
command git commit -m "test: deepen useFullscreen, useDrop, useDrag and useMouse specs"
```

---

### Task 12: 浅测试加深批 B（useSize / useNetwork + 数据驱动长尾）

**Files:**
- Modify: `packages/hooks/src/useSize/__tests__/index.spec.ts`
- Modify: `packages/hooks/src/useNetwork/__tests__/index.spec.ts`
- Modify: 按覆盖率表选定的长尾 spec（见 Step 3）

- [ ] **Step 1: useSize —— ResizeObserver mock + clientWidth 注入**

```ts
import { nextTick } from 'vue'
import useSize from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

let roCallback: ((entries: unknown[]) => void) | undefined

class MockResizeObserver {
  constructor(cb: (entries: unknown[]) => void) {
    roCallback = cb
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
})
afterEach(() => {
  vi.unstubAllGlobals()
  roCallback = undefined
})

const setClientSize = (el: Element, w: number, h: number) => {
  Object.defineProperty(el, 'clientWidth', { configurable: true, value: w })
  Object.defineProperty(el, 'clientHeight', { configurable: true, value: h })
}

describe('useSize', () => {
  it('reads initial size on mount', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    setClientSize(el, 100, 50)
    const [size] = renderHook(() => useSize(el))
    await nextTick()
    await nextTick()
    expect(size.width.value).toBe(100)
    expect(size.height.value).toBe(50)
  })

  it('updates size when ResizeObserver fires', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    setClientSize(el, 100, 50)
    const [size] = renderHook(() => useSize(el))
    await nextTick()
    await nextTick()
    setClientSize(el, 200, 80)
    roCallback?.([])
    await sleep(30) // 等 requestAnimationFrame 调度
    expect(size.width.value).toBe(200)
    expect(size.height.value).toBe(80)
  })

  it('updates size on window resize event', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    setClientSize(el, 100, 50)
    const [size] = renderHook(() => useSize(el))
    await nextTick()
    await nextTick()
    setClientSize(el, 300, 90)
    window.dispatchEvent(new Event('resize'))
    await sleep(30)
    expect(size.width.value).toBe(300)
  })
})
```

- [ ] **Step 2: useNetwork —— online/offline 与 connection**

```ts
import useNetwork from '..'
import renderHook from 'test-utils/renderHook'

describe('useNetwork', () => {
  it('flips online flag with offline/online events and stamps since', () => {
    const [state] = renderHook(() => useNetwork())
    expect(state.value.online).toBe(true)
    window.dispatchEvent(new Event('offline'))
    expect(state.value.online).toBe(false)
    expect(state.value.since).toBeInstanceOf(Date)
    window.dispatchEvent(new Event('online'))
    expect(state.value.online).toBe(true)
  })

  it('reads connection properties when navigator.connection exists', () => {
    const listeners: Record<string, () => void> = {}
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: {
        rtt: 50,
        downlink: 10,
        effectiveType: '4g',
        saveData: false,
        addEventListener: (t: string, f: () => void) => {
          listeners[t] = f
        },
        removeEventListener: () => {},
      },
    })
    const [state] = renderHook(() => useNetwork())
    expect(state.value.rtt).toBe(50)
    expect(state.value.effectiveType).toBe('4g')
    listeners['change']?.()
    expect(state.value.downlink).toBe(10)
    delete (navigator as any).connection
  })
})
```

（先读 `useNetwork/index.ts` 60 行之后的部分确认 change 事件挂在 connection 上的具体方式，若实现是 `window.addEventListener('change')` 之类的差异，按源码调整触发方式。）

- [ ] **Step 3: 数据驱动长尾补漏**

Run: `pnpm test:coverage`，查看 per-file 表格。对**行覆盖仍 <80% 的 packages/hooks 目录**（预期还剩 useScroll/useInterval/useTimeout/useEventEmitter/useInfiniteScroll/useKeyPress 等小缺口），各追加 1–2 个针对未覆盖行号的分支用例。示例模式（useTimeout 的清理分支）：

```ts
it('clears timer when component unmounts before firing', async () => {
  const fn = vi.fn()
  const [, app] = renderHook(() => useTimeout(fn, 30))
  app.unmount()
  await sleep(60)
  expect(fn).not.toHaveBeenCalled()
})
```

**退出条件（可验证）**：`pnpm test:coverage` 总 Lines ≥ **82%**（为 80 门槛留 buffer）。未达标继续按表补，达标即停（YAGNI，不要为追求数字写无意义断言）。

- [ ] **Step 4: 运行验证 + Commit**

Run: `pnpm test:coverage`
Expected: 全绿；总 Lines ≥ 82%。

```bash
command git add packages/hooks/src
command git commit -m "test: deepen useSize, useNetwork and long-tail hook specs"
```

---

### Task 13: 启用门槛 + 切换 CI + 终验

**Files:**
- Modify: `vitest.config.ts`（coverage 块加 thresholds）
- Modify: `.github/workflows/ci.yml`（Unit Test 步骤）
- Modify: `CLAUDE.md`（命令清单补一行）

- [ ] **Step 1: vitest.config.ts 的 coverage 块加入**

```ts
      thresholds: { lines: 80 },
```

（放在 `reporter` 之前或之后均可，保持对象字面量风格一致。）

- [ ] **Step 2: ci.yml 替换 Unit Test 步骤**

```yaml
      - name: Unit Test
        run: |
          pnpm run test:coverage
```

- [ ] **Step 3: CLAUDE.md 的 Commands 代码块中、`pnpm vitest run` 行之后补**

```bash
pnpm test:coverage        # single run with coverage; CI enforces >=80% lines on packages/hooks
```

- [ ] **Step 4: 终验**

Run: `pnpm test:coverage`
Expected: 全绿，Lines ≥ 82%，无 threshold 报错。

Run: `pnpm build`
Expected: 成功（确认附属包新增 `__tests__` 没有被各包构建吸入；若某包 vue-tsc 因测试文件报错，在**该包 tsconfig** 的 exclude 中加 `"src/__tests__"`，这是配置修复，允许）。

- [ ] **Step 5: Commit**

```bash
command git add vitest.config.ts .github/workflows/ci.yml CLAUDE.md
command git commit -m "test: enforce 80% line coverage threshold in CI"
```

---

## 验收清单（最终检查，对应 spec）

1. `pnpm test:coverage` 全绿且 packages/hooks Lines ≥ 80%（实际 ≥82%）
2. 5 个附属包各有 `src/__tests__/index.spec.ts`（use-worker 另有 lib.spec.ts）且在根运行中执行
3. useExternal 测试无真实网络访问（无 CDN URL）
4. CI Unit Test 步骤跑 `pnpm run test:coverage`，thresholds 生效
5. 现有 216 个测试零回归；`packages/*/src` 运行时源码零改动（`git diff master --stat` 验证只有 `__tests__`/配置/文档）
6. 发现类记录（useRequestResolver 未导出等）汇总到最终报告
