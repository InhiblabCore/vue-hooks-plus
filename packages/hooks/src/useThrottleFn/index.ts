// @ts-nocheck
import throttle from 'lodash-es/throttle'
import { onUnmounted, watch, ref, unref, computed } from 'vue'
import { UseThrottleOptions } from '../useThrottle'
import { DebouncedFunc } from 'lodash-es'

type noop = (...args: any) => any

function useThrottleFn<T extends noop>(fn: T, options?: UseThrottleOptions) {
  let originThrottled: DebouncedFunc<T>

  const throttled = ref<DebouncedFunc<T>>()
  const throttleOptions = computed(() => {
    const ret: UseThrottleOptions = {}
    if (unref(options?.wait) !== undefined) {
      ret.wait = unref(options?.wait)
    }
    if (unref(options?.leading) !== undefined) {
      ret.leading = unref(options?.leading)
    }
    if (unref(options?.trailing) !== undefined) {
      ret.trailing = unref(options?.trailing)
    }
    return {
      ...ret,
      wait: ret?.wait ?? 1000,
    }
  })

  watch(throttleOptions, (cur) => {
    const { wait = 1000, ...options } = cur
    if (originThrottled) {
      originThrottled.cancel()
      originThrottled.flush()
    }
    const _throttle = throttle(
      (...args: Parameters<T>): ReturnType<T> => {
        return fn([...args])
      },
      wait,
      options,
    )
    originThrottled = _throttle
    throttled.value = _throttle
  }, {
    immediate: true,
    deep: true,
  })

  onUnmounted(() => {
    throttled.value?.cancel()
  })

  return {
    run: throttled.value ?? (() => { }),
    cancel: throttled.value?.cancel,
    flush: throttled.value?.flush,
  }
}

export default useThrottleFn
