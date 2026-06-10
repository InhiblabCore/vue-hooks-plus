import { nextTick } from 'vue'
import { useWorker, WORKER_STATUS } from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

type Behavior = 'success' | 'error' | 'silent'
let behavior: Behavior = 'success'

class MockWorker {
  _url?: string
  onmessage: ((e: { data: [string, unknown] }) => void) | null = null
  onerror: ((e: unknown) => void) | null = null
  constructor(public url: string) {}
  postMessage([args]: [unknown[]]) {
    setTimeout(() => {
      if (behavior === 'success') this.onmessage?.({ data: ['SUCCESS', args] })
      else if (behavior === 'error') this.onmessage?.({ data: ['ERROR', new Error('worker failed')] })
      // silent: 不回复，供 timeout / kill 测试
    }, 10)
  }
  terminate() {}
}

beforeAll(() => {
  vi.stubGlobal('Worker', MockWorker)
  URL.createObjectURL = vi.fn(() => `blob:mock-${Math.random()}`)
  URL.revokeObjectURL = vi.fn()
})
afterAll(() => {
  vi.unstubAllGlobals()
})

const statusOf = (controller: any) => controller.status.value as WORKER_STATUS

describe('useWorker', () => {
  it('runs and resolves with SUCCESS status (echo mock returns args)', async () => {
    behavior = 'success'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n * 2))
    const p = run(21)
    expect(statusOf(controller)).toBe(WORKER_STATUS.RUNNING)
    await expect(p).resolves.toEqual([21])
    expect(statusOf(controller)).toBe(WORKER_STATUS.SUCCESS)
  })

  it('rejects and sets ERROR status', async () => {
    behavior = 'error'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n))
    await expect(run(1)).rejects.toBeInstanceOf(Error)
    expect(statusOf(controller)).toBe(WORKER_STATUS.ERROR)
  })

  it('kill() terminates a running worker', async () => {
    behavior = 'silent'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n))
    run(1).catch(() => {})
    expect(statusOf(controller)).toBe(WORKER_STATUS.RUNNING)
    ;(controller as any).kill.value()
    expect(statusOf(controller)).toBe(WORKER_STATUS.KILLED)
  })

  it('expires with TIMEOUT_EXPIRED when worker never answers', async () => {
    behavior = 'silent'
    const [[run, controller]] = renderHook(() => useWorker((n: number) => n, { timeout: 30 }))
    run(1).catch(() => {})
    await sleep(80)
    expect(statusOf(controller)).toBe(WORKER_STATUS.TIMEOUT_EXPIRED)
  })

  it('refuses a second run while one is in flight', async () => {
    behavior = 'silent'
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const [[run]] = renderHook(() => useWorker((n: number) => n))
    run(1).catch(() => {})
    await nextTick() // isRunning 经 watchEffect 同步，需等一个 tick
    await expect(run(2)).rejects.toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})
