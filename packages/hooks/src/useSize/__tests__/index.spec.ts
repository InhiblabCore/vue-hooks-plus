import { nextTick } from 'vue'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useSize from '..'

let roCallback: ((entries: unknown[]) => void) | undefined

class MockResizeObserver {
  constructor(cb: (entries: unknown[]) => void) {
    roCallback = cb
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
})
afterEach(() => {
  vi.unstubAllGlobals()
  roCallback = undefined
})

const setClientSize = (el: Element, w: number, h: number) => {
  Object.defineProperty(el, 'clientWidth', { configurable: true, value: w })
  Object.defineProperty(el, 'clientHeight', { configurable: true, value: h })
}

describe('useSize', () => {
  it('should not work when target is null', () => {
    renderHook(() => useSize(null))
  })

  it('reads initial size on mount', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    setClientSize(el, 100, 50)
    const [size] = renderHook(() => useSize(el))
    await nextTick()
    await nextTick()
    expect(size.width.value).toBe(100)
    expect(size.height.value).toBe(50)
    document.body.removeChild(el)
  })

  it('updates size when ResizeObserver fires', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    setClientSize(el, 100, 50)
    const [size] = renderHook(() => useSize(el))
    await nextTick()
    await nextTick()
    setClientSize(el, 200, 80)
    roCallback?.([])
    await sleep(30)
    expect(size.width.value).toBe(200)
    expect(size.height.value).toBe(80)
    document.body.removeChild(el)
  })

  it('updates size on window resize event', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    setClientSize(el, 100, 50)
    const [size] = renderHook(() => useSize(el))
    await nextTick()
    await nextTick()
    setClientSize(el, 300, 90)
    window.dispatchEvent(new Event('resize'))
    await sleep(30)
    expect(size.width.value).toBe(300)
    document.body.removeChild(el)
  })
})
