---
map:
  # Path mapped to docs
  path: /useLongPress
---

# useLongPress

Listen for a long press on an element.

## Code demonstration

<demo src="useLongPress/demo.vue"
  language="vue"
  title="Basic usage"
  desc="listen for a long press on an element."> </demo>

## API

```typescript
const { isPressing , pressingTime } = useLongPress(target: BasicTarget , options?: LongPressOptions)
```

## Result

| Property     | Description                                                                                                                  | Type                     |
|--------------|------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| isPressing   | Indicates the current pressing state. If pressing, the value is true; otherwise it's false.                                  | `Readonly<Ref<boolean>>` |
| pressingTime | Represents the duration of pressing (possibly in milliseconds). This value will only be updated during the pressing period.  | `Readonly<Ref<number>>`  |

## Params

| Property | Description            | Type                                                        | Default |
|----------|------------------------|-------------------------------------------------------------|---------|
| target   | DOM element or ref     | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options  | Additional config      | `UseLongPressOptions`                                       | -       |

### DropOptions

| Property      | Description                                                      | Type                  | Default |
|---------------|------------------------------------------------------------------|-----------------------|---------|
| delay         | Time in ms till `longpress` gets called                          | `number`              | 500     |
| minUpdateTime | Minimum time interval in ms for updating the `longpress` event   | `number`              | 100     |
| cancelOnMove  | Whether to cancel the longpress event when mouse move            | `boolean`             | true    |
| modifiers     | `longpress` event modifiers                                      | `LongPressModifiers`  | -       |

### LongPressModifiers

| Property   | Description                             | Type         | Default |
|------------|-----------------------------------------|--------------|---------|
| stop       | stopPropagation event                   | `boolean`    | -       |
| once       | eventListener once option               | `boolean`    | -       |
| prevent    | preventDefault event                    | `boolean`    | -       |
| capture    | eventListener capture option            | `boolean`    | -       |
| self       | check event target element same as self | `boolean`    | -       |
