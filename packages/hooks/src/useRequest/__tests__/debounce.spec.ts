import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

import useRequest from '..'

let count = 0

function getUsername(): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      count = count + 1
      resolve(count)
    }, 100)
  })
}

describe('useRequest/Debounce', () => {
  it('should Debounce work', async () => {
    const [{ data, run }] = renderHook(() =>
      useRequest(() => getUsername(), {
        debounceWait: 100,
        manual: true,
      }),
    )
    run()
    expect(data?.value).toBeUndefined()
    await sleep(100)
    expect(data?.value).toBeUndefined()
    await sleep(100)
    expect(data?.value).toBe(count)
    const target = count
    run()
    run()
    run()
    run()
    run()
    expect(data?.value).toBe(target)
    await sleep(100)

    await sleep(100)
    await sleep(150)
    expect(data?.value).toBe(target + 1)
  })
})
