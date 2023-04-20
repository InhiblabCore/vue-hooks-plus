import { UseRequestPlugin } from '@vue-hooks-plus/use-request/dist/types/types'
import { useFetchingGlobalStore } from './store'

export interface FetchingPluginType {
  fetchingKey?: (params: any[]) => string
  onFetching?: (current: any, record: any) => void
  isFetching?: (_isFetching: boolean) => void
}

export const useFetchingPlugin: UseRequestPlugin<any, [], FetchingPluginType> = (
  _,
  { fetchingKey, onFetching, isFetching },
) => {
  const store = useFetchingGlobalStore()
  let currentFetchingKey: string | undefined

  return {
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
