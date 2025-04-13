import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useThrottleFn from '../index'

describe('useThrottleFn', () => {
  it('run.value, cancel and flush should work', async () => {
    let count = 0
    const throttleFn = () => {
      count++
    }
    const [hook] = renderHook(() => useThrottleFn(throttleFn, { wait: 500 }))
    hook.run?.()
    expect(count).toBe(1)
    hook.run?.()
    hook.run?.()
    hook.run?.()
    expect(count).toBe(1)
    await sleep(450) // t: 450
    hook.run?.()
    expect(count).toBe(1)
    await sleep(100) // t: 550
    hook.run?.()
    expect(count).toBe(2)
    hook.run?.()
    hook.run?.()
    await sleep(500) // t: 1050
    expect(count).toBe(3)
    hook.run?.()
    hook.run?.()
    hook.cancel?.()
    await sleep(500) // t: 1550
    expect(count).toBe(4)
    hook.run?.()
    hook.run?.()
    expect(count).toBe(5)
    hook.flush?.()
    expect(count).toBe(6)
    await sleep(550) // t: 2100
    expect(count).toBe(6)
  })
})
