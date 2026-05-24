import renderHook from 'test-utils/renderHook'
import useScroll from '..'

describe('useScroll', () => {
  it('should update scroll position when target scrolls', () => {
    const target = document.createElement('div')
    Object.defineProperty(target, 'scrollLeft', { value: 12, writable: true })
    Object.defineProperty(target, 'scrollTop', { value: 34, writable: true })

    const [position, app] = renderHook(() => useScroll(target))

    expect(position.value).toEqual({ left: 12, top: 34 })

    target.scrollLeft = 20
    target.scrollTop = 40
    target.dispatchEvent(new Event('scroll'))

    expect(position.value).toEqual({ left: 20, top: 40 })

    app.unmount()
  })

  it('should respect shouldUpdate controller', () => {
    const target = document.createElement('div')
    Object.defineProperty(target, 'scrollLeft', { value: 0, writable: true })
    Object.defineProperty(target, 'scrollTop', { value: 0, writable: true })

    const [position] = renderHook(() => useScroll(target, value => value.top > 10))
    expect(position.value).toBeUndefined()

    target.scrollTop = 11
    target.dispatchEvent(new Event('scroll'))
    expect(position.value).toEqual({ left: 0, top: 11 })
  })
})
