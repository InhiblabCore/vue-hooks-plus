const { mockScreenfull, fsListeners } = vi.hoisted(() => {
  const fsListeners: Array<() => void> = []
  const mockScreenfull: any = {
    isEnabled: true,
    element: undefined as Element | undefined,
    // Real screenfull change events are async; source calls request() then on('change'),
    // so we must fire listeners asynchronously or the event is lost before registration.
    request: vi.fn((el: Element) => {
      mockScreenfull.element = el
      setTimeout(() => mockScreenfull._fire(), 0)
    }),
    exit: vi.fn(() => {
      mockScreenfull.element = undefined
      setTimeout(() => mockScreenfull._fire(), 0)
    }),
    _fire: () => fsListeners.slice().forEach(f => f()),
    on: vi.fn((_ev: string, fn: () => void) => fsListeners.push(fn)),
    off: vi.fn((_ev: string, fn: () => void) => {
      const i = fsListeners.indexOf(fn)
      if (i > -1) fsListeners.splice(i, 1)
    }),
  }
  return { mockScreenfull, fsListeners }
})

vi.mock('screenfull', () => ({ default: mockScreenfull }))

import renderHook from 'test-utils/renderHook'
import useFullscreen from '..'
import { sleep } from 'test-utils/sleep'

describe('useFullscreen', () => {
  beforeEach(() => {
    mockScreenfull.element = undefined
    fsListeners.length = 0
    vi.clearAllMocks()
  })

  it('should request fullscreen, exit and remove listener on unmount', async () => {
    const target = document.createElement('div')
    const [hook, app] = renderHook(() => useFullscreen(target))
    const [, actions] = hook

    actions.enterFullscreen()
    expect(mockScreenfull.request).toHaveBeenCalledWith(target)
    expect(mockScreenfull.on).toHaveBeenCalledWith('change', expect.any(Function))

    actions.exitFullscreen()
    expect(mockScreenfull.exit).toHaveBeenCalledTimes(1)

    app.unmount()
    expect(mockScreenfull.off).toHaveBeenCalledWith('change', expect.any(Function))

    // Drain the two pending setTimeout(0) dispatches from enterFullscreen/exitFullscreen
    // so they don't bleed into the next test and trigger stale callbacks.
    await sleep(10)
  })

  it('enter/exit/toggle with callbacks and state', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const onEnter = vi.fn()
    const onExit = vi.fn()
    const [[state, actions]] = renderHook(() => useFullscreen(target, { onEnter, onExit }))
    expect(state.value).toBe(false)

    actions.enterFullscreen()
    expect(mockScreenfull.request).toHaveBeenCalledWith(target)
    await sleep(10)
    expect(state.value).toBe(true)
    expect(onEnter).toHaveBeenCalledTimes(1)

    actions.exitFullscreen()
    await sleep(10)
    expect(state.value).toBe(false)
    expect(onExit).toHaveBeenCalledTimes(1)
    // After exit the hook should have deregistered its screenfull listener (self-deregistration path)
    expect(mockScreenfull.off).toHaveBeenCalled()

    actions.toggleFullscreen()
    await sleep(10)
    expect(state.value).toBe(true)
    expect(onEnter).toHaveBeenCalledTimes(2)
    expect(actions.isEnabled).toBe(true)
  })
})
