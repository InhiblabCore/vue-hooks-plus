import { Ref } from 'vue'
import {
  UseRequestFetchState,
  UseRequestOptions,
  UseRequestPluginReturn,
  UseRequestService,
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

  constructor(
    public serviceRef: Ref<UseRequestService<TData, TParams>>,
    public options: UseRequestOptions<TData, TParams, any>,
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

  // 设置state
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

  // 遍历需要运行的插件，是一个回调函数，供插件获取fetch实例和在对应节点执行插件逻辑
  runPluginHandler(event: keyof UseRequestPluginReturn<TData, TParams>, ...rest: unknown[]) {
    // @ts-ignore
    const r = (this.pluginImpls?.map(i => i[event]?.(...rest)) ?? [])?.filter(Boolean)
    // @ts-ignore
    return Object.assign({}, ...r)
  }

  // 异步请求
  // @ts-ignore
  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1
    const currentCount = this.count
    const { stopNow = false, returnNow = false, ...state } = this.runPluginHandler(
      'onBefore',
      params,
    )
    // 是否停止请求
    if (stopNow) {
      return new Promise(() => { })
    }

    this.setState({
      loading: true,
      params,
      ...state,
    })

    // 是否立刻返回
    if (returnNow) {
      return Promise.resolve(state.data)
    }

    // 请求前返回
    this.options.onBefore?.(params)

    try {
      // replace service 开始请求，如果含有onRequest事件名
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.value, params)

      const requestReturnResponse = (res: any) => {
        // 取消了请求，count将与currentCount不一致，将发送空请求
        if (currentCount !== this.count) {
          return new Promise(() => { })
        }
        // 格式化数据
        const formattedResult = this.options.formatResult ? this.options.formatResult(res) : res

        this.setState({
          data: formattedResult,
          error: undefined,
          loading: false,
        })
        // 请求成功
        this.options.onSuccess?.(formattedResult, params)

        this.runPluginHandler('onSuccess', formattedResult, params)

        // 无论请求成功还是失败都执行
        this.options.onFinally?.(params, formattedResult, undefined)

        if (currentCount === this.count) {
          this.runPluginHandler('onFinally', params, formattedResult, undefined)
        }

        return formattedResult
      }

      if (!servicePromise) {
        /** 自动依赖收集 */
        // if (!this.options.manual && this.options.refreshDeps === true) {
        //   watchEffect(async () => {
        //     if (unref(this.options.ready)) {
        //       this.setFetchState(true, 'loading')
        //       servicePromise = this.serviceRef.value(...params)
        //       const servicePromiseResult = await servicePromise
        //       return requestReturnResponse(servicePromiseResult)
        //     }
        //   })
        // } else {
        //   servicePromise = this.serviceRef.value(...params)
        // }
        servicePromise = this.serviceRef.value(...params)
      }
      // servicePromise = this.serviceRef.value(...params)
      const servicePromiseResult = await servicePromise
      return requestReturnResponse(servicePromiseResult)
    } catch (error) {
      if (currentCount !== this.count) {
        return new Promise(() => { })
      }

      this.setState({
        error,
        loading: false,
      })

      this.options.onError?.(error as Error, params)
      this.runPluginHandler('onError', error, params)

      // 无论请求成功还是失败都执行
      this.options.onFinally?.(params, undefined, error as Error)

      if (currentCount === this.count) {
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
    let targetData: TData | undefined
    if (typeof data === 'function') {
      // @ts-ignore
      targetData = data?.(this.state.data)
    } else {
      targetData = data
    }

    this.runPluginHandler('onMutate', targetData)
    this.setState({
      data: targetData,
    })
  }
}
