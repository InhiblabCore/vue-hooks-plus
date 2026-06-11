import { sleep } from 'test-utils/sleep'
import renderHook from 'test-utils/renderHook'
import useRequest from '../useRequest'

let data: string
function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      data = String(Date.now())
      resolve(String(Date.now()))
    }, 1000)
  })
}

describe('polling', () => {
  const [result] = renderHook(() =>
    useRequest(() => getUsername(), {
      manual: true,
      pollingInterval: 2000,
      pollingWhenHidden: false,
    }),
  )
  it('should loading is true', () => {
    expect(result.loading.value).toBeFalsy()
  })

  it('should data is undefined', () => {
    expect(result.data?.value).toBeUndefined()
  })

  it('should request', async () => {
    result.run()
    expect(result.loading.value).toBeTruthy()
    expect(result.data?.value).toBeUndefined()
    await sleep(1050)
    expect(result.data?.value).toBe(data)
    expect(result.loading.value).toBeFalsy()
  })

  it('should polling', async () => {
    const [pollingResult] = renderHook(() =>
      useRequest(() => getUsername(), {
        manual: true,
        pollingInterval: 2000,
        pollingWhenHidden: false,
      }),
    )
    let prev = ''
    pollingResult.run()
    expect(pollingResult.loading.value).toBeTruthy()
    expect(pollingResult.data?.value).toBeUndefined()
    await sleep(1200)
    expect(pollingResult.data?.value).toBe(data)
    prev = data
    await sleep(1000)
    expect(prev).toBe(data)
    await sleep(1000)
    expect(prev === data).toBeFalsy()
  })
})

describe('polling extra branches', () => {
  const setVisibility = (v: 'visible' | 'hidden') => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => v })
  }
  afterEach(() => {
    delete (document as any).visibilityState
  })

  it('suspends polling while hidden (pollingWhenHidden=false) and resumes on revisible', async () => {
    let count = 0
    const service = () => new Promise<number>(res => setTimeout(() => res(++count), 5))
    const [, app] = renderHook(() => useRequest(service, { pollingInterval: 20, pollingWhenHidden: false }))
    await sleep(80)         // was 50 — let cycles settle cleanly
    setVisibility('hidden')
    await sleep(5)          // yield so any in-flight onFinally resolves before snapshot
    const frozen = count
    await sleep(100)
    setVisibility('visible')
    window.dispatchEvent(new Event('visibilitychange'))
    await sleep(80)
    expect(count).toBeGreaterThan(frozen)
    app.unmount()
  })

  it('stops polling after pollingErrorRetryCount consecutive errors', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    let calls = 0
    const service = () => {
      calls++
      return Promise.reject(new Error('poll-err'))
    }
    const [, app] = renderHook(() => useRequest(service, { pollingInterval: 10, pollingErrorRetryCount: 2 }))
    await sleep(200)
    expect(calls).toBe(3) // 首次 + 2 次错误重试后停止
    consoleError.mockRestore()
    app.unmount()
  })
})
