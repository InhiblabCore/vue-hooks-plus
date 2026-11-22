import renderHook from 'test-utils/renderHook'
import useScroll from '..'

describe('useScroll', () => {
  afterEach(() => {
    if (document.scrollingElement) {
      delete (document.scrollingElement as any).scrollLeft
      delete (document.scrollingElement as any).scrollTop
    }
  })

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

  it('tracks document scroll using scrollingElement', () => {
    // happy-dom sets document.scrollingElement = document.documentElement
    Object.defineProperty(document.scrollingElement!, 'scrollLeft', {
      configurable: true,
      value: 0,
    })
    Object.defineProperty(document.scrollingElement!, 'scrollTop', {
      configurable: true,
      value: 0,
    })

    const [position] = renderHook(() => useScroll(document))
    expect(position.value).toEqual({ left: 0, top: 0 })

    document.dispatchEvent(new Event('scroll'))
    expect(position.value).toEqual({ left: 0, top: 0 })
  })

  it('cleans up scroll listener on unmount', () => {
    const target = document.createElement('div')
    Object.defineProperty(target, 'scrollLeft', { configurable: true, value: 5, writable: true })
    Object.defineProperty(target, 'scrollTop', { configurable: true, value: 5, writable: true })

    const [position, app] = renderHook(() => useScroll(target))
    expect(position.value).toEqual({ left: 5, top: 5 })

    app.unmount()
    // After unmount, scroll events should not update position
    target.scrollLeft = 99
    target.scrollTop = 99
    target.dispatchEvent(new Event('scroll'))
    expect(position.value).toEqual({ left: 5, top: 5 })
  })
})
