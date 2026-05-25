import { debounce, type DebouncedFunc } from 'es-toolkit/compat'
import { computed, onScopeDispose, Ref, ref, unref, watch } from 'vue'

export interface DebounceOptions {
  /**
   * The number of milliseconds to delay.
   */
  wait?: number | Ref<number, number>

  /**
   * Specify invoking on the leading edge of the timeout.
   */
  leading?: boolean | Ref<boolean, boolean>

  /**
   * Specify invoking on the trailing edge of the timeout.
   */
  trailing?: boolean | Ref<boolean, boolean>

  /**
   * The maximum time func is allowed to be delayed before it’s invoked.
   */
  maxWait?: number | Ref<number, number>
}

type noop = (...args: any) => any

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  const optionsRef = ref(options ?? { wait: 1000 })
  const resolvedOptions = computed(() => ({
    wait: unref(optionsRef.value.wait) ?? 1000,
    leading: unref(optionsRef.value.leading),
    trailing: unref(optionsRef.value.trailing),
    maxWait: unref(optionsRef.value.maxWait),
  }))
  const debouncedRef = ref<DebouncedFunc<T>>()

  const createDebounced = () => {
    const { wait, leading, trailing, maxWait } = resolvedOptions.value
    const settings: {
      leading?: boolean
      trailing?: boolean
      maxWait?: number
    } = {}
    if (leading !== undefined) settings.leading = leading
    if (trailing !== undefined) settings.trailing = trailing
    if (maxWait !== undefined) settings.maxWait = maxWait
    return debounce(fn, wait, settings)
  }

  debouncedRef.value = createDebounced()
  watch(
    resolvedOptions,
    () => {
      debouncedRef.value?.cancel()
      debouncedRef.value = createDebounced()
    },
    { flush: 'sync' },
  )

  onScopeDispose(() => {
    debouncedRef.value?.cancel()
  })

  return {
    /**
     * Invode and pass parameters to fn.
     * `(...args: any[]) => any`
     */
    run: ((...args: Parameters<T>) => {
      return debouncedRef.value?.(...args)
    }) as T,

    /**
     * Cancel the invocation of currently debounced function.
     *  `() => void`
     */
    cancel: () => {
      debouncedRef.value?.cancel()
    },

    /**
     * Immediately invoke currently debounced function.
     *  `() => void`
     */
    flush: () => {
      return debouncedRef.value?.flush()
    },
    updateOptions: (newOptions: DebounceOptions) => {
      optionsRef.value = newOptions
    },
  }
}

export default useDebounceFn
