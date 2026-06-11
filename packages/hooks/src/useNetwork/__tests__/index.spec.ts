import renderHook from 'test-utils/renderHook'
import useNetwork from '../index'

describe('useNetwork', () => {
  afterEach(() => {
    delete (navigator as any).connection
  })

  it('toggle network state', () => {
    const [hook] = renderHook(() => useNetwork())
    expect(hook.value.online).toBeTruthy()
  })

  it('flips online flag with offline/online events and stamps since', () => {
    const [state] = renderHook(() => useNetwork())
    expect(state.value.online).toBe(true)
    window.dispatchEvent(new Event('offline'))
    expect(state.value.online).toBe(false)
    expect(state.value.since).toBeInstanceOf(Date)
    window.dispatchEvent(new Event('online'))
    expect(state.value.online).toBe(true)
    expect(state.value.since).toBeInstanceOf(Date)
  })

  it('reads connection properties when navigator.connection exists', () => {
    const listeners: Record<string, () => void> = {}
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: {
        rtt: 50,
        downlink: 10,
        effectiveType: '4g',
        saveData: false,
        addEventListener: (t: string, f: () => void) => {
          listeners[t] = f
        },
        removeEventListener: () => {},
      },
    })
    const [state] = renderHook(() => useNetwork())
    expect(state.value.rtt).toBe(50)
    expect(state.value.effectiveType).toBe('4g')
    listeners['change']?.()
    expect(state.value.downlink).toBe(10)
  })
})
