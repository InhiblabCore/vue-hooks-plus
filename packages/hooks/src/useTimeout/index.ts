import { watchEffect, Ref, unref } from 'vue'

function useTimeout(
  fn: () => void,
  delay?: Ref<number | undefined> | number,
  options?: {
    immediate?: boolean
  },
) {
  const immediate = options?.immediate
  if (immediate) {
    fn()
  }

  watchEffect(onInvalidate => {
    if (unref(delay)) {
      if (typeof unref(delay) !== 'number' || unref(delay)! < 0) return
    }
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
