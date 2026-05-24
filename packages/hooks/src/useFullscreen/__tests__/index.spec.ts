const screenfullMock = vi.hoisted(() => ({
  isEnabled: true,
  element: undefined as Element | undefined,
  request: vitest.fn((el: Element) => {
    screenfullMock.element = el
  }),
  exit: vitest.fn(() => {
    screenfullMock.element = undefined
  }),
  on: vitest.fn(),
  off: vitest.fn(),
}))

vi.mock('screenfull', () => ({ default: screenfullMock }))

import renderHook from 'test-utils/renderHook'
import useFullscreen from '..'

describe('useFullscreen', () => {
  beforeEach(() => {
    screenfullMock.element = undefined
    screenfullMock.request.mockClear()
    screenfullMock.exit.mockClear()
    screenfullMock.on.mockClear()
    screenfullMock.off.mockClear()
  })

  it('should request fullscreen, exit and remove listener on unmount', () => {
    const target = document.createElement('div')
    const [hook, app] = renderHook(() => useFullscreen(target))
    const [, actions] = hook

    actions.enterFullscreen()
    expect(screenfullMock.request).toHaveBeenCalledWith(target)
    expect(screenfullMock.on).toHaveBeenCalledWith('change', expect.any(Function))

    actions.exitFullscreen()
    expect(screenfullMock.exit).toHaveBeenCalledTimes(1)

    app.unmount()
    expect(screenfullMock.off).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
