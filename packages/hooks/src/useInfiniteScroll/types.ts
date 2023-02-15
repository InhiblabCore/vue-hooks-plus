import { DependencyList } from '../utils/depsAreSame'
import { BasicTarget } from '../utils/domTarget'

export type UseInfiniteData = { list: any[]; [key: string]: any }

export type UseInfiniteService<TData extends UseInfiniteData> = (
  currentData?: TData,
) => Promise<TData>

export interface UseInfiniteScrollResult<TData extends UseInfiniteData> {
  /**
   * The data returned by the service, where the `list` attribute is the aggregated data
   */
  data: TData

  /**
   * Is the first request in progress
   */
  loading: boolean

  /**
   * Is more data request in progress
   */
  loadingMore: boolean

  /**
   * Whether there is no more data, it will take effect after configuring `options.isNoMore`
   */
  noMore: boolean

  /**
   * Load more data, it will automatically catch the exception, and handle it through `options.onError`
   * @returns void
   */
  loadMore: () => void

  /**
   * Load more data, which is consistent with the behavior of `loadMore`, but returns Promise, so you need to handle the exception yourself
   * @returns  Promise<TData>
   */
  loadMoreAsync: () => Promise<TData>

  /**
   * Load the first page of data, it will automatically catch the exception, and handle it through `options.onError`
   * @returns void
   */
  reload: () => void

  /**
   * Load the first page of data, which is consistent with the behavior of `reload`, but returns Promise, so you need to handle the exception yourself
   * @returns Promise<TData>
   */
  reloadAsync: () => Promise<TData>

  /**
   * Ignore the current `Promise` response
   * @returns void
   */
  cancel: () => void

  /**
   * Modify `data` directly
   * @param data TData
   * @returns void
   */
  mutate: (data?: TData) => void
}

export interface UseInfiniteScrollOptions<TData extends UseInfiniteData> {
  /**
   * specifies the parent element. If it exists, it will trigger the `loadMore` when scrolling to the bottom. Needs to work with `isNoMore` to know when there is no more data to load
   */
  target?: BasicTarget<Element | Document>

  /**
   * determines if there is no more data, the input parameter is the latest merged `data`
   * @param data TData
   * @returns boolean
   */
  isNoMore?: (data?: TData) => boolean

  /**
   * The pixel threshold to the bottom for the scrolling to load
   */
  threshold?: number

  /**
   * - The default is `false`. That is, the service is automatically executed during initialization.
   * - If set to `true`, you need to manually call `run` or `runAsync` to trigger execution.
   */
  manual?: boolean

  /**
   * When the content of the array changes, `reload` will be triggered
   */
  reloadDeps?: DependencyList

  /**
   * Triggered before service execution
   * @returns void
   */
  onBefore?: () => void

  /**
   * Triggered when service resolve
   * @param data TData
   * @returns void
   */
  onSuccess?: (data: TData) => void

  /**
   * Triggered when service reject
   * @param e Error
   * @returns void
   */
  onError?: (e: Error) => void

  /**
   * Triggered when service execution is complete
   * @param data TData
   * @param e Error
   * @returns void
   */
  onFinally?: (data?: TData, e?: Error) => void
}
