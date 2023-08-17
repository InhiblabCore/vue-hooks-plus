import renderHook from 'test-utils/renderHook'
import useResizeObserver from '..'
import { ref } from 'vue'

describe('useResizeObserver', () => {
  it('stop resize observer', () => {
    const el = ref<HTMLElement>()
    const [callbackOptions] = renderHook(() => useResizeObserver(el, () => {}))
    const { stop } = callbackOptions

    expect(stop).toBeDefined()
  })

  it('is supported', () => {
    const el = ref<HTMLElement>()
    const [callbackOptions] = renderHook(() => useResizeObserver(el, () => {}))
    const { isSupported } = callbackOptions

    assertType<boolean>(isSupported.value)
  })
})
