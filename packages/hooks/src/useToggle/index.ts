import { computed, Ref, ref, UnwrapRef } from 'vue'

export interface UseToggleActions<T> {
  setLeft: () => void
  setRight: () => void
  set: (value: T) => void
  toggle: () => void
}

function useToggle<T = boolean>(): [Ref<T>, UseToggleActions<T>]
function useToggle<T = boolean>(defaultValue: T): [Ref<T>, UseToggleActions<T>]
function useToggle<T, U>(defaultValue: T, reverseValue: U): [Ref<T | U>, UseToggleActions<T | U>]

function useToggle<D, R>(defaultValue: D = (false as unknown) as D, reverseValue?: R) {
  const state = ref<D | R>(defaultValue)

  const actions = computed(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as
      | UnwrapRef<D>
      | UnwrapRef<R>

    const toggle = () => {
      state.value =
        state.value === defaultValue ? reverseValueOrigin : (defaultValue as UnwrapRef<D>)
    }
    const set = (value: UnwrapRef<D> | UnwrapRef<R>) => (state.value = value)
    const setLeft = () => (state.value = defaultValue as UnwrapRef<D>)
    const setRight = () => (state.value = reverseValueOrigin as UnwrapRef<D> | UnwrapRef<R>)

    return {
      toggle,
      set,
      setLeft,
      setRight,
    }
  })

  return [state, { ...actions.value }]
}
export default useToggle
