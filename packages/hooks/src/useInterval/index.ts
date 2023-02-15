import { watchEffect, ref, Ref, isRef, unref } from 'vue'

function useInterval(
  /**
   * The function to be executed every `delay` milliseconds.
   */
  fn: () => void,

  /**
   * The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if delay is set to `undefined`.
   */
  delay: Ref<number | undefined> | number | undefined,
  options?: {
    /**
     * Whether the function should be executed immediately on first execution.
     */
    immediate?: boolean
  },
): void {
  const immediate = options?.immediate

  const fnRef = ref(fn)

  watchEffect(onInvalidate => {
    if (isRef(delay)) {
      if (typeof delay.value !== 'number' || delay.value < 0) return
    } else {
      if (typeof delay !== 'number' || delay < 0) return
    }
    if (immediate) {
      fnRef.value()
    }
    const _deply = unref(delay)
    const timer = setInterval(() => {
      fnRef.value()
    }, _deply)
    onInvalidate(() => {
      clearInterval(timer)
    })
  })
}

export default useInterval
