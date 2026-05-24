import { shallowRef } from 'vue'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useRequest, { clearUseRequestCache } from '..'
import { CachedData } from '../utils/cache'

describe('useRequest/cache', () => {
  beforeEach(() => {
    clearUseRequestCache()
  })

  it('should resolve cacheKey from request params', async () => {
    const service = vitest.fn(async (id: number) => `data-${id}`)

    const [hook] = renderHook(() =>
      useRequest(service, {
        manual: true,
        cacheKey: params => `user-${params?.[0]}`,
        staleTime: -1,
      }),
    )

    await hook.runAsync(1)
    await hook.runAsync(1)
    await hook.runAsync(2)

    expect(service).toHaveBeenCalledTimes(2)
    expect(hook.data.value).toBe('data-2')
  })

  it('should support async custom getCache and setCache', async () => {
    const store = new Map<string, CachedData<string, [number]>>()
    const service = vitest.fn(async (id: number) => `remote-${id}`)

    const [hook] = renderHook(() =>
      useRequest(service, {
        manual: true,
        cacheKey: params => `async-${params?.[0]}`,
        staleTime: -1,
        getCache: async params => {
          await sleep(10)
          return store.get(`async-${params[0]}`)
        },
        setCache: async data => {
          await sleep(10)
          store.set(`async-${data.params[0]}`, data)
        },
      }),
    )

    await hook.runAsync(1)
    await hook.runAsync(1)

    expect(service).toHaveBeenCalledTimes(1)
    expect(hook.data.value).toBe('remote-1')
  })

  it('should continue request when async custom getCache rejects', async () => {
    const service = vitest.fn(async () => 'remote')

    const [hook] = renderHook(() =>
      useRequest(service, {
        manual: true,
        cacheKey: 'reject-cache',
        getCache: async () => {
          throw new Error('cache unavailable')
        },
      }),
    )

    await hook.runAsync()

    expect(service).toHaveBeenCalledTimes(1)
    expect(hook.data.value).toBe('remote')
  })

  it('should sync shallowRef initialData when data mutates', () => {
    const initialData = shallowRef({ count: 1 })

    const [hook] = renderHook(() =>
      useRequest(async () => ({ count: 2 }), {
        manual: true,
        initialData,
      }),
    )

    expect(hook.data.value).toBe(initialData.value)

    hook.mutate({ count: 3 })

    expect(initialData.value).toEqual({ count: 3 })
  })
})
