import { ref } from 'vue'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useTrackedEffect from '..'

describe('useTrackedEffect', () => {
  it('should report changed dependency indexes', async () => {
    const first = ref(1)
    const second = ref('a')
    const effect = vitest.fn()

    renderHook(() => useTrackedEffect(effect, [first, second]))

    first.value = 2
    await sleep(0)
    expect(effect).toHaveBeenLastCalledWith([0])

    second.value = 'b'
    await sleep(0)
    expect(effect).toHaveBeenLastCalledWith([1])
  })
})
