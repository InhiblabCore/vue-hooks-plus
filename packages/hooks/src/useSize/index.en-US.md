---
map:
  # 映射到docs的路径
  path: /useSize
---

# useSize

A hook that observes size change of an element.

## Code demonstration

### Default usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Default usage"
  desc="useSize can receive ref as argument"> </demo>

### Pass in the DOM element

<demo src="./demo/demo1.vue"
  language="vue"
  title="Pass in the DOM element"
  desc="useSize can receive a dom element as parameter. In SSR scenarios, you can pass in function ()=>dom"> </demo>

## API

```typescript
const size = useSize(target)
```

## Params

| Property | Description               | Type                                            | Default |
| -------- | ------------------------- | ----------------------------------------------- | ------- |
| target   | DOM element or ref object | `Element` \| `(() => Element)` \| `JSX.Element` | -       |

## Result

| Property | Description         | Type                                                  |
| -------- | ------------------- | ----------------------------------------------------- |
| size     | Size of the element | `Ref<{ width: number, height: number } \| undefined>` |
