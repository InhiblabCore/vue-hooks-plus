---
map:
  # 映射到docs的路径
  path: /useTimeout
---

# useTimeout

A hook that handles the `setTimeout` timer function.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Execute once after 2000ms"> </demo>

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | null
): fn: () => void;
```

## Params

| Property | Description | Type |
| --- | --- | --- |
| fn | The function to be executed after `delay` milliseconds. | `() => void` |
| delay | The number of milliseconds to wait before executing the function. The timer will be cancelled if delay is `undefined`. | `number` \| `undefined` |

## Result

| Property     | Description   | Type         |
| ------------ | ------------- | ------------ |
| clearTimeout | clear timeout | `() => void` |
