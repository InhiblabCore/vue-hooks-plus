import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useWebSocket, { ReadyState } from '..'

class MockWebSocket {
  static instances: MockWebSocket[] = []

  readyState = ReadyState.Connecting
  onopen?: (event: Event) => void
  onclose?: (event: CloseEvent) => void
  onmessage?: (event: MessageEvent) => void
  onerror?: (event: Event) => void
  send = vitest.fn()
  close = vitest.fn(() => {
    this.readyState = ReadyState.Closed
    this.onclose?.(new CloseEvent('close'))
  })

  constructor(public url: string) {
    MockWebSocket.instances.push(this)
  }

  open() {
    this.readyState = ReadyState.Open
    this.onopen?.(new Event('open'))
  }

  message(data: string) {
    this.onmessage?.({ data } as MessageEvent)
  }
}

describe('useWebSocket', () => {
  beforeEach(() => {
    MockWebSocket.instances = []
    vi.stubGlobal('WebSocket', MockWebSocket)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should connect, send messages, receive latest message and close on unmount', async () => {
    const onOpen = vitest.fn()
    const onMessage = vitest.fn()
    const [hook, app] = renderHook(() => useWebSocket('ws://localhost', { onOpen, onMessage }))
    const socket = MockWebSocket.instances[0]

    socket.open()
    expect(hook.readyState.value).toBe(ReadyState.Open)
    expect(onOpen).toHaveBeenCalledTimes(1)

    hook.sendMessage?.('hello')
    expect(socket.send).toHaveBeenCalledWith('hello')

    socket.message('pong')
    await sleep(0)
    expect(hook.latestMessage.value?.data).toBe('pong')
    expect(onMessage).toHaveBeenCalledTimes(1)

    app.unmount()
    await sleep(0)
    expect(socket.close).toHaveBeenCalled()
  })
})
