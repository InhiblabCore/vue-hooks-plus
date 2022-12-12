import renderHook from 'test-utils/renderHook'
import { ref } from 'vue'
import useTitle from '../index'

describe('useTitle', () => {
  it('should update document title', () => {
    const titleRef = ref('Current Page Title')
    renderHook(() => useTitle(titleRef))

    expect(document.title).toBe('Current Page Title')
    titleRef.value = 'Other Page Title'
    renderHook(() => useTitle(titleRef))
    expect(document.title).toBe('Other Page Title')
  })

  it('should restore document title on unmount', () => {
    document.title = 'Old Title'
    const titleRef = ref('Current Page Title')
    const [_, app] = renderHook(() =>
      useTitle(titleRef, {
        restoreOnUnmount: true,
      }),
    )
    expect(document.title).toBe('Current Page Title')

    app.unmount()

    expect(document.title).toBe('Old Title')
  })

  it('should not restore document title on unmount', () => {
    document.title = 'Old Title'

    const titleRef = ref('Current Page Title')
    const [_, app] = renderHook(() =>
      useTitle(titleRef, {
        restoreOnUnmount: false,
      }),
    )
    expect(document.title).toBe('Current Page Title')

    app.unmount()
    expect(document.title).toBe('Current Page Title')
  })
})
