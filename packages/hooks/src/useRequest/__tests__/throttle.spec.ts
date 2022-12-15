import renderHook from 'test-utils/renderHook'
import useRequest from '../useRequest'

function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${String(Date.now())}`)
    }, 1000)
  })
}
describe('useRequest/Throttle', () => {
  vitest.useFakeTimers()

  it('useThrottlePlugin should work', async () => {
    const callback = vitest.fn()

    const [{ run }] = renderHook(() =>
      useRequest(
        () => {
          callback()
          return getUsername()
        },
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

    expect(callback).toHaveBeenCalledTimes(2)
  })
})
