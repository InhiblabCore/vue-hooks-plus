import { Ref } from "vue";

export type Service<R = any, P extends any[] = any> = (
  ...args: P
) => Promise<R>;

export type OptionsType<T, P extends any[] = any> = {
  /** 是否手动调用 */
  manual?: boolean;

  /** 初始化数据 */
  initialData?: any;

  /** 请求数据前 */
  onBefore?: (params?: P) => void;

  /** 成功回调 */
  onSuccess?: (data?: T, params?: P) => void;

  /** 失败回调 */
  onError?: (e: Error | null, params?: P) => void;

  /** 无论请求成功还是失败都调用 */
  onFinally?: (params?: P, data?: T, error?: Error) => void;

  /** 不同 key 值的请求状态  */
  fetchKey?: (params: P) => string;

  /** 请求唯一标识。如果设置了 cacheKey，会启用缓存机制 */
  cacheKey?: string;

  /** 缓存回收时间 */
  cacheTime?: number;

  /** 数据保鲜时间 */
  staleTime?: number;

  /** 设置显示 loading 的延迟时间，避免闪烁 */
  loadingDelay?: number;

  /** 重新请求 */
  refresh?: () => void;

  /** 取消请求 */
  cancel?: () => void;

  /** 格式化数据 */
  formatResult?: (data: T) => T;

  /** 默认参数 */
  defaultParams?: any[];

  /** 防抖 */
  debounceInterval?: number;

  /** 节流 */
  throttleInterval?: number;

  /** 轮询 */
  pollingInterval?: number; // 轮询的间隔毫秒
  pollingWhenHidden?: boolean; // 屏幕隐藏时，停止轮询
  pollingSinceLastFinished?: boolean; // 等上次请求结束，再开始轮询

  /** 依赖更新 */
  refreshDeps?: Ref<any>[];

  /** 只有当 ready 为 true 时，才会发起请求 */
  ready?: Ref<boolean>;

  /** 如果 service 报错，我们会帮你捕获并打印日志，如果你需要自己处理异常，可以设置 throwOnError 为 true */
  throwOnError?: boolean;

  /** 其他属性 */
  [propName: string]: any;
};

export type StateType<D> = {
  data: D;
  loading: boolean;
  error: Error | null;
};
