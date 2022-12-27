import { Ref, WatchSource } from 'vue'
import { CachedData } from './utils/cache'
import Fetch from './Fetch'

export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>

export type Subscribe = () => void

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean
  params?: TParams
  data?: TData
  error?: Error | unknown
}

export interface PluginReturn<TData, TParams extends any[]> {
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

export interface BasicOptions<TData, TParams extends any[]> {
  manual?: boolean
  onBefore?: (params: TParams) => void
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  onFinally?: (params: TParams, data?: TData, e?: Error) => void

  defaultParams?: TParams

  // 依赖更新
  refreshDeps?: WatchSource[] | any
  refreshDepsAction?: () => void

  // loading延迟
  loadingDelay?: number | Ref<number>

  // 格式化数据
  formatResult?: (data?: TData) => any

  // 轮询
  pollingInterval?: Ref<number> | number
  pollingWhenHidden?: boolean

  // 屏幕聚焦重新请求
  refreshOnWindowFocus?: Ref<boolean> | boolean
  focusTimespan?: Ref<number> | number

  // 防抖
  debounceWait?: Ref<number> | number
  debounceLeading?: Ref<boolean> | boolean
  debounceTrailing?: Ref<boolean> | boolean
  debounceMaxWait?: Ref<number> | number

  // 节流
  throttleWait?: Ref<number> | number
  throttleLeading?: Ref<boolean> | boolean
  throttleTrailing?: Ref<boolean> | boolean

  // 请求缓存
  cacheKey?: string
  cacheTime?: number
  staleTime?: number
  setCache?: (data: CachedData<TData, TParams>) => void
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined

  // 错误重试
  retryCount?: number
  retryInterval?: number

  // 只有当 ready 为 true 时，才会发起请求
  ready?: Ref<boolean> | boolean
}

export type Options<TData, TParams extends any[], TPlugin> = {
  [K in keyof TPlugin]: TPlugin[K]
} &
  BasicOptions<TData, TParams>

export interface Plugin<TData, TParams extends any[] = any[], TPlugin = any> {
  (fetchInstance: Fetch<TData, TParams>, options: Options<TData, TParams, TPlugin>): PluginReturn<
    TData,
    TParams
  >
  onInit?: (options: Options<TData, TParams, TPlugin>) => Partial<FetchState<TData, TParams>>
}

export interface Result<TData, TParams extends any[]> {
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
