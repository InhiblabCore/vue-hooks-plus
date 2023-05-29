---
map:
  # 映射到docs的路径
  path: /usePreview
  source:
    show: false
---

# usePreview

:::warning Remark

Due to low usage frequency and reliance on security, `v1.7.2` has been deprecated. The following provides packaging ideas.

:::

A hook for previewing the md and vue component views

## Source Show

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

<!-- <demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Preview view"> </demo> -->

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
