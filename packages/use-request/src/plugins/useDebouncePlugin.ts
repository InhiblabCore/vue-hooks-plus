import { ref, computed, watchEffect, unref,  } from "vue"
import debounce from "lodash/debounce"
import type { UseRequestPlugin } from "../types"
import type { DebouncedFunc, DebounceSettings } from 'lodash'

const useDebouncePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait },
) => {
  const debouncedRef = ref<DebouncedFunc<any>>()

  const options = computed(() => {
    const ops: DebounceSettings = {
      leading: unref(debounceLeading),
      trailing: unref(debounceTrailing),
      maxWait: unref(debounceMaxWait),
    }

    return ops
  })

  watchEffect(onInvalidate => {
    if (unref(debounceWait)) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)

      debouncedRef.value = debounce(
        (...args: any[]) => {
          return new Promise((resolve, reject) => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject)
          })
        },
        unref(debounceWait),
        options.value,
      )

      onInvalidate(() => {
        debouncedRef.value?.cancel()
      })
    }
  })

  if (!unref(debounceWait)) {
    return {
      name: 'debouncePlugin',
    }
  }

  return {
    name: 'debouncePlugin',
    onCancel: () => {
      // 取消时同时执行 cancel 和 flush，确保不会有遗留的防抖函数
      debouncedRef.value?.cancel()
      debouncedRef.value?.flush()
    },
  }
}

export default useDebouncePlugin
