import { Ref, ref, watch } from 'vue'
import useThrottleFn from '../useThrottleFn'

export interface UseThrottleOptions {
  wait?: number | Ref<number>
  leading?: boolean | Ref<boolean>
  trailing?: boolean | Ref<boolean>
}

function useThrottle<T>(value: Ref<T>, options?: UseThrottleOptions) {
  const throttled = ref<T>() as Ref<T>

  throttled.value = value.value

  const { run } = useThrottleFn(() => {
    throttled.value = value.value
  }, options)

  watch(
    value,
    () => {
      run?.()
    },
    {
      immediate: false,
      flush: 'sync',
    },
  )

  return throttled
}

export default useThrottle
