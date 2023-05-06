---
map:
  # 映射到docs的路径
  path: /useSize
---

# useSize

监听 DOM 节点尺寸变化的 Hook

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="传入需要监听的ref"> </demo>

### 传入 Dom

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="传入 body dom"> </demo>

## API

```typescript
const size = useSize(target)
```

## Params

| 参数   | 说明             | 类型                                            | 默认值 |
| ------ | ---------------- | ----------------------------------------------- | ------ |
| target | DOM 节点或者 ref | `Element` \| `(() => Element)` \| `JSX.Element` | -      |

## Result

| 参数 | 说明           | 类型                                                            |
| ---- | -------------- | --------------------------------------------------------------- |
| size | DOM 节点的尺寸 | `Readonly<Ref<{ width: number, height: number } \| undefined>>` |
