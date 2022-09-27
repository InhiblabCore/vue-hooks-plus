import { Service, Options } from '@/useRequest/types'
import { ref, watch, watchEffect } from 'vue'
import useRequest from '../useRequest/index'

const DEFAULT_KEY = 'VUE_HOOKS_PLUS_USE_REQUEST_DEFAULT_KEY'

type FetchType<TData, TParams> = Record<
  string | number,
  {
    data: TData | undefined
    params: TParams
    loading: boolean
    key: string | number
  }
>

type ParamsType<P> = P extends any[] ? any[] : any

function useFetchs<TData, TParams>(
  service: Service<TData, ParamsType<TParams>>,
  options: Options<TData, ParamsType<TParams>, any> & {
    manual: true
  },
  self: {
    fetchKey?: (...args: ParamsType<TParams>) => string
  },
) {
  const fetchKeyPersist = ref(self?.fetchKey)

  const fetchs = ref<FetchType<TData, TParams>>({})
  const newFetchs = ref<FetchType<TData, TParams>>({})

  const getFetchs = (fetchs_: Record<string | number, any>) => {
    newFetchs.value = fetchs_
  }

  const fetchRun = (...args: TParams extends any[] ? any[] : any) => {
    const newstFetchKey = ref()
    const cacheKey = fetchKeyPersist.value?.(...args) ?? DEFAULT_KEY
    newstFetchKey.value = cacheKey

    const { data, run, params, loading } = useRequest(service, {
      ...options,
      cacheKey,
      manual: true,
    })

    watchEffect(() => {
      fetchs.value[cacheKey as string] = {
        key: cacheKey,
        // @ts-ignore
        data: data?.value,
        //  @ts-ignore
        params: params.value,
        loading: loading.value,
      }
      // debugger
      getFetchs(fetchs.value)
    })

    run(...args)

    watch([data, params, loading, newstFetchKey], curr => {
      const [
        newData = undefined,
        newParams = undefined,
        newLoading = false,
        key = DEFAULT_KEY,
      ] = curr
      fetchs.value[key as string] = {
        key: key as string | number,
        // @ts-ignore
        data: newData,
        // @ts-ignore
        params: newParams,
        // @ts-ignore
        loading: newLoading,
      }
      getFetchs(fetchs.value)
    })
  }

  return {
    fetchs: newFetchs,
    fetchRun,
  }
}

export default useFetchs
