import useInterval from '..'

describe('useInterval', () => {
  vitest.useFakeTimers()
  vitest.spyOn(global, 'clearInterval')

  it('interval should work', () => {
    const callback = vitest.fn()
    useInterval(callback, 20)
    expect(callback).not.toBeCalled()
    vitest.advanceTimersByTime(70)
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('interval should stop', () => {
    const callback = vitest.fn()

    useInterval(callback, undefined)
    vitest.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)

    useInterval(callback, -2)
    vitest.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('immediate in options should work', () => {
    const callback = vitest.fn()
    useInterval(callback, 20, { immediate: true })

    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    vitest.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(3)
  })
})
