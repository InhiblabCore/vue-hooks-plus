# 子项目① 工具链升级 + 依赖安全 + CI 门禁 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把开发工具链升至当前最新主流版本、清除依赖漏洞、建立 CI 安全门禁，全程不改变任何 hook 源码行为。

**Architecture:** 纯依赖/配置升级，按"死配置清理 → 测试栈 → 构建栈 → 周边工具 → 生产漏洞 → CI 门禁"顺序推进，每步独立 commit，以现有 63 个 spec 文件 + `pnpm build` 作为回归验收线。

**Tech Stack:** pnpm 9 monorepo、vitest 4、vite 8、@vitejs/plugin-vue 6、happy-dom 20、vue-tsc 3、prettier 3、husky 9、GitHub Actions。

**Spec:** `docs/superpowers/specs/2026-06-10-upgrade-roadmap-and-toolchain-design.md`

**版本目标与 spec 的差异说明:** spec 调研时记录目标为 vitest 3.x / vite 7.x；计划编写时（2026-06-10）npm 实际最新为 vitest 4.1.8 / vite 8.0.16，且兼容矩阵已验证（vitest 4 接受 vite ^6||^7||^8；@vitejs/plugin-vue 6.0.7 接受 vite ^5–^8 与 vue ^3.2.25；vue-tsc 3.3.4 要求 typescript >=5.0；Node 引擎要求均 ≤22.18）。计划按"当前最新"执行，符合 spec 意图。

---

## 全局工作约定

- **本仓库提交一律用 `command git`**（曾发生过 `git commit` 被外部进程改写信息并卷入未暂存文件的事故）。**每次 commit 后立即验证**：`command git log -1 --format='%s'` 与 `command git show --stat HEAD`，确认信息与文件清单符合预期；不符则 `command git reset --soft HEAD~1` 重来。
- pre-commit 钩子会跑 lint-staged（eslint --fix），commit-msg 钩子跑 commitlint（要求 conventional commits 格式）。
- 修复测试失败时**只允许改测试文件或 `packages/hooks/test-utils`，不允许改 hook 源码**。如果失败暴露的是源码真实 bug，停下来向用户报告，不要顺手修。
- 基准分支：`docs/upgrade-roadmap-spec`（spec 已在其历史中）。

---

### Task 0: 建立绿色基线

**Files:** 无修改，纯验证。

- [ ] **Step 0.1: 确认起点状态**

```bash
command git status --short   # 预期：无未提交变更（.claude/、CLAUDE.md 两个未跟踪条目可忽略）
command git log -1 --format='%h %s'
```

- [ ] **Step 0.2: 跑全量测试，记录基线**

```bash
pnpm vitest run
```

预期：63 个测试文件全部通过（0 failed）。若基线就有失败，停止并报告用户，不进入后续任务。

- [ ] **Step 0.3: 跑全量构建，记录基线**

```bash
pnpm build
```

预期：退出码 0。若失败，停止并报告。

---

### Task 1: 清理死配置与死依赖

**Files:**
- Modify: `package.json`（根目录）

- [ ] **Step 1.1: 删除 simple-git-hooks 死配置块**

`package.json` 中删除以下整块（husky 才是生效的 hooks 管理器，`.husky/` 在用）：

```json
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
```

- [ ] **Step 1.2: 删除两个死依赖**

`devDependencies` 中删除以下两行（`@typescript-eslint/eslint-plugin@5` 未被 `eslint.config.js` 引用 —— flat config 经 `@vue/eslint-config-typescript@14` 引入新版 typescript-eslint；`@types/react-dom` 是 Vue 仓库中的 React 遗留）：

```json
    "@typescript-eslint/eslint-plugin": "^5.33.0",
    "@types/react-dom": "^18.0.6",
```

- [ ] **Step 1.3: 重装并验证**

```bash
pnpm install
npx eslint --cache scripts/bootstrap.ts   # 验证 eslint flat config 仍可用，预期退出码 0
pnpm vitest run                           # 预期 63 个文件全绿
```

- [ ] **Step 1.4: Commit 并验证提交**

```bash
command git add package.json pnpm-lock.yaml
command git commit -m "chore: remove dead simple-git-hooks config and unused dev dependencies"
command git log -1 --format='%s' && command git show --stat HEAD
```

