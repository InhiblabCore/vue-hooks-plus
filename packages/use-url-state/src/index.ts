/**
 * Will be deprecated in version 1.7.6
 * Will be replaced by a vue router
 */
import qs from 'qs'
import { Ref, ref, watch, watchEffect } from 'vue'
import useLocalStorageState from 'vue-hooks-plus/es/useLocalStorageState'

const isFunction = (value: unknown): value is Function => typeof value === 'function'

export interface UseUrlStateOptions {
  localStorageKey?: string
  detectNumber?: boolean
  routerPush?: (url: string) => void
}

interface UrlState {
  [key: string]: any
}

function encodeParams(value: UrlState): string {
  return qs.stringify(value)
}

function decodeParams(valueStr: string, detectNumber: boolean): Record<string, unknown> {
  return qs.parse(valueStr, {
    // fix: 数组长度限制问题
    arrayLimit: 10000,
    decoder(str: string, _: any, charset: string) {
      const strWithoutPlus = str.replace(/\+/g, ' ')
      if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape)
      }

      if (detectNumber && /^[+-]?\d+(\.\d+)?$/.test(str)) {
        return parseFloat(str)
      }

      const keywords: Record<string, any> = {
        true: true,
        false: false,
        null: null,
        undefined,
      }
      if (str in keywords) {
        return keywords[str]
      }

      // utf-8
      try {
        return decodeURIComponent(strWithoutPlus)
      } catch (e) {
        return strWithoutPlus
      }
    },
  })
}

function useUrlState<S extends UrlState = Partial<UrlState>>(
  initialState?: S | (() => S),
  options?: UseUrlStateOptions,
): Ref<S> {
  const routerPushFn = options?.routerPush ? options.routerPush : (s: string) => (location.hash = s)
  const { localStorageKey, detectNumber = true } = options ?? {}

  const [path, paramsStr] = location.hash.slice(1).split('?')

  const defaultState = (isFunction(initialState) ? initialState() : initialState) ?? ({} as S)

  const state_ = (localStorageKey
    ? useLocalStorageState(localStorageKey, {
      defaultValue: defaultState,
    })[0]
    : ref(defaultState)) as Ref<S>

  const state = ref<S>() as Ref<S>

  watchEffect(() => {
    state.value = state_.value
  })

  // 初始状态 url > localstorage
  if (paramsStr) {
    try {
      const paramsValue = decodeParams(paramsStr, detectNumber)

      state.value = {
        ...defaultState,
        ...state.value,
        ...paramsValue,
      }
    } catch {
      state.value = defaultState
    }
  }

  // 去掉多余的key
  if (initialState && Object.keys(initialState).length) {
    const newState = { ...initialState } as any
    if (state.value)
      for (const key in newState) {
        if (key in state.value) {
          newState[key] = state.value[key]
        }
      }
    state.value = newState
  }

  // 把params写到url
  watch(
    state,
    () => {
      if (state.value) {
        const newParamsStr = encodeParams(state.value)
        routerPushFn(`${path}?${newParamsStr}`)
      }
    },
    {
      deep: true,
      immediate: true,
    },
  )

  return state
}

export default useUrlState
