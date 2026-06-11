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

  it('tracks cursor coordinates on mousemove without target', () => {
    const [state, app] = renderHook(() => useMouse())
    document.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 10, clientY: 20, screenX: 30, screenY: 40 }),
    )
    expect(state.value.clientX).toBe(10)
    expect(state.value.clientY).toBe(20)
    expect(state.value.screenX).toBe(30)
    expect(state.value.screenY).toBe(40)
    // pageX falls back to clientX + scrollOffset(0) = 10
    expect(state.value.pageX).toBe(10)
    app.unmount()
  })

  it('computes element-relative coordinates with target', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const [state, app] = renderHook(() => useMouse(target))
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 15, clientY: 25 }))
    // happy-dom getBoundingClientRect returns all-zero rect (left=0, top=0, width=0, height=0).
    // pageX = event.pageX(0, falsy) || clientX(15) + pageXOffset(0) = 15
    // pageY = event.pageY(0, falsy) || clientY(25) + pageYOffset(0) = 25
    // elementPosX = left(0) + pageXOffset(0) = 0  →  elementX = pageX(15) - 0 = 15
    // elementPosY = top(0)  + pageYOffset(0) = 0  →  elementY = pageY(25) - 0 = 25
    // elementW = width(0)
    expect(state.value.elementX).toBe(15)
    expect(state.value.elementY).toBe(25)
    expect(state.value.elementW).toBe(0)
    app.unmount()
  })
})
