import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useMouse from '..'

describe('useMouse', () => {
  it('should track document mouse position and element-relative position', async () => {
    const target = document.createElement('div')
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 20,
      width: 100,
      height: 50,
      right: 110,
      bottom: 70,
      x: 10,
      y: 20,
      toJSON: () => {},
    })

    const [state, app] = renderHook(() => useMouse(target))
    await sleep(0)
    const event = new Event('mousemove') as MouseEvent
    Object.defineProperties(event, {
      screenX: { value: 1 },
      screenY: { value: 2 },
      clientX: { value: 30 },
      clientY: { value: 40 },
      pageX: { value: 30 },
      pageY: { value: 40 },
    })
    document.dispatchEvent(event)

    expect(state.value.clientX).toBe(30)
    expect(state.value.elementX).toBe(20)
    expect(state.value.elementY).toBe(20)
    expect(state.value.elementW).toBe(100)

    app.unmount()
  })
})
