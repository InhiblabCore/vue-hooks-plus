import { toRefs, reactive, onMounted, ref, Ref, watch } from "vue";
import { cloneDeep, debounce, throttle } from "lodash";
import { OptionsType, Service, StateType } from "./type";
import { setCache, getCache, clearCache } from "./cache";

type Timer = ReturnType<typeof setInterval>;

export function useAsync<TData = unknown, TParams extends unknown[] = any>(
  service: Service<TData, TParams>,
  options: OptionsType<TData, TParams> = {}
) {
  const {
    manual = false,
    initialData,
    defaultParams = [],
    debounceInterval,
    throttleInterval,
    pollingInterval,
    pollingWhenHidden,
    pollingSinceLastFinished,
    refreshDeps = [],
    cacheKey,
    cacheTime = 300000,
    ready = ref<boolean>(false),
    staleTime = 0,
    loadingDelay,
    fetchKey = (params: TParams) => params,
    onBefore,
    onSuccess,
    onError = console.log,
    onFinally,
    formatResult = (res: unknown) => res,
  } = options;

  const [params, lastSuccessParams] = [
    ref<TParams>(defaultParams as TParams) as Ref<TParams>,
    ref<TParams>(defaultParams as TParams) as Ref<TParams>,
  ];

  const timerRef = ref<ReturnType<typeof setTimeout>>();

  const isVisible = ref(true);

  const state: StateType<TData> = reactive({
    data: initialData || null,
    error: null,
    loading: false,
  });

  const fetches = reactive<
    Record<
      string,
      StateType<unknown> & {
        params: unknown;
      }
    >
  >({});

  const cancelTimeout = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
    }
  };

  const run = async (...args: TParams) => {
    state.error = null;
    state.loading = true;

    cancelTimeout();
    onBefore?.(cloneDeep(args));
    params.value = cloneDeep(args);

    // 使用loadingDelay
    if (loadingDelay !== undefined) {
      timerRef.value = setTimeout(() => {
        state.loading = true;
      }, loadingDelay);
      state.loading = false;
    }

    // 使用缓存
    if (
      cacheKey !== undefined &&
      (typeof cacheKey === "string" || typeof cacheKey === "number")
    ) {
      state.data = getCache(cacheKey)?.data as StateType<TData>["data"];
      if (
        getCache(cacheKey)?.loading !== undefined &&
        typeof getCache(cacheKey)?.loading === "boolean"
      ) {
        state.loading = getCache(cacheKey)!.loading;
      } else {
        state.loading = true;
      }
    }

    // 获取状态键值
    const fetchKeyPersist = fetchKey(
      ({ ...args }?.[0] as TParams) ?? "default_key"
    );

    // 初始化loading状态
    if (fetchKeyPersist && typeof fetchKeyPersist === "string") {
      fetches[fetchKeyPersist] = {
        ...state,
        params: cloneDeep(args),
      };
    }

    try {
      if (state.loading === true) {
        // 请求更新数据
        const result = await service(...args);
        state.data = result;
        state.loading = false;
        state.data = formatResult?.(state.data) as StateType<TData>["data"];

        // 更新缓存
        if (cacheKey) {
          setCache(cacheKey, cacheTime, state.data, cloneDeep(args), staleTime);
        }

        // 请求成功
        onSuccess?.(state.data);

        // 更新params
        lastSuccessParams.value = cloneDeep(args);

        // 更新并行请求状态;
        if (fetchKeyPersist && typeof fetchKeyPersist === "string") {
          fetches[fetchKeyPersist as string] = {
            ...state,
            loading: false,
            params: cloneDeep(args),
          };
        }

        onFinally?.(cloneDeep(args), state.data, undefined);
        cancelTimeout();
      }
    } catch (err: unknown) {
      onError(err);
      state.error = err as Error;
      state.loading = false;
      if (fetchKeyPersist) {
        fetches[fetchKeyPersist as string] = {
          ...state,
          data: null,
          params: cloneDeep(args),
        };
      }
      // 清除缓存
      clearCache(cacheKey);
      onFinally?.(cloneDeep(args), undefined, state.error);
      cancelTimeout();
    }
  };

  onMounted(() => {
    if (!manual) run(...(defaultParams as TParams));
  });

  // 防抖
  let serviceRun = run;
  if (debounceInterval) {
    const debounceRun = debounce(run, debounceInterval);
    serviceRun = (...args: TParams) => {
      state.loading = true;
      return Promise.resolve(debounceRun(...args)!);
    };
  }
  // 节流
  if (throttleInterval) {
    const throttleRun = throttle(run, throttleInterval);
    serviceRun = (...args: TParams) => {
      return Promise.resolve(throttleRun(...args)!);
    };
  }

  // 轮询
  let pollingTimer: Timer | undefined;
  if (pollingInterval && !pollingSinceLastFinished) {
    serviceRun = (...args: TParams) => {
      if (pollingTimer) {
        clearInterval(pollingTimer);
      }
      pollingTimer = setInterval(() => {
        if (pollingWhenHidden && !isVisible.value) {
          return;
        }
        run(...args);
      }, pollingInterval);
      return run(...args);
    };
  }

  // 重新请求
  function refresh() {
    return run(...params.value);
  }

  // 取消请求
  const cancel = () => {
    if (pollingTimer) {
      clearInterval(pollingTimer);
    }
    state.loading = false;
  };

  // 突变
  function mutate(newData: StateType<TData>["data"]) {
    state.data = newData;
  }

  // 依赖更新数据
  watch(refreshDeps, (value, prevValue) => {
    params.value = (params.value as any[])?.map((item) => {
      const obj = item;
      (prevValue as unknown[]).forEach((v, index) => {
        Object.keys(item).forEach((key) => {
          if (item[key] === v) {
            obj[key] = value[index];
          }
        });
      });
      return {
        ...params.value,
        ...obj,
      };
    }) as TParams;
    run(...params.value);
  });

  watch(ready, (val) => {
    if (val === true) {
      run(...params.value);
    }
  });

  return {
    fetches,
    lastSuccessParams,
    run: serviceRun,
    mutate,
    refresh,
    cancel,
    setCache,
    getCache,
    clearCache,
    ...toRefs(state),
  };
}
