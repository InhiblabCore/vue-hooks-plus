import { Ref, WatchSource } from 'vue'
import { CachedData } from './utils/cache'
import Fetch from './Fetch'

export type Service<TData, TParams extends unknown[]> = (...args: TParams) => Promise<TData>

export type Subscribe = () => void

export interface FetchState<TData, TParams extends unknown[]> {
  loading: boolean
  params?: TParams
  data?: TData
  error?: Error | unknown
}

export interface PluginReturn<TData, TParams extends unknown[]> {
  onBefore?: (
    params: TParams,
  ) =>
    | ({
        stopNow?: boolean
        returnNow?: boolean
      } & Partial<FetchState<TData, TParams>>)
    | void

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams,
  ) => {
    servicePromise?: Promise<TData>
  }

  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  onFinally?: (params: TParams, data?: TData, e?: Error) => void
  onCancel?: () => void
  onMutate?: (data: TData) => void
}

export interface BasicOptions<TData, TParams extends unknown[]> {
  initialData?: TData
  manual?: boolean
  onBefore?: (params: TParams) => void
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  onFinally?: (params: TParams, data?: TData, e?: Error) => void

  defaultParams?: TParams

  /**
   * refreshDeps
   */
  refreshDeps?: WatchSource[]
  refreshDepsAction?: () => void

  /**
   * loadingDelay
   */
  loadingDelay?: number | Ref<number>

  /**
   * formatResult
   * @param data TData
   * @returns unknown need cover TData
   */
  formatResult?: (data?: TData) => unknown

  /**
   * polling
   */
  pollingInterval?: Ref<number> | number
  pollingWhenHidden?: boolean

  /**
   * refreshOnWindowFocus
   */
  refreshOnWindowFocus?: Ref<boolean> | boolean
  focusTimespan?: Ref<number> | number

  /**
   * debounce
   */
  debounceWait?: Ref<number> | number
  debounceLeading?: Ref<boolean> | boolean
  debounceTrailing?: Ref<boolean> | boolean
  debounceMaxWait?: Ref<number> | number

  /**
   * throttle
   */
  throttleWait?: Ref<number> | number
  throttleLeading?: Ref<boolean> | boolean
  throttleTrailing?: Ref<boolean> | boolean

  /**
   * cache
   */
  cacheKey?: string
  cacheTime?: number
  staleTime?: number
  setCache?: (data: CachedData<TData, TParams>) => void
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined

  /**
   * retry
   */
  retryCount?: number
  retryInterval?: number

  /**
   * ready
   */
  ready?: Ref<boolean> | boolean
}

export type Options<TData, TParams extends unknown[], TPlugin> = {
  [K in keyof BasicOptions<TData, TParams>]: BasicOptions<TData, TParams>[K]
} &
  {
    [K in keyof TPlugin]: TPlugin[K]
  }

export interface Plugin<TData, TParams extends unknown[] = unknown[], TPlugin = any> {
  (fetchInstance: Fetch<TData, TParams>, options: Options<TData, TParams, TPlugin>): PluginReturn<
    TData,
    TParams
  >
  onInit?: (options: Options<TData, TParams, TPlugin>) => Partial<FetchState<TData, TParams>>
}

export interface Result<TData, TParams extends unknown[]> {
  loading: Ref<boolean>
  data: Ref<TData | undefined>
  error: Ref<Error | undefined>
  params: Ref<TParams | []>
  cancel: Fetch<TData, TParams>['cancel']
  refresh: Fetch<TData, TParams>['refresh']
  refreshAsync: Fetch<TData, TParams>['refreshAsync']
  run: Fetch<TData, TParams>['run']
  runAsync: Fetch<TData, TParams>['runAsync']
  mutate: Fetch<TData, TParams>['mutate']
}

export type Timeout = ReturnType<typeof setTimeout>

export type Interval = ReturnType<typeof setInterval>
