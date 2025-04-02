import { ref, Ref, markRaw, readonly } from 'vue'

interface UseSetActions<T> {
  add: (value: T) => void
  remove: (value: T) => void
  has: (value: T) => boolean
  clear: () => void
  reset: () => void
}

function useSet<T = any>(initialValue?: T[]): [Readonly<Ref<Set<T>>>, UseSetActions<T>]

function useSet<T = any>(initialValue?: T[]) {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<T>() : new Set(initialValue)
  }
  const state = ref(getInitValue())

  const actions: UseSetActions<T> = {
    /**
     *  Add item
     * @param value T
     */
    add: (value: T) => {
      // @ts-ignore
      state.value.add(value)
    },

    /**
     *  Remove item
     * @param value T
     */
    remove: (value: T) => {
      // @ts-ignore
      state.value.delete(value)
    },

    /**
     * Set has
     * @param value T
     */
    // @ts-ignore
    has: (value: T) => state.value.has(value),

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
