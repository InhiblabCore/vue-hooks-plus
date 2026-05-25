import { throttle, type DebouncedFunc } from 'es-toolkit/compat'
import { onScopeDispose, watch, unref, computed, ref } from 'vue'
import { UseThrottleOptions } from '../useThrottle'

type noop = (...args: any) => any

function useThrottleFn<T extends noop>(fn: T, options?: UseThrottleOptions) {
  const throttledRef = ref<DebouncedFunc<T>>()
  const throttleOptions = computed(() => {
    return {
      wait: unref(options?.wait) ?? 1000,
      leading: unref(options?.leading),
      trailing: unref(options?.trailing),
    }
  })

  watch(throttleOptions, (cur) => {
    throttledRef.value?.cancel()
    const settings: {
      leading?: boolean
      trailing?: boolean
    } = {}
    if (cur.leading !== undefined) settings.leading = cur.leading
    if (cur.trailing !== undefined) settings.trailing = cur.trailing
    throttledRef.value = throttle(fn, cur.wait, settings)
  }, {
    immediate: true,
    flush: 'sync',
  })

  onScopeDispose(() => {
    throttledRef.value?.cancel()
  })

  return {
    run: ((...args: Parameters<T>) => throttledRef.value?.(...args)) as T,
    cancel: () => throttledRef.value?.cancel(),
    flush: () => throttledRef.value?.flush(),
  }
}

export default useThrottleFn
