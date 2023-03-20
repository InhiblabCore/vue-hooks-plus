import { ref, reactive, toRefs, onMounted, onUnmounted, unref, inject } from 'vue'

import Fetch from './Fetch'
import { USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY } from './config'
import { UseRequestOptions, UseRequestPlugin, useRequestResult, UseRequestService } from './types'

function useRequestImplement<TData, TParams extends any[]>(
  service: UseRequestService<TData, TParams>,
  options: UseRequestOptions<TData, TParams, any> = {},
  plugins: UseRequestPlugin<TData, TParams>[] = [],
) {
  // global option
  const USEREQUEST_GLOBAL_OPTIONS = inject<Record<string, any>>(
    USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY,
  )
  // read option
  const { initialData = undefined, manual = false, ready = true, ...rest } = {
    ...(USEREQUEST_GLOBAL_OPTIONS ?? {}),
    ...(options ?? {}),
  } as Record<string, any>

  const fetchOptions = {
    manual,
    ready,
    ...rest,
  }

  // serviceRef store service
  const serviceRef = ref(service)

  // reactive
  const state = reactive<{
    data?: TData
    loading: boolean
    params?: TParams
    error?: Error
  }>({
    data: initialData,
    loading: false,
    params: undefined,
    error: undefined,
  })

  const setState = (s: any, field?: keyof typeof state) => {
    if (field) {
      state[field] = s
    } else {
      state.data = s.data
      state.loading = s.loading
      state.error = s.error
      state.params = s.params
    }
  }

  const initState = plugins.map(p => p?.onInit?.(fetchOptions)).filter(Boolean)
  // Fetch Instance
  const fetchInstance = new Fetch<TData, TParams>(
    serviceRef,
    fetchOptions,
    setState,
    Object.assign({}, ...initState, state),
  )

  fetchInstance.options = fetchOptions

  // run plugins
  fetchInstance.pluginImpls = plugins.map(p => {
    return p(fetchInstance, fetchOptions)
  })

  // manual
  onMounted(() => {
    if (!manual) {
      const params = fetchInstance.state.params || options.defaultParams || []
      if (unref(ready)) fetchInstance.run(...(params as TParams))
    }
  })

  // onUnmounted cancel request
  onUnmounted(() => {
    fetchInstance.cancel()
  })

  return ({
    ...toRefs(state),
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
  } as unknown) as useRequestResult<TData, TParams>
}

export default useRequestImplement
