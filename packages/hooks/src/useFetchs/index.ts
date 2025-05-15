import { ref } from 'vue'
import { UseRequestService, UseRequestOptions } from '../useRequest/types'
import useRequest from '../useRequest'

const DEFAULT_KEY = 'VUE_HOOKS_PLUS_USE_REQUEST_DEFAULT_KEY'

type FetchType<TData, TParams> = Record<
  string | number,
  {
    data: Readonly<TData> | undefined
    params: TParams
    loading: boolean
    key: string | number
  }
>

type ParamsType<P> = P extends any[] ? any[] : any

function useFetchs<TData, TParams>(
  service: UseRequestService<TData, ParamsType<TParams>>,
  options: UseRequestOptions<TData, ParamsType<TParams>, any> & {
    manual: true
  },
  self: {
    fetchKey?: (...args: ParamsType<TParams>) => string
  },
) {
  type Fetchs = FetchType<TData, TParams>

  const fetchKeyPersist = ref(self?.fetchKey)
  const fetchs = ref<Fetchs>({})
  const newFetchs = ref<Fetchs>({})

  const setFetchs = (fetchs_: Fetchs) => {
    newFetchs.value = fetchs_
  }

  const { run } = useRequest(service, {
    ...options,
    manual: true,
    concurrent: true,
    onSuccess: (data, params) => {
      const cacheKey = fetchKeyPersist.value?.(...params) ?? DEFAULT_KEY
      fetchs.value[cacheKey] = {
        key: cacheKey,
        data: data as Readonly<TData>,
        params: params as TParams,
        loading: false,
      }
      setFetchs(fetchs.value)
      options.onSuccess?.(data, params)
    },
    onError: (error, params) => {
      const cacheKey = fetchKeyPersist.value?.(...params) ?? DEFAULT_KEY
      fetchs.value[cacheKey] = {
        key: cacheKey,
        data: undefined,
        params: params as TParams,
        loading: false,
      }
      setFetchs(fetchs.value)
      options.onError?.(error, params)
    },
    onBefore: (params) => {
      const cacheKey = fetchKeyPersist.value?.(...params) ?? DEFAULT_KEY
      fetchs.value[cacheKey] = {
        key: cacheKey,
        data: undefined,
        params: params as TParams,
        loading: true,
      }
      setFetchs(fetchs.value)
      options.onBefore?.(params)
    },
  })

  const fetchRun = (...args: TParams extends any[] ? any[] : any) => {
    run(...args)
  }

  return {
    fetchs: newFetchs,
    fetchRun,
  }
}

export default useFetchs
