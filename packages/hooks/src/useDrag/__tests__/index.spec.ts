import useDrag from '..'

const events: Record<string, (event: any) => void> = {}
const mockTarget = {
  addEventListener: vitest.fn((event, callback) => {
    events[event] = callback
  }),
  removeEventListener: vitest.fn(event => {
    Reflect.deleteProperty(events, event)
  }),
  setAttribute: vitest.fn(),
}

describe('useDrag', () => {
  it('should triggle drag callback', () => {
    const onDragStart = vitest.fn()
    const onDragEnd = vitest.fn()
    const mockEvent = {
      dataTransfer: {
        setData: vitest.fn(),
      },
    }

    useDrag(1, mockTarget as any, {
      onDragStart,
      onDragEnd,
    })
    events.dragstart(mockEvent)
    expect(onDragStart).toBeCalled()
    expect(mockEvent.dataTransfer.setData).toBeCalledWith('custom', '1')
    events.dragend(mockEvent)
    expect(onDragEnd).toBeCalled()
  })
})
