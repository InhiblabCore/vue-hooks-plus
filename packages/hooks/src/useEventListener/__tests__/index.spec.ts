import renderHook from 'test-utils/renderHook'
import useEventListener from '..'

describe('useEventListener', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })
  it('test on click listener', async () => {
    let state = 0
    const onClick = () => {
      state++
    }
    useEventListener('click', onClick, { target: () => container })

    document.body.click()
    expect(state).toEqual(0)
    container.click()
    expect(state).toEqual(1)
    document.body.click()
    expect(state).toEqual(1)
  })

  it('should listen to window resize event', async () => {
    let called = false
    const onResize = () => {
      called = true
    }
    useEventListener('resize', onResize, { target: window })
    window.dispatchEvent(new Event('resize'))
    expect(called).toBe(true)
  })

  it('should listen to document keydown event', async () => {
    let key = ''
    const onKeyDown = (e: KeyboardEvent) => {
      key = e.key
    }
    useEventListener('keydown', onKeyDown, { target: document })
    const event = new KeyboardEvent('keydown', { key: 'a' })
    document.dispatchEvent(event)
    expect(key).toBe('a')
  })

  it('should support once option', async () => {
    let count = 0
    let triggered = false
    const onClick = () => {
      if (!triggered) {
        count++
        triggered = true
      }
    }
    useEventListener('click', onClick, { target: () => container, once: true })
    container.click()
    container.click()
    expect(count).toBe(1)
  })

  it('should support passive option', async () => {
    let called = false
    const onWheel = () => {
      called = true
    }
    useEventListener('wheel', onWheel, { target: () => container, passive: true })
    const event = new Event('wheel')
    container.dispatchEvent(event)
    expect(called).toBe(true)
  })

  it('should support capture option', async () => {
    const phase: string[] = []
    const onCapture = () => phase.push('capture')
    const onBubble = () => phase.push('bubble')
    useEventListener('click', onCapture, { target: () => container, capture: true })
    container.addEventListener('click', onBubble)
    container.click()
    expect(phase[0]).toBe('capture')
    expect(phase[1]).toBe('bubble')
    container.removeEventListener('click', onBubble)
  })

  it('should remove event listener after unmount', async () => {
    let count = 0
    const onClick = () => {
      count++
    }
    const [, app] = renderHook(() => useEventListener('click', onClick, { target: () => container }))
    container.click()
    expect(count).toBe(1)
    app.unmount()
    container.click()
    expect(count).toBe(1)
  })

  it('should not throw if target is null', async () => {
    expect(() => {
      renderHook(() => useEventListener('click', () => { }, { target: null as any }))
    }).not.toThrow()
  })
})
