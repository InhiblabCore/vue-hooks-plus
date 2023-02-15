import { ref, reactive, toRefs, onMounted, onUnmounted, unref } from 'vue-demi'

import Fetch from './Fetch'
import { UseRequestOptions, UseRequestPlugin, useRequestResult, UseRequestService } from './types'

function useRequestImplement<TData, TParams extends any[]>(
  service: UseRequestService<TData, TParams>,
  options: UseRequestOptions<TData, TParams, any> = {},
  plugins: UseRequestPlugin<TData, TParams>[] = [],
) {
  // 读取配置
  const { initialData = undefined, manual = false, ready = true, ...rest } = options

  const fetchOptions = {
    manual,
    ready,
    ...rest,
  }

  // 定义一个serviceRef
  const serviceRef = ref(service)

  // 存储state的响应式对象
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
  // fetch的实例化
  const fetchInstance = new Fetch<TData, TParams>(
    serviceRef,
    fetchOptions,
    setState,
    Object.assign({}, ...initState, state),
  )

  fetchInstance.options = fetchOptions

  // 运行插件
  fetchInstance.pluginImpls = plugins.map(p => {
    return p(fetchInstance, fetchOptions)
  })

  // manual控制是否自动发送请求
  onMounted(() => {
    if (!manual) {
      const params = fetchInstance.state.params || options.defaultParams || []
      if (unref(ready)) fetchInstance.run(...(params as TParams))
    }
  })

  // 组件卸载的时候取消请求
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
