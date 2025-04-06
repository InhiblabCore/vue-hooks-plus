import debounce from 'lodash-es/debounce'
import { onUnmounted, ref, watch } from 'vue'

export interface DebounceOptions {
  /**
   * The number of milliseconds to delay.
   */
  wait?: number

  /**
   * Specify invoking on the leading edge of the timeout.
   */
  leading?: boolean

  /**
   * Specify invoking on the trailing edge of the timeout.
   */
  trailing?: boolean

  /**
   * The maximum time func is allowed to be delayed before it’s invoked.
   */
  maxWait?: number
}

type noop = (...args: any) => any

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {

  const optionsRef = ref(options || { wait: 1000 });
  const debouncedRef = ref<ReturnType<typeof debounce>>();

  const createDebounced = () => {
    const { wait = 1000, ...rest } = optionsRef.value;
    return debounce(fn, wait, rest);
  };
  debouncedRef.value = createDebounced();
  watch(
    () => ({ ...optionsRef.value }),
    (newVal, oldVal) => {
      if (
        newVal.wait !== oldVal?.wait ||
        newVal.maxWait !== oldVal?.maxWait
      ) {
        debouncedRef.value?.cancel();
        debouncedRef.value = createDebounced();
      }
    },
    { deep: true }
  );


  onUnmounted(() => {
    debouncedRef.value?.cancel();
  });

  return {
    /**
     * Invode and pass parameters to fn.
     * `(...args: any[]) => any`
     */
    run: ((...args: any[]) => {
      return debouncedRef.value?.(...args);
    }) as T,

    /**
     * Cancel the invocation of currently debounced function.
     *  `() => void`
     */
    cancel: () => {
      debouncedRef.value?.cancel();
    },

    /**
     * Immediately invoke currently debounced function.
     *  `() => void`
     */
    flush: () => {
      debouncedRef.value?.flush();
    },
    updateOptions: (newOptions: DebounceOptions) => {
      optionsRef.value = newOptions;
    }
  }
}

export default useDebounceFn
