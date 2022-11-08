/* eslint-disable no-empty */
import { unref, ref, Ref, UnwrapRef, watchEffect } from 'vue'

export interface IFuncUpdater<T> {
  (previousState?: T): T
}
export interface IFuncStorage {
  (): Storage
}

export interface Options<T> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

export interface OptionsWithDefaultValue<T> extends Options<T> {
  defaultValue: T | IFuncUpdater<T>
}

export type StorageStateResult<T> = [Ref<T> | Ref<undefined>, (value?: T | IFuncUpdater<T>) => void]
export type StorageStateResultHasDefaultValue<T> = [
  Ref<T> | Ref<undefined>,
  (value?: T | IFuncUpdater<T> | undefined) => void,
]

function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function'
}

export function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T>(
    key: Ref<string> | string,
    options?: OptionsWithDefaultValue<T>,
  ): StorageStateResultHasDefaultValue<T>

  function useStorageState<T>(
    key: Ref<string> | string,
    options?: Options<T> & OptionsWithDefaultValue<T>,
  ) {
    let storage: Storage | undefined
    try {
      storage = getStorage()
    } catch (err) {
      console.error(err)
    }

    const serializer = (value: T) => {
      if (options?.serializer) {
        return options?.serializer(value)
      }
      return JSON.stringify(value)
    }

    const deserializer = (value: string) => {
      if (options?.deserializer) {
        return options?.deserializer(value)
      }
      return JSON.parse(value)
    }

    function getStoredValue() {
      try {
        const raw = storage?.getItem(unref(key))
        if (raw) {
          return deserializer(raw)
        }
      } catch (e) {
        console.error(e)
      }
      if (isFunction<IFuncUpdater<T>>(options?.defaultValue)) {
        return options?.defaultValue()
      }
      return options?.defaultValue
    }
    const state = ref<T | undefined>(getStoredValue())
    watchEffect(() => {
      if (key) state.value = getStoredValue()
    })

    const updateState = (value?: T | IFuncUpdater<T>) => {
      if (typeof value === 'undefined') {
        state.value = undefined
        storage?.removeItem(unref(key))
      } else if (isFunction<IFuncUpdater<T>>(value)) {
        const currentState = value(state.value as T)
        try {
          state.value = currentState as UnwrapRef<T>
          storage?.setItem(unref(key), serializer(currentState))
        } catch (e) {
          console.error(e)
        }
      } else {
        try {
          state.value = value as UnwrapRef<T>
          storage?.setItem(unref(key), serializer(value))
        } catch (e) {
          console.error(e)
        }
      }
    }

    return [state, updateState]
  }
  return useStorageState
}
