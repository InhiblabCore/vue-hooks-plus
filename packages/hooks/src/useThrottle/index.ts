import { Ref, ref, watch } from 'vue'
import useThrottleFn from '../useThrottleFn'

export interface UseThrottleOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

function useThrottle<T>(value: Ref<T>, options?: UseThrottleOptions) {
  const throttled = ref()

  throttled.value = value.value

  const { run } = useThrottleFn(() => {
    throttled.value = value.value
  }, options)

  watch(
    value,
    () => {
      run.value()
    },
    {
      immediate: true,
    },
  )

  return throttled
}

export default useThrottle
