import renderHook from 'test-utils/renderHook'
import useRequest from '../useRequest'
import { sleep } from '@/utils/sleep'

describe('useRequest/Throttle', () => {


  it('useThrottlePlugin should work', async () => {
    let mountedState = 0
    const [{ run }] = renderHook(() =>
      useRequest(
        () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              mountedState++
              resolve(`${String(Date.now())}`)
            }, 100)
          })
        },
        {
          manual: true,
          throttleWait: 200,
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

    expect(1).toEqual(mountedState)
  })
})
