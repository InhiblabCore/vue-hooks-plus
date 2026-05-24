import { ref, watchEffect, onScopeDispose } from 'vue'
import { UseRequestPlugin } from '../types'
import * as cache from '../utils/cache'
import { CachedData } from '../utils/cache'
import * as cachePromise from '../utils/cachePromise'
import * as cacheSubscribe from '../utils/cacheSubscribe'

const useCachePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    setCache: customSetCache,
    getCache: customGetCache,
  },
) => {
  const unSubscribeRef = ref<() => void>()

  const currentPromiseMap = new Map<string, Promise<any>>()
  const subscribedKeyRef = ref<string>()

  const getCacheKey = (params?: unknown[]) => {
    if (typeof cacheKey === 'function') {
      return cacheKey(params)
    }
    return cacheKey
  }

  const subscribe = (key: string) => {
    if (subscribedKeyRef.value === key) return

    unSubscribeRef.value?.()
    subscribedKeyRef.value = key
    unSubscribeRef.value = cacheSubscribe.subscribe(key, data => {
      fetchInstance.setState({ data })
    })
  }

  const isPromiseLike = <T>(value: T | Promise<T>): value is Promise<T> =>
    Boolean(value && typeof (value as Promise<T>).then === 'function')

  const _setCache = (key: string, cachedData: CachedData) => {
    const trigger = () => cacheSubscribe.trigger(key, cachedData.data)
    if (customSetCache) {
      const cacheResult = customSetCache(cachedData)
      if (isPromiseLike(cacheResult)) {
        return cacheResult.then(trigger)
      }
      trigger()
      return cacheResult
    }
    cache.setCache(key, cacheTime, cachedData)
    trigger()
  }

  const _getCache = (key: string, params: any[] = []) => {
    if (customGetCache) {
      return customGetCache(params)
    }
    return cache.getCache(key)
  }

  watchEffect(onCleanup => {
    const key = getCacheKey(fetchInstance.state.params || [])
    if (!key) {
      return
    }

    let cancelled = false
    void (async () => {
      try {
        const cacheData = await _getCache(key)
        if (cancelled) return
        // 获取初始化的data
        if (cacheData && Object.hasOwnProperty.call(cacheData, 'data')) {
          fetchInstance.setState({
            data: cacheData.data,
            params: cacheData.params,
            loading:
              staleTime === -1 || new Date().getTime() - cacheData.time <= staleTime
                ? false
                : fetchInstance.state.loading,
          })
        }
        // 如果存在相同的cacheKey,触发更新
        subscribe(key)
      } catch {
        // Ignore custom cache read failures and keep the request path available.
      }
    })()

    onCleanup(() => {
      cancelled = true
      unSubscribeRef.value?.()
      subscribedKeyRef.value = undefined
    })
  })

  onScopeDispose(() => {
    unSubscribeRef.value?.()
  })

  return {
    name: "cachePlugin",
    onBefore: params => {
      const key = getCacheKey(params)
      if (!key) return {}

      const handleCacheData = (cacheData?: CachedData) => {
        if (!cacheData || !Object.hasOwnProperty.call(cacheData, 'data')) {
          return {}
        }
        // 数据是新鲜就停止请求
        if (staleTime === -1 || new Date().getTime() - cacheData.time <= staleTime) {
          return {
            loading: false,
            data: cacheData?.data,
            returnNow: true,
          }
        } else {
          // 数据不新鲜，则返回data,并且继续发送请求
          return {
            data: cacheData?.data,
          }
        }
      }

      try {
        const cacheData = _getCache(key, params)
        if (isPromiseLike(cacheData)) {
          return cacheData.then(handleCacheData).catch(() => ({}))
        }
        return handleCacheData(cacheData)
      } catch {
        return {}
      }
    },
    onRequest: (service, args) => {
      const key = getCacheKey(args)
      if (!key) return {}

      let servicePromise = cachePromise.getCachePromise(key)
      // 如果存在servicePromise，并且它没有被触发，则使用它
      if (servicePromise && servicePromise !== currentPromiseMap.get(key)) {
        return { servicePromise }
      }

      servicePromise = service(...args)
      currentPromiseMap.set(key, servicePromise)
      cachePromise.setCachePromise(key, servicePromise)
      return { servicePromise }
    },
    onSuccess: (data, params) => {
      const key = getCacheKey(params)
      if (key) {
        // 取消更新，避免反复触发自己
        unSubscribeRef.value?.()
        const cacheResult = _setCache(key, {
          data,
          params,
          time: new Date().getTime(),
        })
        // 触发器更新
        const resubscribe = () => {
          subscribedKeyRef.value = undefined
          subscribe(key)
        }
        if (cacheResult && typeof (cacheResult as Promise<void>).then === 'function') {
          return cacheResult.then(resubscribe)
        }
        resubscribe()
      }
    },
    onMutate: data => {
      const key = getCacheKey(fetchInstance.state.params || [])
      if (key) {
        // 取消更新，避免反复触发自己
        unSubscribeRef.value?.()
        void _setCache(key, {
          data,
          params: fetchInstance.state.params,
          time: new Date().getTime(),
        })
        // 触发器更新
        subscribedKeyRef.value = undefined
        subscribe(key)
      }
    },
  }
}

export default useCachePlugin
