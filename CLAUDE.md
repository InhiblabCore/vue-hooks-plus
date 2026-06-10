# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

VueHooks Plus — a Vue 3 hooks library. pnpm workspace monorepo (requires Node >= 22.18.0, pnpm 9). The main published package is `packages/hooks` (npm: `vue-hooks-plus`).

## Commands

```bash
pnpm install              # install (must use pnpm)
pnpm test                 # vitest in watch mode, from repo root
pnpm vitest run           # single test run (what CI does)
pnpm test:coverage        # single run with coverage; CI enforces >=80% lines on packages/hooks
pnpm vitest run packages/hooks/src/useBoolean   # run one hook's tests
pnpm build                # bootstrap (regenerate meta-data.json) + build all packages
pnpm docs:dev             # vitepress docs dev server
pnpm docs:build           # full build + docs build
```

There is no root lint script; linting runs via lint-staged on pre-commit (`eslint --cache --fix`). Commit messages follow conventional commits (commitlint enforced). PR titles use `feat: ...` / `fix: ... (fix #xxxx)`.

## Testing setup

Tests run from the **root** `vitest.config.ts` (environment: happy-dom, `globals: true` so `describe`/`it`/`expect` need no imports). Aliases defined there:

- `vue-hooks-plus` → `packages/hooks/src/index.ts`
- `@` → `packages/hooks/src`
- `test-utils` → `packages/hooks/test-utils` (provides `renderHook`, `sleep`)

## Architecture

### Monorepo layout

- `packages/hooks` — the core library, one folder per hook under `src/useXxx/`, each with an `index.ts` and `__tests__/`. All hooks are exported from `src/index.ts`.
- `packages/use-request` — standalone `@vue-hooks-plus/use-request` package. Its `src/` is a **generated copy**: `pnpm sync` (in that package) copies `packages/hooks/src/useRequest` into it, excluding docs and tests. **Never edit `packages/use-request/src` directly — change `packages/hooks/src/useRequest` instead.**
- `packages/resolvers`, `use-immer`, `use-url-state`, `use-worker`, `use-request-plugins` — small add-on packages.
- `packages/vitepress/*` — docs tooling (demo-block component etc.).
- `docs/` — vitepress site; `docs/en` and `docs/zh` hold per-hook markdown, `docs/demo` holds runnable demo components embedded in docs.
- `scripts/bootstrap.ts` — generates `packages/hooks/meta-data.json` from the list of hook folders (runs as part of `pnpm build`).

### useRequest plugin architecture

`useRequest` is the centerpiece (`packages/hooks/src/useRequest/`). It is a thin orchestrator:

- `useRequest.ts` assembles built-in plugins (debounce, throttle, loadingDelay, polling, refreshOnWindowFocus, autoRun, cache, retry, plus devtools in dev) and delegates to `useRequestImplement.ts`.
- `Fetch.ts` is the request state machine; plugins hook into its lifecycle via `onBefore` / `onRequest` / `onSuccess` / `onError` / `onFinally` / `onCancel` / `onMutate` (see `UseRequestPluginReturn` in `types.ts`).
- New behavior is added as a plugin in `src/useRequest/plugins/`, not by modifying `Fetch.ts`. Users can also pass custom plugins as the third argument of `useRequest`.
- `useRequest.ts` has several typed overloads keyed on whether `formatResult` / `initialData` are present — keep those in sync when changing option types.

### Adding a new hook

1. Create `packages/hooks/src/useXxx/` with `index.ts` and `__tests__/index.spec.ts`.
2. Export it from `packages/hooks/src/index.ts`.
3. Add docs at `docs/en/hooks/...` and `docs/zh/hooks/...`, demos under `docs/demo/`, and register the route in `docs/.vitepress/config`.
