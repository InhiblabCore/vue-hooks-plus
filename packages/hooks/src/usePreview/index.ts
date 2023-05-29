/**
 * Due to low usage frequency and reliance on security, `v1.7.2` has been deprecated.
 */
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