预期：提交信息与上述一致，仅 2 个文件变更。

---

### Task 2: 升级测试栈（vitest 4 / vite 8 / plugin-vue 6 / happy-dom 20）

**Files:**
- Modify: `package.json`（根目录 devDependencies）
- 可能修改: `packages/hooks/src/**/__tests__/*.spec.ts`、`packages/hooks/test-utils/*`（仅当测试因升级失败）

- [ ] **Step 2.1: 修改版本声明**

`package.json` devDependencies 中：

```diff
-    "@vitejs/plugin-vue": "^2.3.1",
+    "@vitejs/plugin-vue": "^6.0.7",
-    "@vitest/ui": "^0.25.3",
+    "@vitest/ui": "^4.1.8",
+    "@vitest/coverage-v8": "^4.1.8",
-    "happy-dom": "15.10.2",
+    "happy-dom": "^20.10.2",
-    "vite": "3.0.2",
+    "vite": "^8.0.16",
-    "vitest": "2.x",
+    "vitest": "^4.1.8",
```

（`@vitest/coverage-v8` 是新增依赖，按字母序插入；覆盖率门槛配置属于子项目②，本任务只安装。）

- [ ] **Step 2.2: 安装**

```bash
pnpm install
```

预期：无 peer dependency 错误。

- [ ] **Step 2.3: 跑全量测试**

```bash
pnpm vitest run
```

预期：63 个文件全绿。若有失败，常见原因和处理：
- **fake timers 行为变化**（vitest 3/4 调整过 `vi.useFakeTimers` 默认 toFake 集合）：在失败测试内显式传参，如 `vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })`。
- **happy-dom 15→20 严格化**（事件、storage、URL 行为更贴近规范）：调整测试断言或 test-utils，使其符合规范行为。
- 修复范围限制见"全局工作约定"。每修一处重跑该文件：`pnpm vitest run <spec 路径>`。

- [ ] **Step 2.4: 验证 coverage provider 可加载**

```bash
pnpm vitest run packages/hooks/src/useBoolean --coverage.enabled
```

预期：测试通过且输出 coverage 表格（仅验证安装成功，不设门槛）。

- [ ] **Step 2.5: Commit 并验证提交**

```bash
command git add -A
command git commit -m "chore: upgrade test stack to vitest 4 / vite 8 / happy-dom 20"
command git log -1 --format='%s' && command git show --stat HEAD
```

预期：变更文件为 package.json、pnpm-lock.yaml 及（如有）测试文件；不含任何 `packages/*/src` 非测试源码。

---

### Task 3: 升级构建/类型栈（vue-tsc 3 / typescript 声明对齐）

**Files:**
- Modify: `package.json`（根目录 devDependencies）

- [ ] **Step 3.1: 修改版本声明**

```diff
-    "typescript": "^5.0.4",
+    "typescript": "^5.9.3",
-    "vue-tsc": "1.0.9",
+    "vue-tsc": "^3.3.4",
```

注意：**不升 TypeScript 6**（vue-tsc 3.3.4 的 peer 要求是 >=5.0，但 TS 6 刚发布，生态兼容未知，超出本子项目范围）。

- [ ] **Step 3.2: 安装并构建**

```bash
pnpm install
pnpm build
```

预期：退出码 0。`packages/hooks` 的 build 会先跑 `vue-tsc --noEmit`，大版本跨度（1→3）可能暴露存量类型错误：
- 只做让 `--noEmit` 通过的**最小修复**（如补充类型断言、修正明显错误的类型标注）。
- 不做任何顺手重构；若错误涉及运行时行为改动，停止并报告用户。

- [ ] **Step 3.3: 类型修复后回归测试（仅当 Step 3.2 改了源码）**

```bash
pnpm vitest run
```

预期：63 个文件全绿。

- [ ] **Step 3.4: Commit 并验证提交**

```bash
command git add -A
command git commit -m "chore: upgrade vue-tsc to v3 and align typescript range"
command git log -1 --format='%s' && command git show --stat HEAD
```

---

### Task 4: 升级 prettier 3 并适配 bootstrap 脚本

**Files:**
- Modify: `package.json`（根目录 devDependencies）
- Modify: `scripts/bootstrap.ts:18-22`

- [ ] **Step 4.1: 修改版本声明**

