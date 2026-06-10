import { createPinia, setActivePinia } from 'pinia'
import { BroadcastChannel } from 'broadcast-channel'
import { useRequest } from 'vue-hooks-plus'
import { useFetchingPlugin, useBroadcastChannelPlugin } from '..'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

const okService = (v: string) => new Promise<string>(res => setTimeout(() => res(v), 20))

beforeEach(() => {
  setActivePinia(createPinia())
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
    expect(isFetching).toHaveBeenLastCalledWith(true)
  })

  it('marks error status on failure', async () => {
    const onFetching = vi.fn()
    renderHook(() =>
      useRequest(
        () => Promise.reject(new Error('x')),
        { pluginOptions: { fetchingKey: () => 'k2', onFetching } } as any,
        [useFetchingPlugin as any],
      ),
    )
    await sleep(30)
    const current = onFetching.mock.calls.at(-1)?.[0]
    expect(current.status).toBe('error')
    expect(current.data).toBeNull()
  })
})

describe('useBroadcastChannelPlugin', () => {
  it('broadcasts success result to sibling channels', async () => {
    const received: any[] = []
    const listener = new BroadcastChannel('bc-test-1', { type: 'simulate', webWorkerSupport: false })
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
    await listener.close()
  })

  it('invokes onBroadcastChannel when a message arrives', async () => {
    const sender = new BroadcastChannel('bc-test-2', { type: 'simulate', webWorkerSupport: false })
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
    // Find the call triggered by sender (last call, or first call after initial request)
    const remoteCall = onBroadcastChannel.mock.calls.find(c => c[0]?.data === 'remote')
    expect(remoteCall).toBeDefined()
    expect(remoteCall![0].data).toBe('remote')
    await sender.close()
  })
})
