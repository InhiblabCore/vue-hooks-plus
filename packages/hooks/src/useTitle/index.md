---
map:
  # 映射到docs的路径
  path: /useTitle
---

# useTitle

改变浏览器 title 的 Hook

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="改变浏览器 title,可动态改变；">
</demo>


## API

```typescript
useTitle(title: string, options?: Options);
```

### Params

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| title | 页面标题 | `Ref<string>` | -      |

### Options

| 参数             | 说明                               | 类型      | 默认值  |
| ---------------- | ---------------------------------- | --------- | ------- |
| restoreOnUnmount | 组件卸载时，是否恢复上一个页面标题 | `boolean` | `false` |
