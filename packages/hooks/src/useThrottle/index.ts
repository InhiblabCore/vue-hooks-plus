import { ref, watch } from "vue";
import useThrottleFn from "../useThrottleFn";

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const throttled = ref(value);

  const { run } = useThrottleFn(() => {
    throttled.value = value as any;
  }, options);

  watch(throttled, () => {
    run.value();
  });

  return throttled;
}

export default useThrottle;
