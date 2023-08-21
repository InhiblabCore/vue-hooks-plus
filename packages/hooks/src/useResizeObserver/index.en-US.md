---
map:
  # 映射到docs的路径
  path: /useResizeObserver
---

# useResizeObserver

Dynamically get the size change of Dom elements.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Use ref to set element that needs monitoring."> </demo>

## API

```typescript
useResizeObserver(target, callback, {
  box: UseResizeObserverOptions,
})
```

## Params

| 参数     | 说明              | 类型                                          | 默认值 |
| -------- | ----------------- | --------------------------------------------- | ------ |
| target   | DOM or Ref        | `() => Element` \| `Element` \| `JSX.Element` | -      |
| callback | callback function | `ResizeObserverCallback`                      | -      |
| options  | configuration     | `UseResizeObserverOptions`                    | -      |

## Options

| 参数 | 说明      | 类型                       | 默认值      |
| ---- | --------- | -------------------------- | ----------- |
| box  | box model | `ResizeObserverBoxOptions` | content-box |
