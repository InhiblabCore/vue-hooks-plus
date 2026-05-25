import renderHook from 'test-utils/renderHook'
import useSessionStorageState from '..'

describe('useSessionStorageState', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('should persist state in sessionStorage', () => {
    const [hook] = renderHook(() => useSessionStorageState('session-key', { defaultValue: 'a' }))
    const [state, setState] = hook

    expect(state.value).toBe('a')
    setState('b')

    expect(state.value).toBe('b')
    expect(sessionStorage.getItem('session-key')).toBe(JSON.stringify('b'))
  })
})
