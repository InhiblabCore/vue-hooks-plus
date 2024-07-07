import { ref, Ref, markRaw, readonly, UnwrapRef } from 'vue'

interface UseSetActions<T> {
  add: (value: T) => void
  remove: (value: T) => void
  has: (value: T) => boolean
  clear: () => void
  reset: () => void
}

function useSet<T = any>(
  initialValue?: UnwrapRef<T>[],
): [Readonly<Ref<Set<UnwrapRef<T>>>>, UseSetActions<UnwrapRef<T>>]

function useSet<T = any>(initialValue?: UnwrapRef<T>[]) {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<UnwrapRef<T>>() : new Set(initialValue)
  }
  const state = ref(getInitValue())

  const actions: UseSetActions<UnwrapRef<T>> = {
    /**
     *  Add item
     * @param value T
     */
    add: value => {
      state.value.add(value)
    },

    /**
     *  Remove item
     * @param value T
     */
    remove: value => {
      state.value.delete(value)
    },

    /**
     * Set has
     * @param value T
     */
    has: value => state.value.has(value),

    /**
     * Clear Set
     */
    clear: () => state.value.clear(),

    /**
     * Reset to default
     */
    reset: () => {
      state.value = getInitValue()
    },
  }

  return [readonly(state), markRaw(actions)]
}

export default useSet
