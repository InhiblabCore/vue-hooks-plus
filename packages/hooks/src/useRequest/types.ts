import { Ref, watch } from 'vue'
import { CachedData } from './utils/cache'
import UseRequestFetch from './Fetch'

export type UseRequestService<TData, TParams extends unknown[]> = (
  ...args: TParams
) => Promise<TData>

export type UseRequestSubscribe = () => void

export type UseRequestOrigin<TData = unknown> = {
  data: TData
}

export type UseRequestOriginSnapshot<TData, TParams extends unknown[]> = {
  loading: boolean
  params?: TParams
  originData?: TData
  formatData?: TData
  error?: Error | unknown
}

export interface UseRequestFetchState<TData, TParams extends unknown[]> {
  loading: boolean
  params?: TParams
  data?: TData
  error?: Error | unknown
  snapshot?: UseRequestOriginSnapshot<TData, TParams>
}

export interface UseRequestPluginReturn<TData, TParams extends unknown[]> {
  name?: string
  onBefore?: (
    params: TParams,
  ) =>
    | ({
      stopNow?: boolean
      returnNow?: boolean
    } & Partial<UseRequestFetchState<TData, TParams>>)
    | void

  onRequest?: (
    service: UseRequestService<TData, TParams>,
    params: TParams,
  ) => {
    servicePromise?: Promise<TData>
  }
  /**
   * 
   * @param data Request result data or format data
   * @param params Maually set the request params.
   * @param origin Before format origin { data: TData }
   * @returns Void
   */
  onSuccess?: (data: TData, params: TParams, origin: UseRequestOrigin) => void
  onError?: (e: Error, params: TParams) => void
  onFinally?: (params: TParams, data?: TData, e?: Error) => void
  onCancel?: () => void
  onMutate?: (data: TData) => void
}

export type RequestHook<TData = any, TParams extends any[] = any[]> = (
  service: UseRequestService<TData, TParams>,
  options: UseRequestOptions<TData, TParams, any>,
  plugins: UseRequestPlugin<TData, TParams>[],
) => useRequestResult<TData, TParams>

export type UseRequestMiddleware<TData, TParams extends any[]> = (
  useRequestNext: RequestHook<TData, TParams>,
) => RequestHook<TData, TParams>

export type UseRequestBasicOptions<TData, TParams extends unknown[]> = {
  /**
   * Init data.
   */
  // initialData?: TData

  /**
   * - The default is `false.` That is, the service is automatically executed during initialization.
   * - f set to `true`, you need to manually call `run` or r`unAsync` to trigger execution.
   */
  manual?: boolean

  /**
   * 	The parameters passed to the service at the first default execution
   */
  defaultParams?: TParams

  /**
   * Triggered before service execution
   * @param params TParams
   * @returns void
   */
  onBefore?: (params: TParams) => void

  /**
   * Triggered when service resolve.
   * @param data TData
   * @param params TParams
   * @returns void
   */
  onSuccess?: (data: TData, params: TParams) => void

  /**
   * Triggered when service reject.
   * @param e Error
   * @param params TParams
   * @returns void
   */
  onError?: (e: Error, params: TParams) => void

  /**
   * Triggered when service execution is complete.
   * @param params TParams
   * @param data TData
   * @param e Error
   * @returns void
   */
  onFinally?: (params: TParams, data?: TData, e?: Error) => void

  /**
   * Is the current request ready
   */
  ready?: Ref<boolean> | boolean

  /**
   * Dependent on responsive objects, and the `watch` incoming listener object usage for `vue`.
   */
  refreshDeps?: Parameters<typeof watch>[0][] | boolean
  refreshDepsAction?: () => void

  /**
   * Set the delay time for `loading` to become `true`.
   *
   */
  loadingDelay?: number | Ref<number>

  /**
   * open vue devtools,debugKey must existence and uniqueness.
   */
  debugKey?: string

  /**
   * Format the request results, which recommend to use `useFormatResult`.
   * @param data TData
   * @returns unknown need cover TData
   */
  // formatResult?: (data?: TData) => any

  /**
   * Polling interval, in milliseconds. If the value is greater than 0, the polling mode is activated.
   */
  pollingInterval?: Ref<number> | number

  /**
   * Whether to allow concurrent requests.
   * When set to true, multiple requests can be executed concurrently.
   * When set to false, new requests will cancel previous ones.
   * Default is false.
   */
  concurrent?: boolean

  /**
   * Whether to continue polling when the page is hidden. If set to false, polling will be temporarily paused when the page is hidden, and resume when the page is visible again.
   */
  pollingWhenHidden?: boolean

  /**
   * Number of polling error retries. If set to -1, `an infinite number of times`.
   */
  pollingErrorRetryCount?: number

  /**
   * Whether to re-initiate the request when the screen refocus or revisible.
   */
  refreshOnWindowFocus?: Ref<boolean> | boolean

  /**
   * Re-request interval, in milliseconds.
   */
  focusTimespan?: Ref<number> | number

  // <------------------------------- Debounce ------------------------------------------->

  /**
   * Debounce delay time, in milliseconds. After setting, enter the debounce mode.
   */
  debounceWait?: Ref<number> | number

  /**
   * Execute the request before the delay starts.
   */
  debounceLeading?: Ref<boolean> | boolean

  /**
   * Execute the request after the delay ends.
   */
  debounceTrailing?: Ref<boolean> | boolean

  /**
   * The maximum time request is allowed to be delayed before it's executed.
   */
  debounceMaxWait?: Ref<number> | number

  // <------------------------------- Throttle ------------------------------------------->

  /**
   * Throttle wait time, in milliseconds. After setting, enter the throttle mode.
   */
  throttleWait?: Ref<number> | number

  /**
   * Execute the request before throttling starts.
   */
  throttleLeading?: Ref<boolean> | boolean

  /**
   * Execute the request after throttling ends.
   */
  throttleTrailing?: Ref<boolean> | boolean

  // <------------------------------- Cache ------------------------------------------->

  /**
   * A unique ID of the request. If `cacheKey` is set, we will enable the caching mechanism. The data of the same `cacheKey` is globally synchronized.
   */
  cacheKey?: string

  /**
   * - Set the cache time. By default, the cached data will be cleared after 5 minutes.
   * - If set to `-1`, the cached data will never expire.
   */
  cacheTime?: number

  /**
   * - Time to consider the cached data is fresh. Within this time interval, the request will not be re-initiated.
   * - If set to `-1`, it means that the data is always fresh
   */
  staleTime?: number

  /**
   * - Custom set cache.
   * - `setCache` and `getCache` need to be used together.
   * - In the custom cache mode, `cacheTime` and `clearCache` are useless, please implement it yourself according to the actual situation.
   * @param data CachedData
   * @returns void
   */
  setCache?: (data: CachedData<TData, TParams>) => void

  /**
   *  Custom get cache
   * @param params TParams
   * @returns CachedData
   */
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined

  // <------------------------------- Retry ------------------------------------------->

  /**
   * The number of retries. If set to `-1`, it will try again indefinitely.
   */
  retryCount?: number

  /**
   * - Retry interval in milliseconds.
   * If not set, the simple exponential backoff algorithm will be used by default, taking `1000 * 2 ** retryCount`, that is, waiting for 2s for the first retry, and 4s for the second retry. By analogy, if it is greater than 30s, take 30s.
   */
  retryInterval?: number

  /**
   * Middleware
   */
  use?: UseRequestMiddleware<TData, TParams>[]

  rollbackOnError?: boolean | ((params: TParams) => boolean)
}

