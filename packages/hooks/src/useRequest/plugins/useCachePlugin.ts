import { ref, watchEffect, onUnmounted } from "vue";
import type { Plugin } from "../types";
import * as cache from "../utils/cache";
import type { CachedData } from "../utils/cache";
import * as cachePromise from "../utils/cachePromise";
import * as cacheSubscribe from "../utils/cacheSubscribe";

const useCachePlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    setCache: customSetCache,
    getCache: customGetCache,
  }
) => {
  const unSubscribeRef = ref<() => void>();

  const currentPromiseRef = ref<Promise<any>>();

  const _setCache = (key: string, cachedData: CachedData) => {
    if (customSetCache) {
      customSetCache(cachedData);
    } else {
      cache.setCache(key, cacheTime, cachedData);
    }
    cacheSubscribe.trigger(key, cachedData.data);
  };

  const _getCache = (key: string, params: any[] = []) => {
    if (customGetCache) {
      return customGetCache(params);
    }
    return cache.getCache(key);
  };

  watchEffect(() => {
    if (!cacheKey) {
      return;
    }

    // 获取初始化的data
    const cacheData = _getCache(cacheKey);
    if (cacheData && Object.hasOwnProperty.call(cacheData, "data")) {
      fetchInstance.state.data = cacheData.data;
      fetchInstance.state.params = cacheData.params;

      console.log("staleTime",staleTime);
      
      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        fetchInstance.state.loading = false;
      }
    }

    // 如果存在相同的cacheKey,触发更新
    unSubscribeRef.value = cacheSubscribe.subscribe(cacheKey, (data) => {
      fetchInstance.setState({ data });
    });
  });

  onUnmounted(() => {
    unSubscribeRef.value?.();
  });

  if (!cacheKey) {
    return {};
  }

  return {
    onBefore: (params) => {
      const cacheData = _getCache(cacheKey, params);

      if (!cacheData || !Object.hasOwnProperty.call(cacheData, "data")) {
        return {};
      }
      // 数据是新鲜就停止请求
      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        console.log("停止请求");
        
        return {
          loading: false,
          data: cacheData?.data,
          returnNow: true,
        };
      } else {
        // 数据不新鲜，则返回data,并且继续发送请求
        return {
          data: cacheData?.data,
        };
      }
    },
    onRequest: (service, args) => {
      let servicePromise = cachePromise.getCachePromise(cacheKey);
      // 如果存在servicePromise，并且它没有被触发，则使用它
      if (servicePromise && servicePromise !== currentPromiseRef.value) {
        return { servicePromise };
      }

      servicePromise = service(...args);
      currentPromiseRef.value = servicePromise;
      cachePromise.setCachePromise(cacheKey, servicePromise);
      return { servicePromise };
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        // 取消更新，避免反复触发自己
        unSubscribeRef.value?.();
        _setCache(cacheKey, {
          data,
          params,
          time: new Date().getTime(),
        });
        // 触发器更新
        unSubscribeRef.value = cacheSubscribe.subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d });
        });
      }
    },
    onMutate: (data) => {
      if (cacheKey) {
        // 取消更新，避免反复触发自己
        unSubscribeRef.value?.();
        _setCache(cacheKey, {
          data,
          params: fetchInstance.state.params,
          time: new Date().getTime(),
        });
        // 触发器更新
        unSubscribeRef.value = cacheSubscribe.subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d });
        });
      }
    },
  };
};

export default useCachePlugin;
