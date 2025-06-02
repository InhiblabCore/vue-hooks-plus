import { sleep } from 'test-utils/sleep'
import useDebounceFn from '..'
import renderHook from 'test-utils/renderHook'

let count = 0
const debounceFn = (gap: number) => {
  count += gap
}

describe('useDebounceFn', () => {
  it('run, cancel and flush should work', async () => {
    const [{ run, cancel, flush }] = renderHook(() => useDebounceFn(debounceFn, { wait: 100 }))
    run(2)
    run(2)
    run(2)
    run(2)
    run(2)
    expect(count).toBe(0)
    await sleep(300)
    expect(count).toBe(2)

    run(4)
    await sleep(300)
    run(4)
    expect(count).toBe(6)

    cancel()
    expect(count).toBe(6)
    await sleep(300)
    expect(count).toBe(6)

    run(1)
    expect(count).toBe(6)
    flush()
    expect(count).toBe(7)
    await sleep(300)
    expect(count).toBe(7)
  })

  it('should support leading option', async () => {
    let value = 0
    const fn = (v: number) => { value += v }
    const [{ run }] = renderHook(() => useDebounceFn(fn, { wait: 100, leading: true, trailing: false }))
    run(1)
    expect(value).toBe(1)
    run(1)
    run(1)
    expect(value).toBe(1)
    await sleep(150)
    run(2)
    expect(value).toBe(3)
  })

  it('should support trailing option', async () => {
    let value = 0
    const fn = (v: number) => { value += v }
    const [{ run }] = renderHook(() => useDebounceFn(fn, { wait: 100, leading: false, trailing: true }))
    run(1)
    run(2)
    run(3)
    expect(value).toBe(0)
    await sleep(150)
    expect(value).toBe(3)
  })

  it('should support maxWait option', async () => {
    let value = 0
    const fn = (v: number) => { value += v }
    const [{ run }] = renderHook(() => useDebounceFn(fn, { wait: 100, maxWait: 200 }))
    run(1)
    setTimeout(() => run(2), 50)
    setTimeout(() => run(3), 120)
    await sleep(250)
    expect(value).toBe(3)
  })

  it('should update options dynamically', async () => {
    let value = 0
    const fn = (v: number) => { value += v }
    const [{ run, updateOptions }] = renderHook(() => useDebounceFn(fn, { wait: 200 }))
    run(1)
    await sleep(100)
    updateOptions({ wait: 50 })
    await sleep(0)
    run(2)
    await sleep(60)
    expect(value).toBe(2)
  })
})
