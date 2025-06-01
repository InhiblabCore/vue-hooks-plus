import renderHook from 'test-utils/renderHook'
import useElementBounding from '..'
import { ref, nextTick } from 'vue'
import { UseElementBoundingReturnType } from '../index'

// mock getBoundingClientRect for predictable values
function mockRect(left: number, top: number, width: number, height: number) {
  return {
    width,
    height,
    top,
    left,
    bottom: top + height,
    right: left + width,
    x: left,
    y: top,
    toJSON: () => ({ left, top, width, height, bottom: top + height, right: left + width, x: left, y: top }),
  }
}

describe('useElementBounding', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return mockRect(20, 10, 100, 50)
    }
  })

  it('should return all zeros when element is not mounted', () => {
    const el = ref<HTMLElement>()
    const [bounding] = renderHook(() => useElementBounding(el))
    expect(bounding.width.value).toBe(0)
    expect(bounding.height.value).toBe(0)
    expect(bounding.top.value).toBe(0)
    expect(bounding.left.value).toBe(0)
    expect(bounding.bottom.value).toBe(0)
    expect(bounding.right.value).toBe(0)
  })

  it('should return correct bounding values after element is mounted', async () => {
    const el = ref<HTMLElement>()
    const [bounding] = renderHook(() => useElementBounding(el))
    const div = document.createElement('div')
    el.value = div
    await nextTick()
    expect(bounding.width.value).toBe(100)
    expect(bounding.height.value).toBe(50)
    expect(bounding.top.value).toBe(10)
    expect(bounding.left.value).toBe(20)
    expect(bounding.bottom.value).toBe(60)
    expect(bounding.right.value).toBe(120)
  })

  it('should update values when element size or position changes', async () => {
    let rect = mockRect(20, 10, 100, 50)
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return rect
    }
    const el = ref<HTMLElement>()
    const [bounding] = renderHook(() => useElementBounding(el))
    const div = document.createElement('div')
    el.value = div
    await nextTick()
    expect(bounding.width.value).toBe(100)
    rect = mockRect(15, 5, 200, 80)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(bounding.width.value).toBe(200)
    expect(bounding.height.value).toBe(80)
    expect(bounding.top.value).toBe(5)
    expect(bounding.left.value).toBe(15)
    expect(bounding.bottom.value).toBe(85)
    expect(bounding.right.value).toBe(215)
  })

  it('should not reset values to zero if reset option is false', async () => {
    // 保证 mockRect 是 100
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return mockRect(20, 10, 100, 50)
    }
    const el = ref<HTMLElement>()
    const [bounding] = renderHook(() => useElementBounding(el, { reset: false }))
    const div = document.createElement('div')
    el.value = div
    await nextTick()
    expect(bounding.width.value).toBe(100)
    el.value = undefined
    await nextTick()
    expect(bounding.width.value).toBe(100)
  })

  it('should not update on window resize/scroll if corresponding option is false', async () => {
    let rect = mockRect(20, 10, 100, 50)
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return rect
    }
    const el = ref<HTMLElement>()
    const [bounding] = renderHook(() => useElementBounding(el, { windowResize: false, windowScroll: false }))
    const div = document.createElement('div')
    el.value = div
    await nextTick()
    expect(bounding.width.value).toBe(100)
    rect = mockRect(40, 30, 300, 150)
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('scroll'))
    await nextTick()
    // Should not update
    expect(bounding.width.value).toBe(100)
  })

  it('should have correct return type', () => {
    const el = ref<HTMLElement>()
    const [callbackOptions] = renderHook(() => useElementBounding(el))
    assertType<UseElementBoundingReturnType>(callbackOptions)
  })
})
