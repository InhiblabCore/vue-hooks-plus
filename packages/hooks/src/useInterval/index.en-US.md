---
map:
  # 映射到docs的路径
  path: /useInterval
---

# useInterval

A hook that handles the `setInterval` timer function.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Execute once per 2000ms."> </demo>

## API

```typescript
useInterval(
  fn: () => void,
  delay?: number | undefined,
  options?: Options
): fn: () => void;
```

## Params

| Property | Description | Type |
| --- | --- | --- |
| fn | The function to be executed every `delay` milliseconds. | `() => void` |
| delay | The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if delay is set to `undefined`. | `Ref<number>`\|`number` \| `undefined` |
| options | Config of the interval behavior. | `Options` |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| immediate | Whether the function should be executed immediately on first execution | `boolean` | `false` |

## Result

| Property      | Description    | Type         |
| ------------- | -------------- | ------------ |
| clearInterval | clear interval | `() => void` |
