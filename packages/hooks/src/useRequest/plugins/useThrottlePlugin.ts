import { computed, onUnmounted, ref, unref, watch } from 'vue'
import { type DebouncedFunc, type ThrottleSettings } from 'lodash-es'
import { throttle } from 'lodash-es'
import { UseRequestPlugin } from '../types'

const useThrottlePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {

  let originThrottled: DebouncedFunc<any> | null = null

  const options = computed(() => {
    const ret: ThrottleSettings = {}
    if (unref(throttleLeading) !== undefined) {
      ret.leading = unref(throttleLeading)
    }
    if (unref(throttleTrailing) !== undefined) {
      ret.trailing = unref(throttleTrailing)
    }
    return ret
  })

  const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)
  const throttled = ref<DebouncedFunc<any>>()

  watch([throttleWait, options], (cur) => {
    if (originThrottled) {
      originThrottled.cancel()
      fetchInstance.runAsync = _originRunAsync
    }
    const [curWait, curOptions] = cur
    const _throttle = throttle(
      (callback: any) => {
        callback()
      },
      // @ts-ignore
      unref(curWait),
      // @ts-ignore
      curOptions,
    )
    originThrottled = _throttle
    throttled.value = _throttle
    fetchInstance.runAsync = (...args) => {
      return new Promise((resolve, reject) => {
        throttled.value?.(() => {
          _originRunAsync(...args)
            .then(resolve)
            .catch(reject)
        })
      })
    }
  }, {
    immediate: true,
  })

  if (!unref(throttleWait)) {
    return {}
  }

  onUnmounted(() => {
    throttled.value?.cancel()
  })

  return {
    name: "throttlePlugin",
    onCancel: () => {
      throttled.value?.cancel()
    },
  }
}

export default useThrottlePlugin
