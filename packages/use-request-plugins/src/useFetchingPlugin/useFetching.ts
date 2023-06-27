import { UseRequestPlugin } from '@vue-hooks-plus/use-request/dist/types/types'
import { useFetchingGlobalStore } from './store'

export interface FetchingPluginType {
  /**
   * @rigin useFetchingPlugin
   * @param params request params
   * @type (params: any[]) => string
   * @returns string
   */
  fetchingKey?: (params: any[]) => string

  /**
   * @rigin useFetchingPlugin
   * @param current current fetch data
   * @param record all fetch data
   * @type (current: any, record: any) => void
   * @returns void
   */
  onFetching?: (current: any, record: any) => void

  /**
   * @rigin useFetchingPlugin
   * @param _isFetching all fetching loading status
   * @type (_isFetching: boolean) => void
   * @returns void
   */
  isFetching?: (_isFetching: boolean) => void
}

export const useFetchingPlugin: UseRequestPlugin<any, [], FetchingPluginType> = (
  _,
  { fetchingKey, onFetching, isFetching },
) => {
  const store = useFetchingGlobalStore()
  let currentFetchingKey: string | undefined

  return {
    name: "🧩 fetchingPlugin",
    onBefore: params => {
      currentFetchingKey = fetchingKey?.(params)
      if (currentFetchingKey) store.setFetchingInit(currentFetchingKey, onFetching, isFetching)
    },
    onSuccess: data => {
      if (currentFetchingKey) store.setCurrentKeyData(currentFetchingKey, data, 'success')
    },
    onError: () => {
      if (currentFetchingKey) store.setCurrentKeyData(currentFetchingKey, null, 'error')
    },
  }
}
