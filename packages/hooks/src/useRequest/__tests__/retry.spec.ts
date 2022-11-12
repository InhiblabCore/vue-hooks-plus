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
