import Cookies from 'js-cookie'
import { ref } from 'vue'
import { isFunction } from '../utils/isFunction'

export type State = string | undefined

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State)
}

function useCookieState(cookieKey: string, options: Options = {}) {
  const defaultValue = () => {
    const cookieValue = Cookies.get(cookieKey)

    if (typeof cookieValue === 'string') return cookieValue

    if (isFunction(options.defaultValue)) {
      return options.defaultValue()
    }
    return options.defaultValue
  }
  const state = ref(defaultValue())

  const updateState = (
    newValue: State | ((prevState: State) => State),
    newOptions: Cookies.CookieAttributes = {},
  ) => {
    // eslint-disable-next-line no-unused-vars
    const { defaultValue, ...restOptions } = { ...options, ...newOptions }
    const getValue = () => {
      const value = isFunction(newValue) ? newValue(state.value) : newValue
      if (value === undefined) {
        Cookies.remove(cookieKey)
      } else {
        Cookies.set(cookieKey, value, restOptions)
      }
      return value
    }
    state.value = getValue()
  }

  return [state, updateState] as const
}

export default useCookieState
