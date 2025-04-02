---
map:
  # 映射到docs的路径
  path: /useScroll
---

# useScroll

优雅监听元素的滚动位置的 Hook。

## 代码演示

### 基础用法

<demo src="useScroll/demo.vue"
  language="vue"
  title="基本用法"
  desc="监听元素的滚动位置"> </demo>

### 监测整页的滚动

<demo src="useScroll/demo1.vue"
  language="vue"
  title="监测整页的滚动"
  desc="滚动一下页面"> </demo>

### 控制滚动状态的监听

<demo src="useScroll/demo2.vue"
  language="vue"
  title="自定义滚动监测"
  desc="在垂直方向 100px 到 200px 的滚动范围内监听"> </demo>

## API

```typescript
const position = useScroll(target, shouldUpdate)
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | DOM 节点或者 ref | `Element` \| `Document` \| `(() => Element)` \| `JSX.Element` | `document` |
| shouldUpdate | 控制是否更新滚动信息 | `({ top: number, left: number }) => boolean` | - |

## Result

| 参数     | 说明                   | 类型                                                        |
| -------- | ---------------------- | ----------------------------------------------------------- |
| position | 滚动容器当前的滚动位置 | `Readonly<Ref<{ left: number, top: number } \| undefined>>` |
