import debounce from 'lodash/debounce'

export interface DebounceOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

type noop = (...args: any) => any

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  const wait = options?.wait ?? 1000
  const debounced = debounce(fn, wait, options)
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}

export default useDebounceFn
