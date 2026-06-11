import { createPinia, setActivePinia } from 'pinia'
import { BroadcastChannel } from 'broadcast-channel'
import { useRequest } from 'vue-hooks-plus'
import { useFetchingPlugin, useBroadcastChannelPlugin } from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

const okService = (v: string) => new Promise<string>(res => setTimeout(() => res(v), 20))

// All BroadcastChannel instances created in tests; closed unconditionally in afterEach.
const _channels: BroadcastChannel[] = []
function makeChannel(name: string, opts?: object): BroadcastChannel {
  const ch = new BroadcastChannel(name, opts)
  _channels.push(ch)
  return ch
}

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(async () => {
  await Promise.all(_channels.map(ch => ch.close()))
  _channels.length = 0
})

describe('useFetchingPlugin', () => {
  it('reports success through onFetching and isFetching', async () => {
    const onFetching = vi.fn()
    const isFetching = vi.fn()
    renderHook(() =>
      useRequest(
        () => okService('a'),
        { pluginOptions: { fetchingKey: () => 'k1', onFetching, isFetching } } as any,
        [useFetchingPlugin as any],
      ),
    )
    await sleep(60)
    expect(onFetching).toHaveBeenCalled()
    const current = onFetching.mock.calls[0][0]
    expect(current.status).toBe('success')
    expect(current.data).toBe('a')
    // Per the store's isFetchingAll implementation, `true` means "all registered keys
    // completed successfully" (not in-flight); this is a source-semantics quirk.
    expect(isFetching).toHaveBeenLastCalledWith(true)
  })

  it('marks error status on failure', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const onFetching = vi.fn()
    renderHook(() =>
      useRequest(
        () => Promise.reject(new Error('x')),
        { pluginOptions: { fetchingKey: () => 'k2', onFetching } } as any,
        [useFetchingPlugin as any],
      ),
    )
    await sleep(30)
    consoleSpy.mockRestore()
    const current = onFetching.mock.calls.at(-1)?.[0]
    expect(current.status).toBe('error')
    expect(current.data).toBeNull()
  })
})

describe('useBroadcastChannelPlugin', () => {
  it('broadcasts success result to sibling channels', async () => {
    const received: any[] = []
    const listener = makeChannel('bc-test-1', { type: 'simulate', webWorkerSupport: false })
    listener.onmessage = msg => received.push(msg)
    renderHook(() =>
      useRequest(
        () => okService('payload'),
        {
          pluginOptions: {
            broadcastChannel: 'bc-test-1',
            broadcastChannelKey: 'k',
            broadcastChannelOptions: { type: 'simulate', webWorkerSupport: false },
          },
        } as any,
        [useBroadcastChannelPlugin as any],
      ),
    )
    await sleep(100)
    expect(received.length).toBeGreaterThan(0)
    expect(received[0].data).toBe('payload')
    expect(received[0].broadcastChannelKey).toBe('k')
  })

  it('invokes onBroadcastChannel when a message arrives', async () => {
    const sender = makeChannel('bc-test-2', { type: 'simulate', webWorkerSupport: false })
    const onBroadcastChannel = vi.fn()
    renderHook(() =>
      useRequest(
        () => okService('init'),
        {
          pluginOptions: {
            broadcastChannel: 'bc-test-2',
            broadcastChannelOptions: { type: 'simulate', webWorkerSupport: false },
            onBroadcastChannel,
          },
        } as any,
        [useBroadcastChannelPlugin as any],
      ),
    )
    await sleep(30)
    await sender.postMessage({ type: 'sync', data: 'remote' })
    await sleep(50)
    expect(onBroadcastChannel).toHaveBeenCalled()
    // In simulate mode the plugin's own channel receives its own onSuccess broadcast
    // (self-broadcast), so onBroadcastChannel is called with the internal result first.
    // We search for the call carrying the externally-sent data to isolate the receive path.
    const remoteCall = onBroadcastChannel.mock.calls.find(c => c[0]?.data === 'remote')
    expect(remoteCall).toBeDefined()
    expect(remoteCall![0].data).toBe('remote')
  })
})
