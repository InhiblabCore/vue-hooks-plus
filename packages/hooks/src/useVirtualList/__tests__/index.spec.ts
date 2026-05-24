import { ref } from 'vue'
import renderHook from 'test-utils/renderHook'
import useVirtualList from '..'

describe('useVirtualList', () => {
  it('should calculate visible items and scroll to index', () => {
    const wrapper = document.createElement('div')
    const containerEl = document.createElement('div')
    Object.defineProperty(containerEl, 'clientHeight', { value: 50, configurable: true })
    Object.defineProperty(containerEl, 'scrollTop', { value: 0, writable: true, configurable: true })
    const list = ref(Array.from({ length: 20 }, (_, index) => index))
    const wrapperTarget = ref(wrapper)

    const [hook] = renderHook(() => useVirtualList(list, { wrapperTarget, itemHeight: 10, overscan: 1 }))
    const [targetList, container, scrollTo] = hook

    container.ref(containerEl)
    container.onScroll({ preventDefault: vitest.fn() })

    expect(targetList.value.map(item => item.data)).toEqual([0, 1, 2, 3, 4, 5, 6])
    expect(wrapper.style.height).toBe('200px')

    scrollTo(10)
    expect(containerEl.scrollTop).toBe(100)
    expect(targetList.value[0].index).toBe(10)
  })

  it('should cache variable item heights during range calculation', () => {
    const wrapper = document.createElement('div')
    const containerEl = document.createElement('div')
    Object.defineProperty(containerEl, 'clientHeight', { value: 25, configurable: true })
    Object.defineProperty(containerEl, 'scrollTop', { value: 0, writable: true, configurable: true })
    const list = ref(Array.from({ length: 10 }, (_, index) => index))
    const wrapperTarget = ref(wrapper)
    const itemHeight = vitest.fn((index: number) => index + 10)

    const [hook] = renderHook(() => useVirtualList(list, { wrapperTarget, itemHeight, overscan: 1 }))
    const [targetList, container, scrollTo] = hook

    container.ref(containerEl)
    container.onScroll({ preventDefault: vitest.fn() })
    const callsAfterFirstScroll = itemHeight.mock.calls.length

    container.onScroll({ preventDefault: vitest.fn() })
    expect(itemHeight.mock.calls.length).toBe(callsAfterFirstScroll)

    scrollTo(4)
    expect(containerEl.scrollTop).toBe(46)
    expect(targetList.value.some(item => item.index === 4)).toBe(true)
  })
})
