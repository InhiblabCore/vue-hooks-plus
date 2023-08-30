---
map:
  # 映射到docs的路径
  path: /useMutationObserver
---

# useMutationObserver

Listen for DOM tree modifications.

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Use ref to set element that needs monitoring."> </demo>

## API

```typescript
useMutationObserver(target, callback, {
  attributeFilter: string[],
  attributeOldValue: boolean,
  attributes: boolean,
  characterData: boolean,
  characterDataOldValue: boolean,
  childList: boolean,
  subtree: boolean,
})
```

## Params

| 参数     | 说明              | 类型                                          | 默认值 |
| -------- | ----------------- | --------------------------------------------- | ------ |
| target   | DOM or Ref        | `() => Element` \| `Element` \| `JSX.Element` | -      |
| callback | callback function | `MutationCallback`                            | -      |
| options  | configuration     | `UseMutationObserverOptions`                  | -      |

## Options

To see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver)
