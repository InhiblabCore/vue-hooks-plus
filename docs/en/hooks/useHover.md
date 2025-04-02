---
map:
  # 映射到docs的路径
  path: /useHover
---

# useHover

A hook that tracks whether the element is being hovered.

## Code demonstration

<demo src="useHover/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Use ref to set element that needs monitoring."> </demo>

## API

```javascript
const isHovering = useHover(target, {
  onEnter,
  onLeave,
  onChange,
})
```

## Params

| Property | Description        | Type                                          | Default |
| -------- | ------------------ | --------------------------------------------- | ------- |
| target   | DOM element or ref | `() => Element` \| `Element` \| `JSX.Element` | -       |
| options  | More config        | `Options`                                     | -       |

## Options

| Property | Description                             | Type                            | Default |
| -------- | --------------------------------------- | ------------------------------- | ------- |
| onEnter  | Callback to be executed on mouse hover  | `() => void`                    | -       |
| onLeave  | Callback to be executed on mouse leave  | `() => void`                    | -       |
| onChange | Callback to be executed on hover change | `(isHovering: boolean) => void` | -       |

## Result

| Property   | Description                          | Type                     |
| ---------- | ------------------------------------ | ------------------------ |
| isHovering | Whether the element is being hovered | `Readonly<Ref<boolean>>` |
