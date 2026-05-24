import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useWinResize from '..'

describe('useWinResize', () => {
  it('should run callback on resize and cleanup', async () => {
    const action = vitest.fn()
    const [, app] = renderHook(() => useWinResize(action))

    window.dispatchEvent(new Event('resize'))
    await sleep(0)
    expect(action).toHaveBeenCalledTimes(1)

    app.unmount()
    window.dispatchEvent(new Event('resize'))
    await sleep(0)
    expect(action).toHaveBeenCalledTimes(1)
  })
})