export type UseRequestOptions<
  TData,
  TParams extends any[] = any[],
  TPlugin = any
> = UseRequestBasicOptions<TData, TParams> & {
  pluginOptions?: TPlugin
}

export type UseRequestOptionsWithFormatResult<
  TData,
  TParams extends any[] = any[],
  TPlugin = any,
  SR = any
> = UseRequestOptions<TData, TParams, TPlugin> & {
  formatResult: (res: SR) => TData
}

export type UseRequestOptionsWithInitialData<
  TData,
  TParams extends any[] = any[],
  TPlugin = any
> = UseRequestOptions<TData, TParams, TPlugin> & {
  initialData: TData extends infer R ? R : TData
}

export interface UseRequestPlugin<TData, TParams extends unknown[] = unknown[], TPlugin = any> {
  (
    fetchInstance: UseRequestFetch<TData, TParams>,
    options: UseRequestOptions<TData, TParams, TPlugin>,
  ): UseRequestPluginReturn<TData, TParams>
  onInit?: (
    options: UseRequestOptions<TData, TParams, TPlugin>,
  ) => Partial<UseRequestFetchState<TData, TParams>>
}

export interface useRequestResult<
  TData,
  TParams extends unknown[],
  FormatResult = any,
  Initial = any
> {
  /**
   * Is the service being executed.
   */
  loading: Readonly<Ref<boolean>>

  /**
   * Data returned by service.
   */
  data: Readonly<
    Ref<
      FormatResult extends false
      ? Initial extends false
      ? TData | undefined
      : TData
      : FormatResult extends (...args: any[]) => any
      ? ReturnType<FormatResult> | undefined
      : FormatResult | undefined
    >
  >

  /**
   * 	Exception thrown by service.
   */
  error: Readonly<Ref<Error | undefined>>

  /**
   * params	An array of parameters for the service being executed. For example, you triggered `run(1, 2, 3)`, then params is equal to `[1, 2, 3]`.
   */
  params: Readonly<Ref<TParams | []>>

  /**
   * Ignore the current promise response.
   */
  cancel: UseRequestFetch<TData, TParams>['cancel']

  /**
   * Use the last params, call `run` again.
   */
  refresh: UseRequestFetch<TData, TParams>['refresh']

  /**
   * Use the last params, call `runAsync` again.
   */
  refreshAsync: UseRequestFetch<TData, TParams>['refreshAsync']

  /**
   * Manually trigger the execution of the service, and the parameters will be passed to the service.
   */
  run: UseRequestFetch<TData, TParams>['run']

  /**
   * Automatic handling of exceptions, feedback through `onError`
   */
  runAsync: UseRequestFetch<TData, TParams>['runAsync']

  /**
   * Mutate `data` directly
   */
  mutate: UseRequestFetch<TData, TParams>['mutate']
}

export type Timeout = ReturnType<typeof setTimeout>

export type Interval = ReturnType<typeof setInterval>
