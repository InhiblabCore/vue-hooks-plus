import renderHook from 'test-utils/renderHook'
import useHover from '..'

describe('useHover', () => {
  it('should update hover state and call callbacks', () => {
    const target = document.createElement('div')
    const onEnter = vitest.fn()
    const onLeave = vitest.fn()
    const onChange = vitest.fn()

    const [hovering, app] = renderHook(() => useHover(target, { onEnter, onLeave, onChange }))

    target.dispatchEvent(new MouseEvent('mouseenter'))
    expect(hovering.value).toBe(true)
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(true)

    target.dispatchEvent(new MouseEvent('mouseleave'))
    expect(hovering.value).toBe(false)
    expect(onLeave).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(false)

    app.unmount()
    target.dispatchEvent(new MouseEvent('mouseenter'))
    expect(onEnter).toHaveBeenCalledTimes(1)
  })
})
