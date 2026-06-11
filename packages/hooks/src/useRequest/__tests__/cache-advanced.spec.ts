import useRequest from '..'
import { clearCache as clearRequestCache, getCache as getRawCache } from '../utils/cache'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

const makeService = () => {
  const calls = { count: 0 }
  const service = (v: string = 'ok') =>
    new Promise<string>(res => setTimeout(() => res(`${v}-${++calls.count}`), 20))
  return { service, calls }
}

describe('useRequest cache advanced', () => {
  beforeEach(() => clearRequestCache())

  it('fresh cache (staleTime) prevents a new request on remount', async () => {
    const { service, calls } = makeService()
    const [r1, app1] = renderHook(() => useRequest(service, { cacheKey: 'adv-1', staleTime: 10000 }))
    await sleep(60)
    expect(r1.data.value).toBe('ok-1')
    app1.unmount()
    const [r2] = renderHook(() => useRequest(service, { cacheKey: 'adv-1', staleTime: 10000 }))
    expect(r2.data.value).toBe('ok-1')
    expect(r2.loading.value).toBe(false)
    await sleep(60)
    expect(calls.count).toBe(1)
  })

  it('stale cache returns data immediately but revalidates', async () => {
    const { service, calls } = makeService()
    const [, app1] = renderHook(() => useRequest(service, { cacheKey: 'adv-2' }))
    await sleep(60)
    app1.unmount()
    const [r2] = renderHook(() => useRequest(service, { cacheKey: 'adv-2' }))
    expect(r2.data.value).toBe('ok-1')
    expect(r2.loading.value).toBe(true)
    await sleep(60)
    expect(calls.count).toBe(2)
    expect(r2.data.value).toBe('ok-2')
  })

  it('concurrent mounts share one in-flight promise', async () => {
    const { service, calls } = makeService()
    const [a, appA] = renderHook(() => useRequest(service, { cacheKey: 'adv-3' }))
    const [b, appB] = renderHook(() => useRequest(service, { cacheKey: 'adv-3' }))
    await sleep(80)
    expect(calls.count).toBe(1)
    expect(a.data.value).toBe('ok-1')
    expect(b.data.value).toBe('ok-1')
    appA.unmount()
    appB.unmount()
  })

  it('mounted instances stay in sync through cache subscription', async () => {
    const { service } = makeService()
    const [a, appA] = renderHook(() => useRequest(service, { cacheKey: 'adv-4' }))
    await sleep(60)
    const [b, appB] = renderHook(() => useRequest(service, { cacheKey: 'adv-4', manual: true }))
    await sleep(0) // let async watchEffect path initialize cache for b
    expect(b.data.value).toBe('ok-1')
    a.refresh()
    await sleep(60)
    expect(b.data.value).toBe('ok-2')
    appA.unmount()
    appB.unmount()
  })

  it('custom sync setCache/getCache replace internal cache', async () => {
    const store = new Map<string, any>()
    const { service, calls } = makeService()
    const opts = {
      cacheKey: 'adv-5',
      staleTime: 10000,
      setCache: (d: any) => store.set('adv-5', d),
      getCache: () => store.get('adv-5'),
    }
    const [, app1] = renderHook(() => useRequest(service, opts as any))
    await sleep(60)
    expect(store.get('adv-5')?.data).toBe('ok-1')
    app1.unmount()
    const [r2] = renderHook(() => useRequest(service, opts as any))
    await sleep(60)
    expect(calls.count).toBe(1)
    expect(r2.data.value).toBe('ok-1')
  })

  it('cacheKey as function derives key from params', async () => {
    const { service } = makeService()
    const [r] = renderHook(() =>
      useRequest(service, {
        cacheKey: (params?: any[]) => `adv-fn-${params?.[0] ?? 'd'}`,
        defaultParams: ['x'],
      }),
    )
    await sleep(60)
    expect(r.data.value).toBe('x-1')
    expect(getRawCache('adv-fn-x')?.data).toBe('x-1')
  })

  it('mutate writes through to cache', async () => {
    const { service } = makeService()
    const [r, app] = renderHook(() => useRequest(service, { cacheKey: 'adv-6' }))
    await sleep(60)
    r.mutate('mutated')
    expect(getRawCache('adv-6')?.data).toBe('mutated')
    app.unmount()
  })

  it('failed request clears shared cachePromise (rejection path)', async () => {
    let calls = 0
    const failing = () => {
      calls++
      return Promise.reject(new Error('cache-fail'))
    }
    // cachePromise.ts discards its .then().catch() chain return value; when the promise
    // rejects, the re-throw in .catch() produces an unhandled rejection. Vitest 4 skips
    // its own unhandledRejection reporter when processListeners('unhandledRejection').length > 1
    // (see vitest/dist/chunks/init — "if there is another listener, assume handled by user code").
    // A no-op listener here raises the count past 1, suppressing the error report.
    const suppressUnhandled = (): void => {}
    process.on('unhandledRejection', suppressUnhandled)
    // Fetch.ts calls console.error when no onError is provided; suppress that output.
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const [r, app] = renderHook(() => useRequest(failing as any, { cacheKey: 'adv-7' }))
    await sleep(30)
    expect(r.error.value).toBeInstanceOf(Error)
    r.refresh() // cachePromise already cleared → new request
    await sleep(30)
    expect(calls).toBe(2)
    consoleSpy.mockRestore()
    process.off('unhandledRejection', suppressUnhandled)
    app.unmount()
  })
})
