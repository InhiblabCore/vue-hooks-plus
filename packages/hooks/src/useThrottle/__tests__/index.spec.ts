import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import { ref } from 'vue'
import useThrottle from '../index'

describe('useThrottle', () => {
  it('default useThrottle should work', async () => {
    const mountedState = ref(1)
    const [throttledValue] = renderHook(() => useThrottle(mountedState, { wait: 500 }))
    expect(throttledValue.value).toEqual(1)
    mountedState.value = 2
    mountedState.value = 3
    await sleep(250)
    mountedState.value = 4
    await sleep(260)
    expect(throttledValue.value).toEqual(4)
  })

  it('leading:false & trailing:false of options useThrottle should work', async () => {
    const mountedState = ref(0)

    const [throttledValue] = renderHook(() =>
      useThrottle(mountedState, { wait: 500, leading: false, trailing: false }),
    )

    //Never get the latest value
    mountedState.value = 1
    expect(throttledValue.value).toEqual(0)
    mountedState.value = 2
    mountedState.value = 3
    await sleep(250)
    expect(throttledValue.value).toEqual(0)
    mountedState.value = 4
    await sleep(260)
    expect(mountedState.value).toEqual(4)
  })


})
