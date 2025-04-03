---
map:
  # 映射到docs的路径
  path: /useToggle
---

# useToggle

优雅的管理两个状态值间切换的 Hook。

## 代码演示

### 基本用法

<demo src="useToggle/demo.vue"
  language="vue"
  title="基本用法"
  desc="默认为 boolean 切换，基础用法与 useBoolean 一致。"> </demo>

### 高级用法

<demo src="useToggle/demo1.vue"
  language="vue"
  title="在任意两个值之间切换"
  desc="接受两个可选参数，在它们之间进行切换"> </demo>

## API

```typescript
const [state, { toggle, set, setLeft, setRight }] = useToggle(defaultValue?: boolean);
const [state, { toggle, set, setLeft, setRight }] = useToggle<T>(defaultValue: T);
const [state, { toggle, set, setLeft, setRight }] = useToggle<T, U>(defaultValue: T, reverseValue: U);
```

## Params

| 参数         | 说明                     | 类型 | 默认值  |
| ------------ | ------------------------ | ---- | ------- |
| defaultValue | 可选项，传入默认的状态值 | `T`  | `false` |
| reverseValue | 可选项，传入取反的状态值 | `U`  | `-`     |

## Result

| 参数    | 说明     | 类型                 |
| ------- | -------- | -------------------- |
| state   | 状态值   | `Readonly<Ref<any>>` |
| actions | 操作集合 | `Actions`            |

### Actions

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| toggle | 切换 state | `() => void` |
| set | 设置 state | `(state: T \| U) => void` |
| setLeft | 设置为 `defaultValue` | `() => void` |
| setRight | 如果传入了 reverseValue, 则设置为 reverseValue。 否则设置为 defautValue 的反值 | `() => void` |
