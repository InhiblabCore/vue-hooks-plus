# Issues Analysis

> Scope: GitHub issues for `InhiblabCore/vue-hooks-plus`, excluding pull requests and duplicated build/release automation entries. Open issues were reviewed individually; closed issues were deduplicated by topic and mapped to the same maintenance themes for regression coverage.

## Current Open Issues

| Issue | Status | Theme | Reasonable | Resolved | This Round | Priority | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#291](https://github.com/InhiblabCore/vue-hooks-plus/issues/291) | Open | Build tooling / tsdown | Yes | In progress | Yes | P0 | Migrated package build scripts to `tsdown` while preserving existing package entry paths. |
| [#290](https://github.com/InhiblabCore/vue-hooks-plus/issues/290) | Open | Dependency size / lodash-es replacement | Yes | Completed locally | Yes | P1 | Replaced runtime `lodash-es` imports with [`es-toolkit/compat`](https://es-toolkit.dev/zh_hans/reference/compat/function/debounce.html); kept compatibility APIs for debounce/throttle semantics. |
| [#289](https://github.com/InhiblabCore/vue-hooks-plus/issues/289) | Open | `useRequest` robustness | Yes | In progress | Yes | P0 | Implemented dynamic `cacheKey` and `initialData` ref/reactive support; linked with #182 async cache design. |

## Key Historical Issues

| Issue | Status | Theme | Reasonable | Resolved | This Round | Priority | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#182](https://github.com/InhiblabCore/vue-hooks-plus/issues/182) | Closed | `useRequest` async custom cache | Yes | Historically closed, gap remained | Yes | P0 | Requested async `getCache` for custom cache backends. This is now treated as the cache-layer design anchor. |

## Deduplicated Closed-Issue Clusters

| Cluster | Typical Issues | Status | This Round Action | Residual Risk |
| --- | --- | --- | --- | --- |
| `useRequest` cache, SWR, polling, refreshDeps, retry, debounce/throttle | #182 plus related historical bug reports | Recurrent | Added async-aware cache tests, dynamic key tests, stale cache fallback tests, and kept existing polling/refreshDeps/retry tests green. | Cache plugins are performance-sensitive; keep listener/promise dedupe tests mandatory before release. |
| `useRequest` typing and `initialData` | Related to #289 | Recurrent | Expanded `initialData` type to accept refs and preserved `shallowRef` identity. | Typecheck must run against both `vue-hooks-plus` and standalone `@vue-hooks-plus/use-request`. |
| Build, tree-shaking, package entries | #291, package publishing reports | Active | Added `tsdown` configs for library packages and resolver package. | Need final build smoke after lockfile sync. |
| Dependency footprint | #290 and lodash-related bundle concern | Active | Swapped to `es-toolkit/compat`; removed direct lodash package references from source packages. | Keep smoke imports and bundle output checks before release. |
| SSR / Nuxt / DOM guard | Historical SSR usage reports | Mostly closed | Added/expanded tests around DOM listeners, media, storage, observer, fullscreen, and browser-only APIs. | More Nuxt-specific smoke tests would require an integration fixture. |
| Storage and URL state | Historical storage/url query reports | Mostly closed | Added local/session storage behavior tests; `use-url-state` remains a separate package route. | `useUrlState` is not exported from `packages/hooks/src/index.ts`; keep standalone package docs/types in sync. |
| Auto-import resolver | Resolver package issues | Mostly closed | Migrated resolver build to `tsdown`. | Run resolver package build/type smoke after dependency sync. |
| Docs and examples | Historical docs/API mismatches | Recurrent | Updated cache docs for dynamic cache keys and async cache APIs; updated debounce/throttle docs to official `es-toolkit/compat` references. | Full docs build is still required before release. |

## Findings

- #289 is reasonable and should be accepted. It points at real limitations: static cache keys cannot safely represent parameterized requests, and `initialData` being limited to plain values is inconsistent with Vue 3 ref/reactive usage.
- #182 is a duplicate/ancestor of the cache part of #289. Closing it historically did not remove the functional gap because a custom `getCache` can be backed by IndexedDB/localforage and therefore must be promise-aware.
- #290 is reasonable if implemented through `es-toolkit/compat`, not by swapping to non-compat helpers blindly. The compat layer keeps lodash-like debounce/throttle/merge/isEqual behavior closest to the old implementation.
- #291 is reasonable. Build config had duplicated Vite/tsup paths and old library-build plugins; `tsdown` gives a single library pipeline while Vite can remain for docs/dev/test.

## Sources

- [Issue #289](https://github.com/InhiblabCore/vue-hooks-plus/issues/289)
- [Issue #182](https://github.com/InhiblabCore/vue-hooks-plus/issues/182)
- [Issue #291](https://github.com/InhiblabCore/vue-hooks-plus/issues/291)
- [Issue #290](https://github.com/InhiblabCore/vue-hooks-plus/issues/290)
- [useRequest cache docs](https://inhiblabcore.github.io/vue-hooks-plus/zh/hooks/useRequest/cache)
