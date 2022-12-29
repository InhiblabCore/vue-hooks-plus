import { ComputedRef, Ref, ref, watchEffect } from 'vue'

export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean
const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b)

function usePrevious<T>(
  state: Ref<T> | ComputedRef<T>,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
) {
  const prevRef = ref<T>()
  const curRef = ref<T>()

  watchEffect(() => {
    if (shouldUpdate(curRef.value, state.value)) {
      prevRef.value = curRef.value
      curRef.value = state.value
    }
  })

  return prevRef
}

export default usePrevious
