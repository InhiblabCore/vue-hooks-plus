import { ref, Ref, markRaw } from 'vue-demi'

type UseMapValue<K, T> = Iterable<readonly [K, T]>

type UseMapActions<K, T> = {
  /**
   * Add item
   * @param key K
   * @param value T
   * @returns void
   */
  set: (key: K, value: T) => void

  /**
   * Get item
   * @param key K
   * @param value T
   * @returns undefined
   */
  get: (key: K) => T | undefined

  /**
   *  Remove key
   * @param key K
   * @returns void
   */
  remove: (key: K) => void

  /**
   * Add item
   * @param key K
   * @returns boolean
   */
  has: (key: K) => boolean

  /**
   * clear
   * @returns void
   */
  clear: () => void

  /**
   *  Set a new Map
   * @param newMap UseMapValue<K, T>
   * @returns void
   */
  setAll: (newMap: UseMapValue<K, T>) => void

  /**
   * Reset to default
   * @returns void
   */
  reset: () => void
}

function useMap<K, T>(initialValue?: UseMapValue<K, T>): [Ref<Map<K, T>>, UseMapActions<K, T>] {
  const getInitValue = () => {
    return initialValue ? new Map(initialValue) : new Map()
  }

  const state = ref(getInitValue()) as Ref<Map<K, T>>

  const actions: UseMapActions<K, T> = {
    set: (key, value) => {
      state.value.set(key, value)
    },
    get: key => {
      return state.value.get(key)
    },
    remove: key => {
      state.value.delete(key)
    },
    has: key => state.value.has(key),
    clear: () => state.value.clear(),
    setAll: newMap => {
      state.value = new Map(newMap)
    },
    reset: () => (state.value = getInitValue()),
  }

  return [state, markRaw(actions)]
}

export default useMap
