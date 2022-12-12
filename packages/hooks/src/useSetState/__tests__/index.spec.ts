import renderHook from 'test-utils/renderHook'
import useSetState from '../index'

describe('useSetState', () => {
  const setUp = <T extends object>(initialValue: T) =>
    renderHook(() => {
      const [state, setState] = useSetState<T>(initialValue)
      return {
        state,
        setState,
      } as const
    })

  it('should support initialValue', () => {
    const [hook] = setUp({
      hello: 'world',
    })
    expect(hook.state.value).toEqual({ hello: 'world' })
  })

  it('should support object', () => {
    const [hook] = setUp<any>({
      hello: 'world',
    })
    hook.setState({ foo: 'bar' })
    expect(hook.state.value).toEqual({ hello: 'world', foo: 'bar' })
  })

  it('should support function update', () => {
    const [hook] = setUp({
      count: 0,
    })
    hook.setState({ count: hook.state.value.count + 1 })
    expect(hook.state.value).toEqual({ count: 1 })
  })
})
