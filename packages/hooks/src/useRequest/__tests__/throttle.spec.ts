import renderHook from 'test-utils/renderHook'
import useRequest from '../useRequest'

describe('useRequest/Throttle', () => {
  vitest.useFakeTimers()

  it('useThrottlePlugin should work', async () => {
    const callback = vitest.fn()

    const [{ run }] = renderHook(() =>
      useRequest(
        callback,
        {
          manual: true,
          throttleWait: 100,
        },
      ),
    )

    run()
    vitest.advanceTimersByTime(50)
    run()
    vitest.advanceTimersByTime(50)
    run()
    vitest.advanceTimersByTime(50)
    run()
    vitest.advanceTimersByTime(40)

    // expect(callback).toHaveBeenCalledTimes(2)
  })
})
