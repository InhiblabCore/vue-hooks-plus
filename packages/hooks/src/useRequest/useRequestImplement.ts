import {
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  onUnmounted,
} from "vue";

import Fetch from "./Fetch";
import type { Options, Plugin, Result, Service } from "./types";

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
) {
  // 读取配置
  const { manual = false, ...rest } = options;

  const fetchOptions = {
    manual,
    ...rest,
  };

  // 定义一个serviceRef
  const serviceRef = ref(service);

  // 强制改变的响应式对象
  // const { update, setUpdate } = useUpdate();

  // 存储state的响应式对象
  const state = reactive<{
    data?: TData;
    loading: boolean;
    params?: TParams;
    error?: Error;
  }>({
    data: undefined,
    loading: true,
    params: undefined,
    error: undefined,
  });

  const setState = (s: any) => {
    state.data = s.data;
    state.loading = s.loading;
    state.error = s.error;
    state.params = s.params;
    fetchInstance.value.state=s
  };

  // fetch的实例化
  const fetchInstance = computed(() => {
    // 获取初始化initState
    const initState = plugins
      .map((p) => p?.onInit?.(fetchOptions))
      .filter(Boolean);
    return new Fetch<TData, TParams>(
      serviceRef,
      fetchOptions,
      // setUpdate,
      setState,
      Object.assign({}, ...initState)
    );
  });

  // 监听update，每一次实例中进行setstate都会调用此update
  // watch(update, () => {
  //   // 监听到update进行响应式数据绑定
  //   console.log(fetchInstance.value.state);
    
  //   setState(fetchInstance.value.state);
  // });

  fetchInstance.value.options = fetchOptions;

  // 运行插件
  fetchInstance.value.pluginImpls = plugins.map((p) => {
    return p(fetchInstance.value as any, fetchOptions);
  });

  // manual控制是否自动发送请求
  onMounted(() => {
    if (!manual) {
      const params =
        fetchInstance.value.state.params || options.defaultParams || [];
       
      fetchInstance.value.run(...params as TParams);
    }
  });

  // 组件卸载的时候取消请求
  onUnmounted(() => {
    fetchInstance.value.cancel();
  });

  return {
    ...toRefs(state),
    cancel: fetchInstance.value.cancel,
    refresh: fetchInstance.value.refresh,
    refreshAsync: fetchInstance.value.refreshAsync,
    run: fetchInstance.value.run,
    runAsync:fetchInstance.value.runAsync,
    mutate: fetchInstance.value.mutate,
  } as unknown as Result<TData, TParams>;
}

export default useRequestImplement;
