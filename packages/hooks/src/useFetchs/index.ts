import { createApp, defineComponent, ref, UnwrapRef, watch, watchEffect } from 'vue-demi'
import { UseRequestService, UseRequestOptions } from '../useRequest/types'
import useRequest from '../useRequest'

// vue instance
function renderHook<R = any>(renderFC: () => R): void {
  const app = createApp(
    defineComponent({
      setup() {
        renderFC()
        return () => {}
      },
    }),
  )
  app.mount(document.createElement('div'))
}

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
    // @ts-ignore
    newFetchs.value = fetchs_
  }

  const fetchRun = (...args: TParams extends any[] ? any[] : any) => {
    const newstFetchKey = ref()
    const cacheKey = fetchKeyPersist.value?.(...args) ?? DEFAULT_KEY
    newstFetchKey.value = cacheKey

    renderHook(() => {
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
        setFetchs(fetchs.value as Fetchs)
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
        setFetchs(fetchs.value as Fetchs)
      })
    })
  }

  return {
    fetchs: newFetchs,
    fetchRun,
  }
}

export default useFetchs
