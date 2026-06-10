import renderHook from 'test-utils/renderHook'
import useDrop from '..'

function createTransfer(data: Record<string, string>) {
  return {
    files: [],
    items: [],
    getData: (type: string) => data[type] || '',
  } as unknown as DataTransfer
}

const makeDropEvent = (data: Record<string, string>, files: File[] = []) => {
  const event = new Event('drop', { bubbles: true, cancelable: true }) as any
  event.dataTransfer = {
    getData: (k: string) => data[k] ?? '',
    files,
    items: [],
  }
  return event
}

describe('useDrop', () => {
  it('should handle dropped uri and cleanup listeners', () => {
    const target = document.createElement('div')
    const onUri = vi.fn()
    const onDrop = vi.fn()

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
    const onDom = vi.fn()

    renderHook(() => useDrop(target, { onDom }))
    const event = new Event('drop') as DragEvent
    Object.defineProperty(event, 'dataTransfer', {
      value: createTransfer({ custom: JSON.stringify({ id: 1 }) }),
    })

    target.dispatchEvent(event)
    expect(onDom).toHaveBeenCalledWith({ id: 1 }, event)
  })

  it('dispatches onFiles for dropped files', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const onFiles = vi.fn()
    renderHook(() => useDrop(target, { onFiles }))
    const file = new File(['a'], 'a.txt')
    target.dispatchEvent(makeDropEvent({}, [file]))
    expect(onFiles).toHaveBeenCalled()
    expect(onFiles.mock.calls[0][0]).toHaveLength(1)
  })

  it('dispatches onText for pasted text via items', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const onText = vi.fn()
    renderHook(() => useDrop(target, { onText }))
    const event = new Event('paste', { bubbles: true }) as any
    event.clipboardData = {
      getData: () => '',
      files: [],
      items: [{ getAsString: (cb: (s: string) => void) => cb('hello') }],
    }
    target.dispatchEvent(event)
    expect(onText).toHaveBeenCalledWith('hello', expect.anything())
  })

  it('fires dragenter/dragover/dragleave/onDrop callbacks', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const onDragEnter = vi.fn()
    const onDragOver = vi.fn()
    const onDragLeave = vi.fn()
    const onDrop = vi.fn()
    renderHook(() => useDrop(target, { onDragEnter, onDragOver, onDragLeave, onDrop }))

    const enterEvent = new Event('dragenter', { bubbles: true, cancelable: true }) as any
    // dragenter handler sets dragEnterTarget = event.target; in happy-dom event.target
    // is set to the dispatching element, so dragleave from the same element will match.
    target.dispatchEvent(enterEvent)
    expect(onDragEnter).toHaveBeenCalled()

    target.dispatchEvent(new Event('dragover', { bubbles: true, cancelable: true }))
    expect(onDragOver).toHaveBeenCalled()

    // dragleave only fires onDragLeave when event.target === dragEnterTarget (same element)
    target.dispatchEvent(new Event('dragleave', { bubbles: true }))
    expect(onDragLeave).toHaveBeenCalled()

    target.dispatchEvent(makeDropEvent({}))
    expect(onDrop).toHaveBeenCalled()
  })
})
