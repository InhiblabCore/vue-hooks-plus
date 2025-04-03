---
map:
  # 映射到docs的路径
  path: /useElementBounding
---

# useElementBounding

Dynamically obtain the size and coordinates of Dom elements.

## Code demonstration

<demo src="useElementBounding/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Use ref to set element that needs monitoring."> </demo>

## API

```typescript
const isHovering = useHover(target, {
  reset?: boolean
  windowResize?: boolean
  windowScroll?: boolean
  immediate?: boolean
})
```

## Params

| Property | Description        | Type                                          | Default |
| -------- | ------------------ | --------------------------------------------- | ------- |
| target   | DOM element or ref | `() => Element` \| `Element` \| `JSX.Element` | -       |
| options  | More config        | `UseElementBoundingOptions`                   | -       |

## Options

| 参数         | 说明                                                      | 类型      | 默认值 |
| ------------ | --------------------------------------------------------- | --------- | ------ |
| reset        | When the component is mounted, initialize all values to 0 | `boolean` | true   |
| windowResize | Monitor window size changes                               | `boolean` | true   |
| windowScroll | Monitor window scrolling changes                          | `boolean` | true   |
| immediate    | Executed immediately when the component is mounted        | `boolean` | true   |
