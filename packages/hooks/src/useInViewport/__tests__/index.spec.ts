import renderHook from 'test-utils/renderHook'
import useInViewport from '..'

describe('useInViewport', () => {
  let callback: IntersectionObserverCallback
  const observe = vi.fn()
  const disconnect = vi.fn()

  beforeEach(() => {
    observe.mockClear()
    disconnect.mockClear()
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function (cb: IntersectionObserverCallback) {
        callback = cb
        return { observe, disconnect }
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should observe target and expose viewport state', () => {
    const target = document.createElement('div')
    const [hook, app] = renderHook(() => useInViewport(target))
    const [inViewport, ratio] = hook

    expect(observe).toHaveBeenCalledWith(target)

    callback([{ isIntersecting: true, intersectionRatio: 0.5 } as IntersectionObserverEntry], {} as IntersectionObserver)
    expect(inViewport.value).toBe(true)
    expect(ratio.value).toBe(0.5)

    app.unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
