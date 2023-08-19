import renderHook from 'test-utils/renderHook'
import useElementBounding from '..'
import { ref } from 'vue'
import { UseElementBoundingReturnType } from '../index'

describe('useElementBounding', () => {
  it('callback element info', () => {
    const el = ref<HTMLElement>()
    const [callbackOptions] = renderHook(() => useElementBounding(el))

    assertType<UseElementBoundingReturnType>(callbackOptions)
  })
})
