import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useWebSocket, { ReadyState } from '..'

class MockWebSocket {
  static instances: MockWebSocket[] = []
  readyState = 0
  onopen: ((e: Event) => void) | null = null
  onclose: ((e: CloseEvent) => void) | null = null
  onmessage: ((e: MessageEvent) => void) | null = null
  onerror: ((e: Event) => void) | null = null
  sent: unknown[] = []
  constructor(public url: string, public protocols?: string | string[]) {
    MockWebSocket.instances.push(this)
  }
  send(data: unknown) {
    this.sent.push(data)
  }
  close() {
    if (this.readyState === 3) return // idempotent: connectWs re-closes previous instance; real WebSocket won't fire close twice
    this.readyState = 3
    this.onclose?.(new CloseEvent('close')) // real WebSockets emit CloseEvent (has code/reason); happy-dom exposes CloseEvent as a global
  }
  _open() {
    this.readyState = 1
    this.onopen?.(new Event('open'))
  }
  _message(data: unknown) {
    this.onmessage?.({ data } as MessageEvent)
  }
  _error() {
    this.readyState = 3
    this.onerror?.(new Event('error'))
  }
}

beforeEach(() => {
  MockWebSocket.instances = []
  vi.stubGlobal('WebSocket', MockWebSocket)
})
afterEach(() => {
  vi.unstubAllGlobals()
})

const last = () => MockWebSocket.instances[MockWebSocket.instances.length - 1]

describe('useWebSocket', () => {
  it('auto connects and tracks open/message', async () => {
    const onOpen = vi.fn()
    const onMessage = vi.fn()
    const [r] = renderHook(() => useWebSocket('ws://test', { onOpen, onMessage }))
    expect(MockWebSocket.instances.length).toBe(1)
    expect(r.readyState.value).toBe(ReadyState.Connecting)
    last()._open()
    expect(r.readyState.value).toBe(ReadyState.Open)
    expect(onOpen).toHaveBeenCalled()
    last()._message('hi')
    expect(r.latestMessage.value?.data).toBe('hi')
    expect(onMessage).toHaveBeenCalled()
  })

  it('sendMessage sends when open and throws when not', () => {
    const [r] = renderHook(() => useWebSocket('ws://test'))
    expect(() => r.sendMessage!('x')).toThrow('WebSocket disconnected')
    last()._open()
    r.sendMessage!('x')
    expect(last().sent).toContain('x')
  })

  it('manual mode connects only on connect()', () => {
    const [r] = renderHook(() => useWebSocket('ws://test', { manual: true }))
    expect(MockWebSocket.instances.length).toBe(0)
    r.connect!()
    expect(MockWebSocket.instances.length).toBe(1)
  })

  it('reconnects on close up to reconnectLimit', async () => {
    renderHook(() =>
      useWebSocket('ws://test', { reconnectLimit: 1, reconnectInterval: 10 }),
    )
    last()._open()
    last().close() // server disconnect → schedule reconnect
    await sleep(50)
    expect(MockWebSocket.instances.length).toBe(2)
    last().close() // disconnect again; reconnectTimes now at limit → no more reconnects
    await sleep(50)
    expect(MockWebSocket.instances.length).toBe(2)
  })

  it('disconnect prevents reconnection', async () => {
    const [r] = renderHook(() =>
      useWebSocket('ws://test', { reconnectLimit: 3, reconnectInterval: 10 }),
    )
    last()._open()
    r.disconnect!()
    await sleep(50)
    expect(MockWebSocket.instances.length).toBe(1)
    expect(r.readyState.value).toBe(ReadyState.Closed)
  })

  it('disconnect clears a pending reconnect timer', async () => {
    const [r] = renderHook(() =>
      useWebSocket('ws://test', { reconnectLimit: 3, reconnectInterval: 30 }),
    )
    last()._open()
    last().close()      // schedules reconnect in 30ms
    r.disconnect!()     // must clear the pending timer
    await sleep(80)
    expect(MockWebSocket.instances.length).toBe(1) // no reconnect happened
  })

  it('onError triggers reconnect and callback', async () => {
    const onError = vi.fn()
    renderHook(() =>
      useWebSocket('ws://test', { onError, reconnectLimit: 1, reconnectInterval: 10 }),
    )
    last()._error()
    expect(onError).toHaveBeenCalled()
    await sleep(50)
    expect(MockWebSocket.instances.length).toBe(2)
  })

  it('ignores events after unmount', () => {
    const onMessage = vi.fn()
    const [r, app] = renderHook(() => useWebSocket('ws://test', { onMessage }))
    const ws = last()
    ws._open()
    app.unmount()
    expect(MockWebSocket.instances[0].readyState).toBe(3) // unmount calls disconnect() → close()
    ws._message('late')
    expect(onMessage).not.toHaveBeenCalled()
    expect(r.latestMessage.value).toBeUndefined()
  })
})
