# VueHooks Plus 2.5.0-alpha.0 Release Notes

> **Important: Minimum Node.js Version**
>
> Repository development, package builds, CI, and documentation builds require **Node.js >= 22.18.0**. This requirement comes from the current `tsdown` build toolchain. Browser usage of the published hooks still targets Vue 3 applications and does not add a Node.js runtime requirement.

This alpha release is a full maintenance pass across stability, build compatibility, types, documentation examples, tests, and historical issue analysis.

## Highlights

- Reworked the `useRequest` cache layer with async `getCache` / `setCache`, dynamic `cacheKey`, cache fallback behavior, and subscription cleanup coverage.
- Migrated the build pipeline to `tsdown` while preserving existing CJS/ESM/IIFE filenames, deep imports, and type entry compatibility.
- Raised the development and CI build environment to Node.js 22.18.0+ instead of running the modern build toolchain on unsupported older Node versions.
- Upgraded `happy-dom` to the patched security version and adjusted MutationObserver tests for the newer asynchronous callback timing.
- Expanded hook examples, core behavior tests, documentation notes, and historical issue analysis to make the release easier to verify.

## Migration Notes

- Before running `pnpm build` or `pnpm docs:build`, make sure the local Node.js version is at least `22.18.0`.
- Application-side browser usage of `vue-hooks-plus` remains compatible; the Node.js requirement mainly applies to repository development, package builds, and documentation builds.
- If your CI still uses Node.js 18 or 20, upgrade it to Node.js 22.18.0 or 24.x.
