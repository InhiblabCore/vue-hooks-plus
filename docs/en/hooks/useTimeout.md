---
map:
  # 映射到docs的路径
  path: /useTimeout
---

# useTimeout

A hook that handles the `setTimeout` timer function.

## Code demonstration

<demo src="useTimeout/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Execute once after 2000ms"> </demo>

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: Ref<number | undefined> | number,
  options?:{
    immediate?: boolean
  }
): fn: () => void;
```

## Params

| Property | Description | Type |
| --- | --- | --- |
| fn | The function to be executed after `delay` milliseconds. | `() => void` |
| delay | The number of milliseconds to wait before executing the function. The timer will be cancelled if delay is `Ref<number` \| `undefined >`\|`number` \| `undefined` |
| immediate | Whether the function should be executed immediately on first execution | `boolean` |

## Result

| Property     | Description   | Type         |
| ------------ | ------------- | ------------ |
| clearTimeout | clear timeout | `() => void` |
