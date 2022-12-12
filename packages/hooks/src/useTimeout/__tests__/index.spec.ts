import renderHook from 'test-utils/renderHook'
import useTimeout from '../index'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number | undefined
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useTimeout(fn, delay))

describe('useTimeout', () => {
  vitest.useFakeTimers()
  vitest.spyOn(global, 'clearTimeout')

  it('timeout should work', () => {
    const callback = vitest.fn()

    setUp({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()
    vitest.advanceTimersByTime(70)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('timeout should stop', () => {
    const callback = vitest.fn()

    setUp({ fn: callback, delay: undefined })
    vitest.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)

    setUp({ fn: callback, delay: -2 })
    vitest.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('timeout should be clear', () => {
    const callback = vitest.fn()

    setUp({ fn: callback, delay: 20 })
    expect(callback).not.toBeCalled()
    vitest.advanceTimersByTime(30)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(clearTimeout).toHaveBeenCalledTimes(0)
  })
})
