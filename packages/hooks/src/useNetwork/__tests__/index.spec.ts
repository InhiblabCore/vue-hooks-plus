import renderHook from 'test-utils/renderHook'
import useNetwork from '../index'

describe('useNetwork', () => {
  it('toggle network state', () => {
    const [hook] = renderHook(() => useNetwork())
    expect(hook.online).toBeTruthy()
  })
})
