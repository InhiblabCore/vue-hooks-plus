---
map:
  # 映射到docs的路径
  path: /usePreview
---

# usePreview

A hook for previewing the md and vue component views

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Preview view"> </demo>

## API

```typescript
const { container } = usePreview(target)
```

## Params

| Property | Description        | Type                                        |
| -------- | ------------------ | ------------------------------------------- |
| target   | DOM element or ref | `VueComponent` \| `string` \| `JSX.Element` |

## Result

| Property  | Description        | Type                                          |
| --------- | ------------------ | --------------------------------------------- |
| container | DOM element or ref | `Element` \| `() => Element` \| `JSX.Element` |
