import renderHook from 'test-utils/renderHook'
import useRequest from '../useRequest'
import { sleep } from '@/utils/sleep'

describe('useRequest/Throttle', () => {


  it('useThrottlePlugin should work', async () => {
    let mountedState = 0
    const [{ run }] = renderHook(() =>
      useRequest(
        async () => {
          return mountedState++
        },
        {
          manual: true,
          throttleWait: 100,
        },
      ),
    )

    run()
    await sleep(60)
    run()
    await sleep(60)
    run()
    await sleep(60)
    run()
    await sleep(60)

    expect(3).toEqual(mountedState)
  })
})
