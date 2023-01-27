# VueHooks Plus Contributing Guide

Hi! We're really excited that you're interested in contributing to VueHooks Plus! Before submitting your contribution, please read through the following guide.

## Repo Setup

The VueHooks Plus repo is a monorepo using pnpm workspaces. The package manager used to install and link dependencies must be [pnpm](https://pnpm.io/).

To develop and test the core `VueHooks Plus` package:

1. Run `pnpm i` in VueHooks Plus's root folder.

2. `packages/hooks/src` folder add hook function.

3. Export hook function from `packages/hooks/src/index.ts`.

4. Run `pnpm test` in VueHooks Plus's root folder.

5. Run `pnpm run build` in VueHooks Plus's root folder.

## Develop Detailed steps

1. `packages/hooks/src` folder adds a folder starting with an `useXxx`.

2. Add `en-US.md` and `zh-CN.md` as a document.

3. Add `demo` folder as a document example.

4. Add `__tests__` folder as Unit Tests.

5. Import the hook file you created in `packages/hooks/src/index.ts`.

## Running Tests

you can Run `pnpm test` or `pnpm test:ui` in VueHooks Plus's root folder.

## Running document

Start documentation via [Dev Document Guide](./DEV_DOCUMENT.md).

1. Run `pnpm docs:dev` in VueHooks Plus's root folder or Run `pnpm initial` and `pnpm docs:dev` `packages/hooks` folder.

2. `.md` must add a mapping path.

```

---
map:
# Path mapped to docs
path: /useBoolean
---

```

3. `packages/hooks/docs/.vitepress/router.ts` add hooks router info.

## Pull Request Guidelines

- Checkout a topic branch from a base branch (e.g. `master`), and merge back against that branch.

- If adding a new feature:

  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first, and have it approved before working on it.
  - PR title `feat: xxxxx`

- If fixing a bug:

  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log (e.g. `fix: update entities encoding/decoding (fix #3899)`).
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

- It's OK to have multiple small commits as you work on the PR. GitHub can automatically squash them before merging.

- Commit template [English](https://github.com/InhiblabCore/vue-hooks-plus/blob/master/.github/COMMIT.md)

- Make sure tests pass!

## Issue Guidelines

- Select the corresponding template

- Use either the 中文 or the English language
