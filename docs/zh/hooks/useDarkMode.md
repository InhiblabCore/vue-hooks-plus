---
map:
  # 映射到docs的路径
  path: /useDarkMode
---

# useDarkMode

使用暗黑模式的 Hook。

## 代码演示

<demo src="useDarkMode/demo.vue"
  language="vue"
  title="基本用法"
  desc="可跟随系统和用户手动切换"> </demo>

## API

```typescript
const [darkMode, setDarkMode] = useDarkMode()
```

## Result

| 参数        | 说明                               | 类型                     |
| ----------- | ---------------------------------- | ------------------------ |
| darkMode    | 是否是暗黑模式                     | `ComputedRef<boolean>`   |
| setDarkMode | 设置暗黑模式，undefined 为跟随系统 | `boolean` \| `undefined` |
