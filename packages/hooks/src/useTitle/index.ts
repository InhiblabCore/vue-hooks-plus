import { ref, Ref, onUnmounted, onMounted, watch, isRef, unref } from 'vue'

import isBrowser from '../utils/isBrowser'

export interface Options {
  restoreOnUnmount?: boolean
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
}

function useTitle(title: Ref<string> | string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = ref(isBrowser ? document.title : '')
  if (isRef(title)) {
    watch(title, () => {
      document.title = title.value
    })
  } else document.title = title

  onMounted(() => {
    document.title = unref(title)
  })

  onUnmounted(() => {
    if (options.restoreOnUnmount) {
      document.title = unref(titleRef)
    }
  })
}

export default useTitle
