import { setCache, getCache, clearCache, getCacheAll } from '../utils/cache'
import { subscribe, trigger, otherSubscribe } from '../utils/cacheSubscribe'
import { getCachePromise, setCachePromise } from '../utils/cachePromise'
import { sleep } from 'test-utils/sleep'

describe('cache utils', () => {
  afterEach(() => clearCache())

  it('setCache/getCache roundtrip and expiry', async () => {
    setCache('cu-1', 30, { data: 1, params: [], time: Date.now() })
    expect(getCache('cu-1')?.data).toBe(1)
    await sleep(60)
    expect(getCache('cu-1')).toBeUndefined()
  })

  it('cacheTime -1 never schedules expiry; re-set replaces data', async () => {
    setCache('cu-2', -1, { data: 'a', params: [], time: Date.now() })
    setCache('cu-2', -1, { data: 'b', params: [], time: Date.now() })
    await sleep(20)
    expect(getCache('cu-2')?.data).toBe('b')
  })

  it('getCacheAll snapshots entries; clearCache supports key/array/all', () => {
    setCache('cu-a', 1000, { data: 1, params: [], time: Date.now() })
    setCache('cu-b', 1000, { data: 2, params: [], time: Date.now() })
    expect(Object.keys(getCacheAll())).toEqual(expect.arrayContaining(['cu-a', 'cu-b']))
    clearCache('cu-a')
    expect(getCache('cu-a')).toBeUndefined()
    clearCache(['cu-b'])
    expect(getCache('cu-b')).toBeUndefined()
    setCache('cu-c', 1000, { data: 3, params: [], time: Date.now() })
    clearCache()
    expect(getCache('cu-c')).toBeUndefined()
  })
})

describe('cacheSubscribe', () => {
  it('subscribe/trigger/unsubscribe, plus otherSubscribe side channel', () => {
    const l1 = vi.fn()
    const other = vi.fn()
    const un1 = subscribe('cs-k', l1)
    const unOther = otherSubscribe(other)
    trigger('cs-k', 'v')
    expect(l1).toHaveBeenCalledWith('v')
    expect(other).toHaveBeenCalledWith({ type: 'cs-k', data: 'v' })
    un1()
    unOther()
    trigger('cs-k', 'v2')
    expect(l1).toHaveBeenCalledTimes(1)
    expect(other).toHaveBeenCalledTimes(1)
  })
})

describe('cachePromise', () => {
  it('stores promise and clears it after resolution', async () => {
    const p = Promise.resolve(1)
    setCachePromise('cp-k', p)
    expect(getCachePromise('cp-k')).toBe(p)
    await p
    await sleep(0)
    expect(getCachePromise('cp-k')).toBeUndefined()
  })
})
