---
map:
  # Path mapped to docs
  path: /useControlledState
---

# useControlledState `^2.4.0`

一个用于管理受控和非受控状态的 Hook，类似于 React 的受控/非受控模式。

<!-- [[toc]] -->

## 默认值模式

当状态为空的时候，将使用默认值。

<demo src="useControlledState/demo.vue"
language="vue"
title="基本用法"
desc="默认值会在值为非法的时候应用"> </demo>

## 非受控模式

如果第一个参数不传递响应式值，useControlledState 将在内部维护一个不受外部控制的值。

<demo src="useControlledState/demo1.vue"
language="vue"
title="非受控模式"
desc=""> </demo>

## 受控模式

如果第一个参数传递响应式值，useControlledState 内的状态将完全由外部控制。

需要在第三个参数 onChange 时将第一个参数的响应式值变更才会生效。

<demo src="useControlledState/demo2.vue"
language="vue"
title="受控模式"
desc=""></demo>

## API

```typescript
function useControlledState<T, C = T>(
  value?: Ref<T | undefined>,
  defaultValue: T,
  onChange?: (v: C, ...args: any[]) => void
): [ComputedRef<T>, (value: T | ((prev: T) => T), ...args: any[]) => void]
```

## 参数说明

| 参数         | 说明                                                                 | 类型                        | 默认值   |
| ------------ | ---------------------------------------------------------------------- | --------------------------- | -------- |
| value        | 受控值，如果为 `undefined` 则使用内部状态                              | `Ref<T | undefined>`       | -        |
| defaultValue | 非受控时的默认值                                                      | `T`                         | -        |
| onChange     | 值变化时的回调（受控和非受控都会调用）                                 | `(v: C, ...args: any[]) => void` | `undefined` |

## 返回结果

| 属性       | 说明                                         | 类型                                      |
| ---------- | -------------------------------------------- | ----------------------------------------- |
| state      | 当前值（computed，始终保持同步）             | `ComputedRef<T>`                          |
| setState   | 更新值（变更时会调用 onChange）              | `(value: T | ((prev: T) => T), ...args: any[]) => void` |

## 备注

- 如果传入了 `value`（不是 `undefined`），则状态由父组件控制，`setState` 只会触发 `onChange`，不会直接更新值。
- 如果 `value` 为 `undefined`，则状态为非受控，由内部管理。
- 如果 `setState` 的参数为函数，会有警告（为兼容 React API，不推荐在 Vue 中使用）。
- 如果在组件生命周期内切换了受控和非受控模式，会有警告。