```diff
-    "prettier": "^1.19.1",
+    "prettier": "^3.8.4",
```

- [ ] **Step 4.2: 适配 prettier 3 异步 API**

prettier 3 的 `format()` 返回 Promise。`scripts/bootstrap.ts` 中：

```diff
   await fs.promises.writeFile(
     metaDataPath,
-    prettier.format(metaData, { ...prettierConfig, parser: 'json' }),
+    await prettier.format(metaData, { ...prettierConfig, parser: 'json' }),
     'utf-8',
   )
```

`scripts/utilts.ts` 的 `import { Config } from 'prettier'` 在 v3 中仍然有效，无需改动。

- [ ] **Step 4.3: 验证 bootstrap 产物无漂移**

```bash
pnpm install
pnpm bootstrap
command git diff --stat packages/hooks/meta-data.json
```

预期：diff 为空。若 prettier 3 对 JSON 的格式化与 v1 有细微差异（仅格式、内容等价），将再生成的 `meta-data.json` 一并纳入本次 commit 并在提交信息中说明。

- [ ] **Step 4.4: Commit 并验证提交**

```bash
command git add package.json pnpm-lock.yaml scripts/bootstrap.ts packages/hooks/meta-data.json
command git commit -m "chore: upgrade prettier to v3 and await async format in bootstrap"
command git log -1 --format='%s' && command git show --stat HEAD
```

---

### Task 5: husky 8 → 9 迁移

**Files:**
- Modify: `package.json`（`prepare` 脚本 + devDependencies）
- Modify: `.husky/pre-commit`
- Modify: `.husky/commit-msg`

- [ ] **Step 5.1: 修改 package.json**

```diff
-    "prepare": "husky install"
+    "prepare": "husky"
```

```diff
-    "husky": "^8.0.1",
+    "husky": "^9.1.7",
```

- [ ] **Step 5.2: 移除 v9 中废弃的 hook 头部**

`.husky/pre-commit` 改为（删除 shebang 与 husky.sh 两行，保留其余）：

```sh
. "$(dirname "$0")/common.sh"

[ -n "$CI" ] && exit 0

npx lint-staged
```

`.husky/commit-msg` 改为：

```sh
npx --no-install commitlint --edit "$1"
```

- [ ] **Step 5.3: 重装并触发 prepare**

```bash
pnpm install
```

预期：无 "husky install command is deprecated" 警告。

- [ ] **Step 5.4: Commit（本身就是钩子的验证）并检查**

```bash
command git add package.json pnpm-lock.yaml .husky/pre-commit .husky/commit-msg
command git commit -m "chore: migrate husky to v9"
command git log -1 --format='%s' && command git show --stat HEAD
```

预期：提交过程中可见 lint-staged 输出（pre-commit 生效）且提交成功（commit-msg/commitlint 生效）。若钩子未触发或报错，回滚本任务排查。

---

### Task 6: 修复唯一生产依赖漏洞（broadcast-channel 5 → 7）

**Files:**
- Modify: `packages/use-request-plugins/package.json`（dependencies）
- Modify: `package.json`（根目录 devDependencies 同名条目）

- [ ] **Step 6.1: 两处版本声明同步升级**

`packages/use-request-plugins/package.json`：

```diff
   "dependencies": {
-    "broadcast-channel": "^5.1.0"
+    "broadcast-channel": "^7.3.0"
   },
```

根 `package.json` devDependencies：

```diff
-    "broadcast-channel": "^5.1.0",
+    "broadcast-channel": "^7.3.0",
```

- [ ] **Step 6.2: 安装并验证 API 兼容**

消费方仅 `packages/use-request-plugins/src/useBroadcastChannelPlugin/useBroadcastChannel.ts`，使用的 API：`new BroadcastChannel(name, options)`、`.onmessage`、`.postMessage()`、`BroadcastChannelOptions` 类型 —— 均为 v7 保留的稳定 API。验证方式是构建该包：

```bash
pnpm install
pnpm --filter @vue-hooks-plus/use-request-plugins build
```

预期：构建成功。若 `BroadcastChannelOptions` 类型导出有变，按 v7 实际导出名调整该文件 import（这是类型层适配，允许修改）。

- [ ] **Step 6.3: 验证生产审计清零**

```bash
pnpm audit --prod
```

