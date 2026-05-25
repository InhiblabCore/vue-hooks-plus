import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useInfiniteScroll from '..'

describe('useInfiniteScroll', () => {
  it('should reload and append data when loading more', async () => {
    const service = vitest
      .fn()
      .mockResolvedValueOnce({ list: [1] })
      .mockResolvedValueOnce({ list: [2], nextId: 2 })

    const [hook] = renderHook(() => useInfiniteScroll(service, { manual: true }))

    await hook.reloadAsync()
    expect(hook.data.value?.list).toEqual([1])

    await hook.loadMoreAsync()
    expect(hook.data.value?.list).toEqual([1, 2])
  })

  it('should keep previous data when reload fails', async () => {
    const service = vitest
      .fn()
      .mockResolvedValueOnce({ list: [1] })
      .mockRejectedValueOnce(new Error('reload failed'))
    const onError = vitest.fn()

    const [hook] = renderHook(() => useInfiniteScroll(service, { manual: true, onError }))

    await hook.reloadAsync()
    await expect(hook.reloadAsync()).rejects.toThrow('reload failed')
    await sleep(0)

    expect(hook.data.value?.list).toEqual([1])
    expect(onError).toHaveBeenCalled()
  })
})
