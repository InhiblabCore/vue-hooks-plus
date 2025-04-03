---
map:
  # 映射到docs的路径
  path: /useWinResize
---

# useWinResize

Hook listening for Windows size changes

## 代码演示

<demo src="useWinResize/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Listen for the windows dimensions"> </demo>

## API

```typescript
useWinResize(
  handler: (ev: Event) => void,
);
```

## Params

| Property | Description | Type                  | Default |
| -------- | ----------- | --------------------- | ------- |
| handler  | 处理函数    | `(ev: Event) => void` | -       |
