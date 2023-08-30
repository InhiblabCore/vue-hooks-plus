import renderHook from 'test-utils/renderHook'
import useMutationObserver from '..'
import { ref } from 'vue'

describe('useMutationObserver', () => {
  it('stop mutation observer', () => {
    const el = ref<HTMLElement>()
    const [callbackOptions] = renderHook(() => useMutationObserver(el, () => {}))
    const { stop } = callbackOptions

    expect(stop).toBeDefined()
  })

  it('is supported', () => {
    const el = ref<HTMLElement>()
    const [callbackOptions] = renderHook(() => useMutationObserver(el, () => {}))
    const { isSupported } = callbackOptions

    assertType<boolean>(isSupported.value)
  })
})
