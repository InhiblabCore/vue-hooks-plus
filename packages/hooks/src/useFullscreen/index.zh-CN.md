---
map:
  # 映射到docs的路径
  path: /useFullscreen
---

# useFullscreen

管理 DOM 全屏的 Hook。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="使用 ref 设置需要全屏的元素"> </demo>

## 图片全屏

<demo src="./demo/demo1.vue"
  language="vue"
  title="图片全屏"
  desc=""> </demo>

## API

```typescript
const [
  isFullscreen,
  {
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isEnabled,
  }] = useFullScreen(
    target,
    options?: Options
  );
```

## Params

| 参数   | 说明             | 类型      |
| ------ | ---------------- | --------- |
| target | DOM 节点或者 ref | `Element` | `() => Element` | `MutableRefObject<Element>` |
| option | 设置             | `Options` |

## Options

| 参数    | 说明         | 类型         | 默认值 |
| ------- | ------------ | ------------ | ------ |
| onExit  | 退出全屏触发 | `() => void` | -      |
| onEnter | 全屏触发     | `() => void` | -      |

## Result

| 参数             | 说明         | 类型         |
| ---------------- | ------------ | ------------ |
| isFullscren      | 是否全屏     | `boolean`    |
| enterFullscreen  | 设置全屏     | `() => void` |
| exitFullscreen   | 退出全屏     | `() => void` |
| toggleFullscreen | 切换全屏     | `() => void` |
| isEnabled        | 是否支持全屏 | `boolean`    |
