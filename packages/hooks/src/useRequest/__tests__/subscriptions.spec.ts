import useRequest from '../useRequest'
import limit from '../utils/limit'
import subscribeFocus from '../utils/subscribeFocus'
import subscribeReVisible from '../utils/subscribeReVisible'
import isOnline from '../utils/isOnline'
import isDocumentVisible from '../utils/isDocumentVisible'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'

const setVisibility = (v: 'visible' | 'hidden') => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => v })
}
const restoreVisibility = () => {
  delete (document as any).visibilityState
}
afterEach(restoreVisibility)

describe('limit', () => {
  it('blocks calls within timespan and recovers after', async () => {
    const fn = vi.fn()
    const limited = limit(fn, 30)
    limited(1)
    limited(2)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)
    await sleep(60)
    limited(3)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('isOnline / isDocumentVisible', () => {
  it('reflects document/navigator state', () => {
    expect(isOnline()).toBe(true)
    expect(isDocumentVisible()).toBe(true)
    setVisibility('hidden')
    expect(isDocumentVisible()).toBe(false)
  })
})

describe('subscribeFocus', () => {
  it('notifies on window focus and stops after unsubscribe', () => {
    const l = vi.fn()
    const un = subscribeFocus(l)
    window.dispatchEvent(new Event('focus'))
    expect(l).toHaveBeenCalledTimes(1)
    un()
    window.dispatchEvent(new Event('focus'))
    expect(l).toHaveBeenCalledTimes(1)
  })

  it('skips notification while document is hidden', () => {
    const l = vi.fn()
    const un = subscribeFocus(l)
    setVisibility('hidden')
    window.dispatchEvent(new Event('focus'))
    expect(l).not.toHaveBeenCalled()
    un()
  })
})

describe('subscribeReVisible', () => {
  it('notifies on visibilitychange when visible', () => {
    const l = vi.fn()
    const un = subscribeReVisible(l)
    window.dispatchEvent(new Event('visibilitychange'))
    expect(l).toHaveBeenCalledTimes(1)
    un()
  })

  it('stops notifying after unsubscribe', () => {
    const l = vi.fn()
    const un = subscribeReVisible(l)
    window.dispatchEvent(new Event('visibilitychange'))
    expect(l).toHaveBeenCalledTimes(1)
    un()
    window.dispatchEvent(new Event('visibilitychange'))
    expect(l).toHaveBeenCalledTimes(1)
  })
})

describe('refreshOnWindowFocus option', () => {
  it('refreshes the request when window regains focus', async () => {
    let count = 0
    const service = () => new Promise<number>(res => setTimeout(() => res(++count), 10))
    const [, app] = renderHook(() => useRequest(service, { refreshOnWindowFocus: true, focusTimespan: 1 }))
    await sleep(40)
    expect(count).toBe(1)
    window.dispatchEvent(new Event('focus'))
    await sleep(40)
    expect(count).toBe(2)
    app.unmount()
  })
})
