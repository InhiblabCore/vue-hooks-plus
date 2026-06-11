import { sleep } from 'test-utils/sleep'
import renderHook from 'test-utils/renderHook'
import { ref } from 'vue'
import useRequest from '../useRequest'

function getUsername(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`error`)
    }, 1000)
  })
}

describe('useRequest/Retry', () => {
  const count = ref(0)
  renderHook(() =>
    useRequest(() => getUsername(), {
      retryCount: 3,
      onError: () => {
        count.value += 1
      },
    }),
  )
  it('should init 0', () => {
    expect(count.value).toBe(0)
  })

  it('should auto work', async () => {
    await sleep(1000)
    expect(count.value).toBe(1)
    await sleep(3100)
    expect(count.value).toBe(2)
  })
})

describe('retry extra branches', () => {
  it('honors custom retryInterval and stops after retryCount', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    let calls = 0
    const service = () => {
      calls++
      return Promise.reject(new Error('always'))
    }
    const [, app] = renderHook(() => useRequest(service, { retryCount: 2, retryInterval: 10 }))
    await sleep(150)
    expect(calls).toBe(3) // 1 + 2 retries
    consoleError.mockRestore()
    app.unmount()
  })

  it('cancel() clears a pending retry timer', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    let calls = 0
    const service = () => {
      calls++
      return Promise.reject(new Error('always'))
    }
    const [r, app] = renderHook(() => useRequest(service, { retryCount: 3, retryInterval: 30 }))
    await sleep(10)
    r.cancel()
    await sleep(120)
    expect(calls).toBe(1)
    consoleError.mockRestore()
    app.unmount()
  })
})
