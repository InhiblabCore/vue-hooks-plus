import { throttle } from 'lodash-es'
import { onUnmounted, ref, computed } from 'vue'
import { UseThrottleOptions } from '../useThrottle'

type noop = (...args: any) => any

function useThrottleFn<T extends noop>(fn: T, options?: UseThrottleOptions) {
  const fnRef = ref(fn)

  const wait = options?.wait ?? 1000

  const throttled = computed(() =>
    throttle(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.value([...args])
      },
      wait,
      options,
    ),
  )

  onUnmounted(() => {
    throttled.value.cancel()
  })

  return {
    run: throttled,
    cancel: throttled.value.cancel,
    flush: throttled.value.flush,
  }
}

export default useThrottleFn
