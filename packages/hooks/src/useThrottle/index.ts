import { Ref, ref, watch } from 'vue'
import useThrottleFn from '../useThrottleFn'

export interface UseThrottleOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

function useThrottle<T>(value: Ref<T>, options?: UseThrottleOptions) {
  const throttled = ref<T>(value.value) as Ref<T>;
  const { run } = useThrottleFn(() => (throttled.value = value.value), options);
  watch(value, () => run(), { deep: true });
  return throttled;

}

export default useThrottle
