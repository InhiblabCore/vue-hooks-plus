---
map:
  # 映射到docs的路径
  path: /useInViewport
---

# useInViewport

Observe whether the element is in the visible area, and the visible area ratio of the element. More information refer to [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)。

## Code demonstration

### Default usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Observe if the element is visible."> </demo>

### Observe the visible area ratio of element

<demo src="./demo/demo1.vue"
  language="vue"
  title="Observe element visible area ratio"
  desc="Pass in options.threshold, you can control the ratio to be triggered when the visible area reach every threshold.
options.root can control the parent element, in this example, visible will not change relative to the browser viewport."> </demo>

## API

```typescript
const [inViewport, ratio] = useInViewport(
  target,
  options?: Options
);
```

## Params

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| target | DOM element or ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | - |
| options | Setting | `Options` | - |

## Options

More information refer to [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| threshold | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the ratio should be executed | `number` \| `number[]` | - |
| rootMargin | Margin around the root | `string` | - |
| root | The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. | `Element` \| `Document` \| `() => (Element/Document)` \| `MutableRefObject<Element>` | - |

## Result

| Property | Description | Type |
| --- | --- | --- |
| inViewport | Is visible | `Ref<boolean>` \| `undefined` |
| ratio | Current visible ratio, updated every time the node set by `options.threshold` is reached | `Ref<number>` \| `undefined` |
