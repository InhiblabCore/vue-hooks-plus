import { ref } from 'vue'
import { sleep } from '@/utils/sleep'

import useLockFn from '..'

describe('useLockFn', () => {
  const countRef = ref(0)

  const fn = async (step: number) => {
    countRef.value += step
    await sleep(50)
  }
  const locked = useLockFn(fn)

  it('should work', async () => {
    locked(1)
    expect(countRef.value).toBe(1)
    locked(2)
    expect(countRef.value).toBe(1)
    await sleep(30)
    locked(3)
    expect(countRef.value).toBe(1)
    await sleep(30)
    locked(4)
    expect(countRef.value).toBe(5)
    locked(5)
    expect(countRef.value).toBe(5)
  })
})
