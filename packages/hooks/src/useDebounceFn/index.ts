import { debounce } from 'lodash-es'

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
  const wait = options?.wait ?? 1000
  const debounced = debounce(fn, wait, options)
  return {
    /**
     * Invode and pass parameters to fn.
     * `(...args: any[]) => any`
     */
    run: debounced,

    /**
     * Cancel the invocation of currently debounced function.
     *  `() => void`
     */
    cancel: debounced.cancel,

    /**
     * Immediately invoke currently debounced function.
     *  `() => void`
     */
    flush: debounced.flush,
  }
}

export default useDebounceFn
