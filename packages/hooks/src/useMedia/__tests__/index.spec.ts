import renderHook from 'test-utils/renderHook'
import useMedia from '..'

describe('useMedia', () => {
  const listeners: Array<() => void> = []

  beforeEach(() => {
    listeners.length = 0
    const matches = false
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
      media: query,
      matches,
      onchange: null,
      addListener: (listener: () => void) => listeners.push(listener),
      removeListener: (listener: () => void) => {
        const index = listeners.indexOf(listener)
        if (index > -1) listeners.splice(index, 1)
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList))
    Object.defineProperty(window.matchMedia('(min-width: 1px)'), 'matches', {
      get: () => matches,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should subscribe and cleanup media query listeners', () => {
    const [, app] = renderHook(() => useMedia(['(min-width: 1px)'], ['wide'], 'narrow'))

    expect(listeners).toHaveLength(1)
    app.unmount()
    expect(listeners).toHaveLength(0)
  })
})