预期：`No known vulnerabilities found` 或 0 vulnerabilities。

- [ ] **Step 6.4: Commit 并验证提交**

```bash
command git add -A
command git commit -m "fix: upgrade broadcast-channel to v7 to clear @babel/runtime advisory"
command git log -1 --format='%s' && command git show --stat HEAD
```

---

### Task 7: 清理残留传递依赖漏洞（pnpm overrides 兜底）

**Files:**
- 可能修改: `package.json`（根目录 `pnpm.overrides` 字段）

- [ ] **Step 7.1: 查看升级后剩余漏洞**

```bash
pnpm audit 2>&1 | tail -30
```

预期：经 Task 2–6 升级后大部分已消失。关注 severity 为 **high / critical** 的条目（moderate/low 不处理，避免 overrides 钉版本引入兼容风险）。

- [ ] **Step 7.2: 对每个残留 high/critical 添加 override**

对 audit 输出中每个 high/critical 条目，取其 "Patched versions" 字段，在根 `package.json` 中添加（若全部已清零则跳过本任务，直接进 Task 8）：

```json
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": ["vue"]
    },
    "overrides": {
      "<漏洞包名>": ">=<patched 版本>"
    }
  }
```

注意 `pnpm` 字段已存在（含 `peerDependencyRules`），是在其中**新增** `overrides` 键，不是整体替换。

- [ ] **Step 7.3: 重装并复验，循环至达标**

```bash
pnpm install
pnpm audit 2>&1 | tail -5    # 预期：无 high/critical
pnpm vitest run               # 预期：全绿（确认 override 未破坏行为）
```

- [ ] **Step 7.4: Commit 并验证提交（若有 override 变更）**

```bash
command git add package.json pnpm-lock.yaml
command git commit -m "chore: pin vulnerable transitive dependencies via pnpm overrides"
command git log -1 --format='%s' && command git show --stat HEAD
```

---

### Task 8: CI 安全门禁 + Dependabot

**Files:**
- Modify: `.github/workflows/ci.yml`
- Create: `.github/dependabot.yml`

- [ ] **Step 8.1: ci.yml 增加生产审计门禁**

在 `Pnpm install` 步骤之后、`Unit Test` 步骤之前插入：

```yaml
      - name: Audit production dependencies
        run: pnpm audit --prod --audit-level=high
```

（`pnpm audit` 只读 lockfile，不依赖 node_modules；生产依赖出现 high/critical 即失败，dev 依赖不阻塞。）

- [ ] **Step 8.2: 新建 .github/dependabot.yml**

```yaml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    open-pull-requests-limit: 5
  - package-ecosystem: 'github-actions'
    directory: '/'
    schedule:
      interval: 'weekly'
```

- [ ] **Step 8.3: 验证 YAML 语法与门禁命令**

```bash
npx --yes js-yaml .github/dependabot.yml   # 预期：输出解析后的 JSON，无报错
npx --yes js-yaml .github/workflows/ci.yml # 预期：同上
pnpm audit --prod --audit-level=high       # 本地预演门禁，预期退出码 0
```

- [ ] **Step 8.4: Commit 并验证提交**

```bash
command git add .github/workflows/ci.yml .github/dependabot.yml
command git commit -m "ci: add production dependency audit gate and dependabot config"
command git log -1 --format='%s' && command git show --stat HEAD
```

---

### Task 9: 终验（对照 spec 验收标准）

**Files:** 无修改，纯验证。

- [ ] **Step 9.1: 全量回归**

```bash
pnpm vitest run    # 预期：63 个文件全绿
pnpm build         # 预期：退出码 0
```

- [ ] **Step 9.2: 安全验收**

```bash
pnpm audit --prod              # 预期：0 漏洞
pnpm audit 2>&1 | tail -3      # 预期：无 high/critical
```

- [ ] **Step 9.3: 工具验收**

```bash
pnpm bootstrap && command git diff --quiet packages/hooks/meta-data.json && echo BOOTSTRAP-OK
```

预期：输出 BOOTSTRAP-OK。

- [ ] **Step 9.4: 汇总报告**

向用户报告：每项验收标准的实际命令输出结论、升级前后版本对照表、测试修复点清单（如有）、类型修复点清单（如有）、残留 moderate/low 漏洞清单（如有，供子项目④参考）。
