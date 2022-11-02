import { ref, UnwrapRef, watch, watchEffect } from 'vue'
import { Service, Options } from '@/useRequest/types'
import useRequest from '../useRequest'

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

function keyIsStringOrNumber(value: unknown): value is string | number {
  return typeof value === 'string' || typeof value === 'number'
}

function useFetchs<TData, TParams>(
  service: Service<TData, ParamsType<TParams>>,
  options: Options<TData, ParamsType<TParams>, any> & {
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

  const getFetchs = (fetchs_: Fetchs) => {
    // @ts-ignore
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
        data: data?.value as UnwrapRef<TData>,
        // @ts-ignore
        params: params.value as UnwrapRef<TParams>,
        loading: loading.value as UnwrapRef<boolean>,
      }
      getFetchs(fetchs.value as Fetchs)
    })

    run(...args)

    watch([data, params, loading, newstFetchKey], curr => {
      const [
        newData = undefined,
        newParams = undefined,
        newLoading = false,
        key = DEFAULT_KEY,
      ] = curr

      const fetchKey = keyIsStringOrNumber(key) ? key : DEFAULT_KEY
      fetchs.value[fetchKey] = {
        key: fetchKey,
        // @ts-ignore
        data: newData as UnwrapRef<TData>,
        // @ts-ignore
        params: newParams as UnwrapRef<TParams>,
        loading: newLoading as UnwrapRef<boolean>,
      }
      getFetchs(fetchs.value as Fetchs)
    })
  }

  return {
    fetchs: newFetchs,
    fetchRun,
  }
}

export default useFetchs
