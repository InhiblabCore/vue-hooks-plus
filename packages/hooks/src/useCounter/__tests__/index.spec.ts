import useCounter from '..'

describe('useCounter', () => {
  it('should passed initialValue is 0', async () => {
    const [current] = useCounter()
    expect(current.value).toEqual(0)
  })

  it('should passed the inc', async () => {
    const [current, { inc }] = useCounter(20)
    inc()
    expect(current.value).toBe(21)
  })

  it('should passed the dec', async () => {
    const [current, { dec }] = useCounter(20)
    dec()
    expect(current.value).toBe(19)
  })

  it('should passed the set', async () => {
    const [current, { set }] = useCounter(20)
    set(10)
    expect(current.value).toBe(10)
  })

  it('should passed the reset', async () => {
    const [current, { inc, reset }] = useCounter(20)
    inc()
    inc()
    reset()
    expect(current.value).toBe(20)
  })

  it('should passed the limit', async () => {
    const [current, { inc }] = useCounter(0, { min: 0, max: 2 })
    inc()
    inc()
    inc()
    expect(current.value).toBe(2)
  })
})
