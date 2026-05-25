import renderHook from 'test-utils/renderHook'
import useLocalStorageState from '..'

describe('useLocalStorageState', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should read, write, update and remove localStorage state', () => {
    const [hook] = renderHook(() => useLocalStorageState<number>('local-count', { defaultValue: 1 }))
    const [state, setState] = hook

    expect(state.value).toBe(1)

    setState(prev => (prev ?? 0) + 1)
    expect(state.value).toBe(2)
    expect(localStorage.getItem('local-count')).toBe('2')

    setState(undefined)
    expect(state.value).toBeUndefined()
    expect(localStorage.getItem('local-count')).toBeNull()
  })

  it('should deserialize empty string values', () => {
    localStorage.setItem('empty-string', JSON.stringify(''))
    const [hook] = renderHook(() => useLocalStorageState<string>('empty-string'))

    expect(hook[0].value).toBe('')
  })
})
