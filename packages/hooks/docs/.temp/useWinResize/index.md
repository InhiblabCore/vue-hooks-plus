---
map:
  path: /useWinResize
  realPath: src/useWinResize/index.md
---

# useWinResize

监听 Windows 尺寸变化的 Hook

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="监听windows尺寸">
</demo>


## API

```typescript
useWinResize(
  handler: (ev: Event) => void,
);
```

### Params

| 参数      | 说明       | 类型                  | 默认值 |
| --------- | ---------- | --------------------- | ------ |
| handler   | 处理函数   | `(ev: Event) => void` | -      |
