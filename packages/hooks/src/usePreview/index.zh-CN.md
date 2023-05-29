---
map:
  # 映射到docs的路径
  path: /usePreview
---

# usePreview

:::warning 注意

由于使用频率低和依赖的安全性，`v1.7.2 已弃用`。以下给予封装思路。

:::

用于预览 md 和 vue 组件视图的 hook

## 源码展示

```typescript
import { marked } from 'marked'
import { Ref, computed, unref, ref, watchEffect, createApp, VueElement } from 'vue'

export default function usePreview(
  md: Parameters<typeof createApp> | Ref<string> | string | VueElement,
) {
  const container = ref<Element>()
  const mdCompute = computed(() => unref(md))

  watchEffect(onInvalidate => {
    if (mdCompute.value && container.value) {
      try {
        if (typeof mdCompute.value === 'string') {
          const html = marked.parse(mdCompute.value)
          if (html) container.value.innerHTML = html
        } else {
          const app = createApp(mdCompute.value)
          app.mount(container.value)
        }
      } catch (error) {
        console.log(error)
      }
    }

    onInvalidate(() => {
      if (container.value) container.value.innerHTML = ''
    })
  })

  return {
    container,
  }
}
```

<!--
<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="预览视图"> </demo> -->

## API

```typescript
const { container } = usePreview(target)
```

## Params

| 参数   | 说明             | 类型                                        |
| ------ | ---------------- | ------------------------------------------- |
| target | DOM 节点或者 Ref | `VueComponent` \| `string` \| `JSX.Element` |

## Result

| 参数      | 说明             | 类型                                          |
| --------- | ---------------- | --------------------------------------------- |
| container | DOM 节点或者 Ref | `Element` \| `() => Element` \| `JSX.Element` |
