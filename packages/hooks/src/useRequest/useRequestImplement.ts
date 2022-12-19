import { ref, reactive, toRefs, computed, onMounted, onUnmounted, unref } from 'vue'

import Fetch from './Fetch'
import { Options, Plugin, Result, Service } from './types'

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams, any> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  // 读取配置
  const { manual = false, ready = true, ...rest } = options

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
    data: undefined,
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

  // fetch的实例化
  const fetchInstance = computed(() => {
    // 获取初始化initState
    const initState = plugins.map(p => p?.onInit?.(fetchOptions)).filter(Boolean)
    return new Fetch<TData, TParams>(
      serviceRef,
      fetchOptions,
      setState,
      Object.assign({}, ...initState),
    )
  })

  fetchInstance.value.options = fetchOptions

  // 运行插件
  fetchInstance.value.pluginImpls = plugins.map(p => {
    return p(fetchInstance.value as any, fetchOptions)
  })

  // manual控制是否自动发送请求
  onMounted(() => {
    if (!manual) {
      const params = fetchInstance.value.state.params || options.defaultParams || []
      if (unref(ready)) fetchInstance.value.run(...(params as TParams))
    }
  })

  // 组件卸载的时候取消请求
  onUnmounted(() => {
    fetchInstance.value.cancel()
  })

  return ({
    ...toRefs(state),
    cancel: fetchInstance.value.cancel.bind(fetchInstance.value),
    refresh: fetchInstance.value.refresh.bind(fetchInstance.value),
    refreshAsync: fetchInstance.value.refreshAsync.bind(fetchInstance.value),
    run: fetchInstance.value.run.bind(fetchInstance.value),
    runAsync: fetchInstance.value.runAsync.bind(fetchInstance.value),
    mutate: fetchInstance.value.mutate.bind(fetchInstance.value),
  } as unknown) as Result<TData, TParams>
}

export default useRequestImplement
