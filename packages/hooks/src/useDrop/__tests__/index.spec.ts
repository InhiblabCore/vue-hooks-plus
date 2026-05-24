import renderHook from 'test-utils/renderHook'
import useDrop from '..'

function createTransfer(data: Record<string, string>) {
  return {
    files: [],
    items: [],
    getData: (type: string) => data[type] || '',
  } as unknown as DataTransfer
}

describe('useDrop', () => {
  it('should handle dropped uri and cleanup listeners', () => {
    const target = document.createElement('div')
    const onUri = vitest.fn()
    const onDrop = vitest.fn()

    const [, app] = renderHook(() => useDrop(target, { onUri, onDrop }))
    const event = new Event('drop') as DragEvent
    Object.defineProperty(event, 'dataTransfer', {
      value: createTransfer({ 'text/uri-list': 'https://example.com' }),
    })

    target.dispatchEvent(event)

    expect(onUri).toHaveBeenCalledWith('https://example.com', event)
    expect(onDrop).toHaveBeenCalledWith(event)

    app.unmount()
    target.dispatchEvent(event)
    expect(onDrop).toHaveBeenCalledTimes(1)
  })

  it('should parse custom DOM payloads', () => {
    const target = document.createElement('div')
    const onDom = vitest.fn()

    renderHook(() => useDrop(target, { onDom }))
    const event = new Event('drop') as DragEvent
    Object.defineProperty(event, 'dataTransfer', {
      value: createTransfer({ custom: JSON.stringify({ id: 1 }) }),
    })

    target.dispatchEvent(event)
    expect(onDom).toHaveBeenCalledWith({ id: 1 }, event)
  })
})
