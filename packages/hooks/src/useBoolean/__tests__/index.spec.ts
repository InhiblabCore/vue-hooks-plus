import useBoolean from '..'

describe('useBoolean', () => {
  // 基础功能测试
  it('should be defined', () => {
    expect(useBoolean).toBeDefined()
  })

  // 默认值测试
  it('should default to be false', () => {
    const [state] = useBoolean()
    expect(state.value).toBeFalsy()
  })

  // 自定义默认值测试
  it('should accept custom default value', () => {
    const [state] = useBoolean(true)
    expect(state.value).toBeTruthy()
  })

  // 完整功能测试
  it('should work with all actions', () => {
    const [state, { set, setFalse, setTrue, toggle }] = useBoolean(true)

    // 初始值测试
    expect(state.value).toBeTruthy()

    // toggle 功能测试
    toggle()
    expect(state.value).toBeFalsy()
    toggle()
    expect(state.value).toBeTruthy()

    // set 功能测试
    set(false)
    expect(state.value).toBeFalsy()
    set(true)
    expect(state.value).toBeTruthy()

    // setTrue 功能测试
    setFalse()
    expect(state.value).toBeFalsy()
    setTrue()
    expect(state.value).toBeTruthy()

    // setFalse 功能测试
    setTrue()
    expect(state.value).toBeTruthy()
    setFalse()
    expect(state.value).toBeFalsy()
  })
  // 响应式测试
  it('should be reactive', () => {
    const [state, { set }] = useBoolean(false)

    // 测试响应式更新
    set(true)
    expect(state.value).toBeTruthy()

    // 测试多次更新
    set(false)
    set(true)
    set(false)
    expect(state.value).toBeFalsy()
  })

  // 边界情况测试
  it('should handle edge cases', () => {
    const [state, { set }] = useBoolean(false)

    // 测试 null
    set(null as any)
    expect(state.value).toBeFalsy()

    // 测试 undefined
    set(undefined as any)
    expect(state.value).toBeFalsy()

    // 测试 NaN
    set(NaN as any)
    expect(state.value).toBeFalsy()

    // 测试对象
    set({} as any)
    expect(state.value).toBeTruthy()

    // 测试数组
    set([] as any)
    expect(state.value).toBeTruthy()
  })

  // 性能测试
  it('should handle rapid toggles', () => {
    const [state, { toggle }] = useBoolean(false)

    // 快速切换测试
    for (let i = 0; i < 100; i++) {
      toggle()
    }

    expect(state.value).toBeFalsy() // 偶数次切换应该回到初始值
  })
})
