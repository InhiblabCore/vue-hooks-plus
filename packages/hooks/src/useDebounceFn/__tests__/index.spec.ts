import { sleep } from '@/utils/sleep'
import useDebounceFn from '..'

let count = 0
const debounceFn = (gap: number) => {
  count += gap
}

describe('useDebounceFn', () => {
  it('run, cancel and flush should work', async () => {
    const { run, cancel, flush } = useDebounceFn(debounceFn, { wait: 200 })
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
})
