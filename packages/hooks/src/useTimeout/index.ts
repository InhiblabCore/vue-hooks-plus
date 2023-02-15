import { watchEffect, Ref, unref } from 'vue-demi'

function useTimeout(
  fn: () => void,
  delay: Ref<number | undefined> | number | undefined,
  options?: {
    immediate?: boolean
  },
) {
  const immediate = options?.immediate

  if (immediate) {
    fn()
  }

  watchEffect(onInvalidate => {
    if (unref(delay) === undefined || typeof unref(delay) !== 'number' || unref(delay)! < 0) return
    const _deply = unref(delay)
    const timer = setTimeout(() => {
      fn()
    }, _deply)
    onInvalidate(() => {
      clearInterval(timer)
    })
  })
}

export default useTimeout
