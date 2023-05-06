---
map:
  # 映射到docs的路径
  path: /useInViewport
---

# useInViewport

观察元素是否在可见区域，以及元素可见比例。更多信息参考 [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="监听元素是否在可见区域内"> </demo>

### 监听元素可见区域比例

<demo src="./demo/demo1.vue"
  language="vue"
  title="监听元素可见区域比例"
  desc="传入 options.threshold, 可以控制在可见区域达到该比例时触发 ratio 更新。options.root 可以控制相对父级元素，在这个例子中，不会相对浏览器视窗变化。"> </demo>

## API

```typescript
const [inViewport, ratio] = useInViewport(
  target,
  options?: Options
);
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | DOM 节点或者 ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | - |
| options | 设置 | `Options` | - |

### Options

更多信息参考 [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| threshold | 可以是单一的 number 也可以是 number 数组，target 元素和 root 元素相交程度达到该值的时候 ratio 会被更新 | `number` \| `number[]` | - |
| rootMargin | 根(root)元素的外边距 | `string` | - |
| root | 指定根(root)元素，用于检查目标的可见性。必须是目标元素的父级元素，如果未指定或者为 null，则默认为浏览器视窗。 | `Element` \| `Document` \| `() => (Element/Document)` \| `MutableRefObject<Element>` | - |

### Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| inViewport | 是否可见 | `Readonly<Ref<boolean>>` \| `undefined` |
| ratio | 当前可见比例，在每次到达 `options.threshold` 设置节点时更新 | `Readonly<Ref<number>>` \| `undefined` |
