import useBoolean from '..'

describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined()
  })

  it('should default to be false', async () => {
    const [state] = useBoolean()
    expect(state.value).toBeFalsy()
  })

  it('should work', async () => {
    const [state, { set, setFalse, setTrue, toggle }] = useBoolean(true)
    expect(state.value).toBeTruthy()

    toggle()
    expect(state.value).toBeFalsy()

    set(true)
    expect(state.value).toBeTruthy()

    setTrue()
    expect(state.value).toBeTruthy()

    setFalse()
    expect(state.value).toBeFalsy()
  })
})
