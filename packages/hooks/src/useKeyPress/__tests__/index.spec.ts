import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useKeyPress from '..'

describe('useKeyPress', () => {
  it('should match key filters and cleanup listeners', async () => {
    const handler = vitest.fn()
    const target = document.createElement('div')

    const [, app] = renderHook(() => useKeyPress('ctrl.a', handler, { target, exactMatch: true }))
    await sleep(0)

    const matchedEvent = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true })
    Object.defineProperty(matchedEvent, 'keyCode', { value: 65 })
    target.dispatchEvent(matchedEvent)

    const extraModifierEvent = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, shiftKey: true })
    Object.defineProperty(extraModifierEvent, 'keyCode', { value: 65 })
    target.dispatchEvent(extraModifierEvent)

    expect(handler).toHaveBeenCalledTimes(1)

    app.unmount()
    const afterUnmountEvent = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true })
    Object.defineProperty(afterUnmountEvent, 'keyCode', { value: 65 })
    target.dispatchEvent(afterUnmountEvent)
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
