import { computed, watchEffect, unref, } from "vue"
import type { UseRequestPlugin } from "../types"
import type { DebounceSettings } from 'lodash'
import useDebounceFn from "../../useDebounceFn"


const useDebouncePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait },
) => {
  const options = computed(() => {
    const ops: DebounceSettings = {
      leading: unref(debounceLeading),
      trailing: unref(debounceTrailing),
      maxWait: unref(debounceMaxWait),
    }

    return ops
  })

  const { run, cancel, flush } = useDebounceFn(callback => {
    callback()
    unref(debounceWait) ?? 0,
      options.value
  })

  watchEffect(onInvalidate => {
    if (unref(debounceWait)) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          run(() => _originRunAsync(...args).then(resolve).catch(reject))
        })
      }
      onInvalidate(() => {
        cancel()
        fetchInstance.runAsync = _originRunAsync
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
      cancel()
      flush()
    },
  }
}

export default useDebouncePlugin
