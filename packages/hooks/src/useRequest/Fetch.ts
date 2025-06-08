import { Ref } from 'vue'
import { isFunction, isBoolean } from './utils'
import {
  UseRequestFetchState,
  UseRequestOptions,
  UseRequestPluginReturn,
  UseRequestService,
  UseRequestOptionsWithFormatResult,
  UseRequestOptionsWithInitialData,
} from './types'

export default class Fetch<TData, TParams extends unknown[] = any> {
  pluginImpls: UseRequestPluginReturn<TData, TParams>[] | undefined

  count = 0

  state: UseRequestFetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  }

  previousValidData: UseRequestFetchState<TData, TParams>['data'] = undefined

  constructor(
    public serviceRef: Ref<UseRequestService<TData, TParams>>,
    public options: Partial<
      UseRequestOptions<TData, TParams, any> &
      UseRequestOptionsWithFormatResult<TData, TParams, any, any>
      &
      UseRequestOptionsWithInitialData<TData, TParams, any>
    >,
    public setUpdateData: (
      currentState: unknown,
      key?: keyof UseRequestFetchState<TData, TParams>,
    ) => void,
    public initState: Partial<UseRequestFetchState<TData, TParams>> = {},
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    }
  }

  /**
   * set state
   * @param currentState currentState
   */
  setState(currentState: Partial<UseRequestFetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...currentState,
    }
    this.setUpdateData(this.state)
  }

  /**
   * should rename
   * @param data Result value `unknown`
   * @param key Result key `data`| `params` | `loading`| `error`
   */
  setData(
    data: unknown,
    key?:
      | keyof UseRequestFetchState<TData, TParams>
      | (keyof UseRequestFetchState<TData, TParams>)[],
  ) {
    console.warn("Please use 'setFetchState' instead of 'setData'")
    if (key instanceof Array) {
      key.forEach(k => {
        this.state[k as keyof UseRequestFetchState<TData, TParams>] = data as any
        this.setUpdateData(data, k)
      })
    } else {
      this.state[key as keyof UseRequestFetchState<TData, TParams>] = data as any
      this.setUpdateData(data, key)
    }
  }

  /**
   *
   * @param data Result value `unknown`
   * @param key Result key `data`| `params` | `loading`| `error`
   */
  setFetchState(
    data: unknown,
    key?:
      | keyof UseRequestFetchState<TData, TParams>
      | (keyof UseRequestFetchState<TData, TParams>)[],
  ) {
    if (key instanceof Array) {
      key.forEach(k => {
        this.state[k as keyof UseRequestFetchState<TData, TParams>] = data as any
        this.setUpdateData(data, k)
      })
    } else {
      this.state[key as keyof UseRequestFetchState<TData, TParams>] = data as any
      this.setUpdateData(data, key)
    }
  }

  /**
   * Traverse the plugin that needs to be run,
   * which is a callback function for the plugin to obtain fetch instances and execute plugin logic at the corresponding nodes.
   */
  runPluginHandler(event: keyof UseRequestPluginReturn<TData, TParams>, ...rest: unknown[]) {
    // @ts-ignore
    const r = (this.pluginImpls?.map(i => i[event]?.(...rest)) ?? [])?.filter(Boolean)
    // @ts-ignore
    return Object.assign({}, ...r)
  }

  // Asynchronous request
  // @ts-ignore
  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1
    const currentCount = this.count
    const { stopNow = false, returnNow = false, ...state } = this.runPluginHandler(
      'onBefore',
      params,
    )
    // Do you want to stop the request
    if (stopNow) {
      return new Promise(() => { })
    }

    this.setState({
      loading: true,
      params,
      ...state,
    })

    // Do you want to return immediately
    if (returnNow) {
      return Promise.resolve(state.data)
    }

    // The 'onBefore' configuration item error no longer interrupts the entire code flow
    try {
      // Return before request
      this.options.onBefore?.(params)
    } catch (error) {
      // The 'onBefore' configuration item error no longer interrupts the entire code flow
      this.setState({
        error,
        loading: false,
      })
      this.options.onError?.(error as Error, params)
      this.runPluginHandler('onError', error, params)

      // Manually intercept the error and return a Promise with an empty status
      return new Promise(() => { })
    }

    try {
      // Start the request with the replace service, if it contains the onRequest event name
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.value, params)

      const requestReturnResponse = (res: any) => {
        // 如果不允许并发请求，则检查是否需要取消当前请求
        if (!this.options.concurrent && currentCount !== this.count) {
          return new Promise(() => { })
        }
        // Format data
        const formattedResult = this.options.formatResult ? this.options.formatResult(res) : res

        const origin = {
          data: res,
        }
        this.setState({
          data: formattedResult,
          error: undefined,
          loading: false,
        })
        // Request successful
        this.options.onSuccess?.(formattedResult, params)
        this.runPluginHandler('onSuccess', formattedResult, params, origin)

        this.previousValidData = formattedResult

        // Execute whether the request is successful or unsuccessful
        this.options.onFinally?.(params, formattedResult, undefined)

        if (this.options.concurrent || currentCount === this.count) {
          this.runPluginHandler('onFinally', params, formattedResult, undefined)
        }

        return formattedResult
      }

      if (!servicePromise) {
        servicePromise = this.serviceRef.value(...params)
      }
      const servicePromiseResult = await servicePromise
      return requestReturnResponse(servicePromiseResult)
    } catch (error) {
      // 如果不允许并发请求，则检查是否需要取消当前请求
      if (!this.options.concurrent && currentCount !== this.count) {
        return new Promise(() => { })
      }

      this.setState({
        error,
        loading: false,
      })

      this.options.onError?.(error as Error, params)
      this.runPluginHandler('onError', error, params)

      // rollback
      if (
        (isFunction(this.options?.rollbackOnError) && this.options?.rollbackOnError(params)) ||
        (isBoolean(this.options?.rollbackOnError) && this.options.rollbackOnError)
      ) {
        this.setState({
          data: this.previousValidData,
        })
      }

      // Execute whether the request is successful or unsuccessful
      this.options.onFinally?.(params, undefined, error as Error)

      if (this.options.concurrent || currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error)
      }

      throw error
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch(error => {
      if (!this.options.onError) {
        console.error(error)
      }
    })
  }

  cancel() {
    this.count += 1
    this.setState({
      loading: false,
    })

    this.runPluginHandler('onCancel')
  }

  refresh() {
    this.run(...((this.state.params || []) as TParams))
  }

  refreshAsync() {
    return this.runAsync(...((this.state.params || []) as TParams))
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    const targetData = isFunction(data) ? data(this.state.data) : data
    this.runPluginHandler('onMutate', targetData)
    this.setState({
      data: targetData,
    })
  }
}
