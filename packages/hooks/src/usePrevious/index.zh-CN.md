---
map:
  # 映射到docs的路径
  path: /usePrevious
---

# usePrevious

保存上一次状态的 Hook。

## 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="记录上次的 count 值"> </demo>

## 自定义 shouldUpdate 函数

<demo src="./demo/demo1.vue"
  language="vue"
  title="自定义 shouldUpdate 函数"
  desc="只有 shouldUpdate function 返回 true 时，才会记录值的变化"> </demo>

## Result

| 参数        | 说明            | 类型               |
| ----------- | --------------- | ------------------ |
| previousRef | 上次 state 的值 | `Readonly<Ref<T>>` |

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| currentRef | 需要记录变化的值 | `Ref<T>` \| `ComputedRef<T>` | - |
| shouldUpdate | 可选，自定义判断值是否变化 | `(prev: T \| undefined, next: T) => boolean` | `(a, b) => a !== b` |
