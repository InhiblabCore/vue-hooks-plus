import renderHook from 'test-utils/renderHook'
import useDrag from '..'

const events: Record<string, (event: any) => void> = {}
const mockTarget = {
  addEventListener: vi.fn((event, callback) => {
    events[event] = callback
  }),
  removeEventListener: vi.fn(event => {
    Reflect.deleteProperty(events, event)
  }),
  setAttribute: vi.fn(),
}

describe('useDrag', () => {
  it('should triggle drag callback', () => {
    const onDragStart = vi.fn()
    const onDragEnd = vi.fn()
    const mockEvent = {
      dataTransfer: {
        setData: vi.fn(),
      },
    }

    renderHook(() =>
      useDrag(1, mockTarget as any, {
        onDragStart,
        onDragEnd,
      }),
    )
    events.dragstart(mockEvent)
    expect(onDragStart).toBeCalled()
    expect(mockEvent.dataTransfer.setData).toBeCalledWith('custom', '1')
    events.dragend(mockEvent)
    expect(onDragEnd).toBeCalled()
  })

  it('sets draggable attribute and writes data on dragstart with real DOM', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const onDragStart = vi.fn()
    const onDragEnd = vi.fn()
    renderHook(() => useDrag({ id: 7 }, target, { onDragStart, onDragEnd }))
    expect(target.getAttribute('draggable')).toBe('true')

    const setData = vi.fn()
    const start = new Event('dragstart', { bubbles: true }) as any
    start.dataTransfer = { setData }
    target.dispatchEvent(start)
    expect(onDragStart).toHaveBeenCalled()
    expect(setData).toHaveBeenCalledWith('custom', JSON.stringify({ id: 7 }))

    target.dispatchEvent(new Event('dragend', { bubbles: true }))
    expect(onDragEnd).toHaveBeenCalled()
  })

  it('respects draggable: false option', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    renderHook(() => useDrag('d', target, { draggable: false }))
    expect(target.getAttribute('draggable')).toBe('false')
  })
})
