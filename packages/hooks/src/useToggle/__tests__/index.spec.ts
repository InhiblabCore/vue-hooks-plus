import renderHook from 'test-utils/renderHook'
import useToggle from '../index'

const callToggle = (hook: any) => {
  hook[1].toggle()
}

describe('useToggle', () => {
  it('test on init', async () => {
    const [hook] = renderHook(() => useToggle())
    expect(hook[0].value).toBeFalsy()
  })

  it('test on methods', async () => {
    const [hook] = renderHook(() => useToggle('Hello'))
    expect(hook[0].value).toEqual('Hello')
    hook[1].toggle()
    expect(hook[0].value).toBeFalsy()
    hook[1].setLeft()
    expect(hook[0].value).toEqual('Hello')
    hook[1].setRight()
    expect(hook[0].value).toBeFalsy()
  })

  it('test on optional', () => {
    const [hook] = renderHook(() => useToggle('Hello', 'World'))
    callToggle(hook)
    expect(hook[0].value).toEqual('World')
    hook[1].set('World')
    expect(hook[0].value).toEqual('World')
    callToggle(hook)
    expect(hook[0].value).toEqual('Hello')
  })
})
