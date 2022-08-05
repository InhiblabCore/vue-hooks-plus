---
map:
  # 映射到docs的路径
  path: /useDisableBrowserBehavior
---

# useDisableBrowserBehavior

禁用 浏览器行为 权限的 Hook

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="自由定义需要禁用的浏览器行为">
</demo>

### Params

| 参数         | 说明                     | 类型      | 默认值  |
| ------------ | ------------------------ | --------- | ------- |
| browserEvent | 浏览器行为 | `string[]` | - |
| keydown | 浏览器键盘行为 | `string[]` | - |
| browserConsole | 浏览器控制台 | `boolean` | `false` |

### Result

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| startRun   | 开始执行   | ` () => void` |
| stopRun | 结束执行 | ` () => void` |