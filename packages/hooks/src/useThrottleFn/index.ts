import throttle from "lodash/throttle";
import { onUnmounted, ref, computed } from "vue";
import type { ThrottleOptions } from "../useThrottle";

type noop = (...args: any) => any;

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  const fnRef = ref(fn);

  const wait = options?.wait ?? 1000;

  const throttled = computed(() =>
    throttle(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.value([...args]);
      },
      wait,
      options
    )
  );

  onUnmounted(() => {
    throttled.value.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.value.cancel,
    flush: throttled.value.flush,
  };
}

export default useThrottleFn;
