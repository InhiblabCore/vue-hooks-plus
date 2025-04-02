---
map:
  # 映射到docs的路径
  path: /useEventEmitter
---

# useEventEmitter

Sometimes it is difficult to pass events between multiple components. By using EventEmitter, this can be simplified.

To get an instance of `EventEmitter`, you can call `useEventEmitter` in React components.

> If the component renders multiple times, the return value of useEventEmitter in every render process will stay unchanged and no extra `EventEmitter` instance will be created.
>
> You can also create instances of the global sharing.

## Code demonstration

<demo src="useEventEmitter/demo.vue"
  language="vue"
  title="Parent component shares a event"
  desc=""> </demo>

## API

```typescript
const event = useEventEmitter<T>()
```

### Params

| Property | Description  | Type      | Default |
| -------- | ------------ | --------- | ------- |
| global   | Is it global | `boolean` | `false` |

### Result

| Property | Description | Type |
| --- | --- | --- |
| emit | Send an event notification | `(eventName?:string,val: T) => void` |
| useSubscription | Subscribe to the event | `(eventName?:string,callback: (val: T) => void) => void` |
