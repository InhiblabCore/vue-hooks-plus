import { nextTick } from 'vue'
import useUrlState from '..'
import renderHook from 'test-utils/renderHook'

describe('useUrlState', () => {
  beforeEach(() => {
    location.hash = ''
    localStorage.clear()
  })

  it('should use initial state and write it to location.hash', () => {
    const [state] = renderHook(() => useUrlState({ page: 1 }))
    expect(state.value.page).toBe(1)
    expect(location.hash).toContain('page=1')
  })

  it('should parse initial state from hash and override defaults', () => {
    location.hash = '#/list?page=3&keyword=vue'
    const [state] = renderHook(() => useUrlState({ page: 1, keyword: '' }))
    expect(state.value.page).toBe(3) // detectNumber defaults true → number
    expect(state.value.keyword).toBe('vue')
  })

  it('should keep string when detectNumber is false', () => {
    location.hash = '#?v=42'
    const [state] = renderHook(() => useUrlState({ v: '' }, { detectNumber: false }))
    expect(state.value.v).toBe('42')
  })

  it('should decode keyword values like true/false/null', () => {
    location.hash = '#?flag=true&empty=null'
    const [state] = renderHook(() => useUrlState<any>({ flag: false, empty: '' }))
    expect(state.value.flag).toBe(true)
    expect(state.value.empty).toBeNull()
  })

  it('should sync state changes through custom routerPush', async () => {
    const pushed: string[] = []
    location.hash = '#/home?count=1'
    const [state] = renderHook(() =>
      useUrlState({ count: 1 }, { routerPush: url => pushed.push(url) }),
    )
    expect(pushed[0]).toBe('/home?count=1') // watch immediate
    state.value.count = 5
    await nextTick()
    expect(pushed[pushed.length - 1]).toBe('/home?count=5')
  })

  it('should drop keys set to undefined from the url', async () => {
    const pushed: string[] = []
    location.hash = '#/p?a=1'
    const [state] = renderHook(() =>
      useUrlState<any>({ a: 1 }, { routerPush: url => pushed.push(url) }),
    )
    state.value.a = undefined
    await nextTick()
    expect(pushed[pushed.length - 1]).toBe('/p?') // qs.stringify discards undefined
  })

  it('should read initial state from localStorage when url has no params', () => {
    localStorage.setItem('url-state-k', JSON.stringify({ a: 7 }))
    const [state] = renderHook(() => useUrlState({ a: 1 }, { localStorageKey: 'url-state-k' }))
    expect(state.value.a).toBe(7)
  })

  it('should prefer url params over localStorage', () => {
    localStorage.setItem('url-state-k2', JSON.stringify({ a: 7 }))
    location.hash = '#?a=3'
    const [state] = renderHook(() => useUrlState({ a: 1 }, { localStorageKey: 'url-state-k2' }))
    expect(state.value.a).toBe(3)
  })
})
