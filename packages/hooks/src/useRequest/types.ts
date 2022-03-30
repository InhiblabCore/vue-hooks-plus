import { Ref } from "vue";
import type { CachedData } from "./utils/cache";
import Fetch from "./Fetch";

export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData>;

export type Subscribe = () => void;

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error;
}

export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | void;

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams
  ) => {
    servicePromise?: Promise<TData>;
  };

  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  onCancel?: () => void;
  onMutate?: (data: TData) => void;
}

export interface Options<TData, TParams extends any[]> {
  manual?: boolean;

  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;

  defaultParams?: TParams;

  // 依赖更新
  refreshDeps?: Ref<any>[];
  refreshDepsAction?: () => void;

  // loading延迟
  loadingDelay?: number;

  // 轮询
  pollingInterval?: Ref<number>;
  pollingWhenHidden?: Ref<boolean>;

  // 屏幕聚焦重新请求
  refreshOnWindowFocus?: Ref<boolean>;
  focusTimespan?: number;

  // 防抖
  debounceWait?: number;
  debounceLeading?: Ref<boolean>;
  debounceTrailing?: Ref<boolean>;
  debounceMaxWait?: Ref<number>;

  // 节流
  throttleWait?: number;
  throttleLeading?: Ref<boolean>;
  throttleTrailing?: Ref<boolean>;

  // 请求缓存
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;
  setCache?: (data: CachedData<TData, TParams>) => void;
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined;

  // 错误重试
  retryCount?: number;
  retryInterval?: number;

  // 只有当 ready 为 true 时，才会发起请求
  ready?: Ref<boolean>;
}

export type Plugin<TData, TParams extends any[]> = {
  (
    fetchInstance: Fetch<TData, TParams>,
    options: Options<TData, TParams>
  ): PluginReturn<TData, TParams>;
  onInit?: (
    options: Options<TData, TParams>
  ) => Partial<FetchState<TData, TParams>>;
};

export interface Result<TData, TParams extends any[]> {
  loading: Ref<boolean>;
  data?: Ref<TData>;
  error?: Ref<Error>;
  params: Ref<TParams | []>;
  cancel: Fetch<TData, TParams>["cancel"];
  refresh: Fetch<TData, TParams>["refresh"];
  refreshAsync: Fetch<TData, TParams>["refreshAsync"];
  run: Fetch<TData, TParams>["run"];
  runAsync: Fetch<TData, TParams>["runAsync"];
  mutate: Fetch<TData, TParams>["mutate"];
}

export type Timeout = ReturnType<typeof setTimeout>;

export type Interval = ReturnType<typeof setInterval>;
