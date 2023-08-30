---
map:
  # 映射到docs的路径
  path: /useMutationObserver
---

# useMutationObserver

监听 DOM 树修改。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="使用 ref 设置需要监听的元素。"> </demo>

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

| 参数     | 说明                  | 类型                                          | 默认值 |
| -------- | --------------------- | --------------------------------------------- | ------ |
| target   | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `JSX.Element` | -      |
| callback | callback 函数         | `MutationCallback`                            | -      |
| options  | 额外的配置项          | `UseMutationObserverOptions`                  | -      |

## Options

见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver) 详细配置项
