import { useImmer } from '..'

describe('useImmer', () => {
  it('should update state via draft function', () => {
    const [state, update] = useImmer({ count: 0, nested: { a: 1 } })
    update(draft => {
      draft.count++
    })
    expect(state.value.count).toBe(1)
    expect(state.value.nested.a).toBe(1)
  })

  it('should keep previous snapshot untouched', () => {
    const [state, update] = useImmer({ list: [1, 2] })
    const before = state.value
    update(draft => {
      draft.list.push(3)
    })
    expect(before.list).toEqual([1, 2])
    expect(state.value.list).toEqual([1, 2, 3])
    expect(state.value).not.toBe(before)
  })

  it('should support lazy initializer', () => {
    const [state] = useImmer(() => ({ ready: true }))
    expect(state.value.ready).toBe(true)
  })

  it('should replace state with non-function updater', () => {
    const [state, update] = useImmer<{ a: number }>({ a: 1 })
    update({ a: 2 })
    expect(state.value.a).toBe(2)
    expect(Object.isFrozen(state.value)).toBe(true)
  })

  it('should freeze state', () => {
    const [state, update] = useImmer({ a: 1 })
    expect(Object.isFrozen(state.value)).toBe(true)
    update(draft => {
      draft.a = 2
    })
    expect(Object.isFrozen(state.value)).toBe(true)
  })
})
