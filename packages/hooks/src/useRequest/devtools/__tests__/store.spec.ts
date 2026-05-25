import devToolsStore from '../store'

describe('useRequest devtools store', () => {
  afterEach(() => {
    devToolsStore.reset()
  })

  it('should unsubscribe safely and keep reset scoped to selected key', () => {
    const listener = vitest.fn()
    const unsubscribe = devToolsStore.subscribe(listener)

    unsubscribe()
    unsubscribe()
    devToolsStore.emit({ key: 'request-a' })
    expect(listener).not.toHaveBeenCalled()

    devToolsStore.insert('request-a', { instance: {}, requestName: 'a' })
    devToolsStore.insert('request-b', { instance: {}, requestName: 'b' })
    devToolsStore.reset('request-a')

    expect(devToolsStore.getAll().has('request-a')).toBe(true)
    expect(devToolsStore.getAll().has('request-b')).toBe(false)
  })
})
