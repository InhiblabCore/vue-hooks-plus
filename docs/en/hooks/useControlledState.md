---
map:
  # Path mapped to docs
  path: /useControlledState
---

# useControlledState `^2.4.0`

A hook for managing controlled and uncontrolled state, similar to React's controlled/uncontrolled pattern.

<!-- [[toc]] -->

## Default Value Mode

When the state is empty, the default value will be used.

<demo src="useControlledState/demo.vue"
language="vue"
title="Basic usage"
desc="Switch between controlled and uncontrolled state."> </demo>

## Uncontrolled Mode

If the first argument does not pass a reactive value, useControlledState will maintain an internally managed value that is not controlled externally.

<demo src="useControlledState/demo1.vue"
language="vue"
title="Uncontrolled state"
desc=""> </demo>

## Controlled Mode

If the first argument passes a reactive value, the state inside useControlledState will be fully controlled by the outside. 

You need to update the reactive value of the first argument in the onChange callback for the change to take effect.

<demo src="useControlledState/demo2.vue"
language="vue"
title="Controlled state"
desc=""></demo>

## API

```typescript
function useControlledState<T, C = T>(
  value?: Ref<T | undefined>,
  defaultValue: T,
  onChange?: (v: C, ...args: any[]) => void
): [ComputedRef<T>, (value: T | ((prev: T) => T), ...args: any[]) => void]
```

## Params

| Property     | Description                                                                 | Type                        | Default   |
| ------------ | --------------------------------------------------------------------------- | --------------------------- | --------- |
| value        | Controlled value, if `undefined` will use internal state                    | `Ref<T | undefined>`       | -         |
| defaultValue | Default value when uncontrolled                                             | `T`                         | -         |
| onChange     | Callback when value changes (called for both controlled and uncontrolled)   | `(v: C, ...args: any[]) => void` | `undefined` |

## Result

| Property   | Description                                   | Type                                      |
| ---------- | --------------------------------------------- | ----------------------------------------- |
| state      | Current value (computed, always in sync)      | `ComputedRef<T>`                          |
| setState   | Update value (will call onChange if changed)  | `(value: T | ((prev: T) => T), ...args: any[]) => void` |

## Remarks

- If `value` is provided (not `undefined`), the state is controlled by the parent, and `setState` will only trigger `onChange` but not update the value directly.
- If `value` is `undefined`, the state is uncontrolled and managed internally.
- If you use a function as the argument to `setState`, a warning will be shown (for compatibility with React API, but not recommended in Vue).
- The hook will warn if you switch between controlled and uncontrolled mode during the component lifecycle.
