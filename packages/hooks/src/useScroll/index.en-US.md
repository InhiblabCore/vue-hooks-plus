---
map:
  # 映射到docs的路径
  path: /useScroll
---

# useScroll

Get the scroll position of an element.

## Code demonstration

### Basic Usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic Usage"
  desc="Try to scroll the box below."> </demo>

### Detect Whole Page Scroll

<demo src="./demo/demo1.vue"
  language="vue"
  title="Listen Page Scroll"
  desc="Try to scroll this webpage."> </demo>

### Control listen on scroll status

<demo src="./demo/demo2.vue"
  language="vue"
  title="Custom update"
  desc="listen on scroll event between 100px ~ 200px in vertical direction"> </demo>

## API

```typescript
const position = useScroll(target, shouldUpdate)
```

## Params

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| target | DOM element or ref object | `Element` \| `Document` \| `(() => Element)` \| `JSX.Element` | `document` |
| shouldUpdate | Whether update position | `({ top: number, left: number }) => boolean` | - |

## Result

| Property | Description | Type |
| --- | --- | --- |
| position | The current scroll position of the element. | `Ref<{ left: number, top: number } \| undefined>` |
