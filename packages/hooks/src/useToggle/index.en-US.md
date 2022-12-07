---
map:
  # 映射到docs的路径
  path: /useToggle
---

# useToggle

A hook that toggle states.

## Code demonstration

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Default usage"
  desc="Default value is boolean，alike useBoolean."> </demo>

### Advanced usage

<demo src="./demo/demo1.vue"
  language="vue"
  title="Toggle between any two values"
  desc="Accept two optional parameters and toggle between them."> </demo>

## API

```typescript
const [state, { toggle, set, setLeft, setRight }] = useToggle(defaultValue?: boolean);
const [state, { toggle, set, setLeft, setRight }] = useToggle<T>(defaultValue: T);
const [state, { toggle, set, setLeft, setRight }] = useToggle<T, U>(defaultValue: T, reverseValue: U);
```

## Params

| Property     | Description                 | Type | Default |
| ------------ | --------------------------- | ---- | ------- |
| defaultValue | The default value. Optional | `T`  | `false` |
| reverseValue | The reverse value. Optional | `U`  | `-`     |

## Result

| Property | Description                            | Type       |
| -------- | -------------------------------------- | ---------- |
| state    | Current state                          | `Ref<any>` |
| actions  | A set of methods to update state value | `Actions`  |

## Actions

| Property | Description | Type |
| --- | --- | --- |
| toggle | Toggle state | `() => void` |
| set | Set state | `(state: T \| U) => void` |
| setLeft | Set state to `defaultValue` | `() => void` |
| setRight | Set state to `reverseValue` if `reverseValue` is available. Otherwise set it to the reverse of `defaultValue` | `() => void` |
