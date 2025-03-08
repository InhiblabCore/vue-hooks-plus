import throttle from 'lodash/throttle'
import { UseThrottleOptions } from '../useThrottle'

type noop = (...args: any) => any

function useThrottleFn<T extends noop>(fn: T, options?: UseThrottleOptions) {

  const wait = options?.wait ?? 1000
  const throttled = throttle(fn, wait, options)

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  }
}

export default useThrottleFn
