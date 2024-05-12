### commit 规范 📐

- feat：新增功能.
- fix：bug 修复
- docs：文档更新
- style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
- refactor：重构代码(既没有新增功能，也没有修复 bug)
- perf：性能, 体验优化
- test：新增测试用例或是更新现有测试
- build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
- ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交
- chore：不属于以上类型的其他类，比如构建流程, 依赖管理
- revert：回滚某个更早之前的提交
- version: 改变 package.json 版本
- readme: 修改 readme 内容
- ts: 仅修改 ts

### 🤝 你应该,根据变更的类型，选择合适... 采用英文 : 和 一个空格符 👇

```bash

feat: your commit

```

### 📌 可能存在的问题

如果运行 `pnpm docs:dev` 提示报错，可以尝试一下以下操作:

- 检查 `node` 版本: 建议使用 `node 16`, `node 18` 版本开发
- 构建包后再运行: `pnpm build` 后再运行 `pnpm docs:dev`

```bash
# 构建包
pnpm build

# 运行文档
pnpm docs:dev
```
