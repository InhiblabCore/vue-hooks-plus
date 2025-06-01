import useBoolean from '..'

describe('useBoolean', () => {
  describe('Basic functionality', () => {
    it('should be defined', () => {
      expect(useBoolean).toBeDefined()
    })

    it('default value should be false', () => {
      const [state] = useBoolean()
      expect(state.value).toBe(false)
    })

    it('should accept custom default value', () => {
      const [state] = useBoolean(true)
      expect(state.value).toBe(true)
    })
  })

  describe('Operations', () => {
    let state: ReturnType<typeof useBoolean>[0]
    let actions: ReturnType<typeof useBoolean>[1]
    beforeEach(() => {
      ;[state, actions] = useBoolean(true)
    })

    it('toggle should switch state', () => {
      actions.toggle()
      expect(state.value).toBe(false)
      actions.toggle()
      expect(state.value).toBe(true)
    })

    it('set should set specified value', () => {
      actions.set(false)
      expect(state.value).toBe(false)
      actions.set(true)
      expect(state.value).toBe(true)
    })

    it('setTrue/setFalse should set to true/false respectively', () => {
      actions.setFalse()
      expect(state.value).toBe(false)
      actions.setTrue()
      expect(state.value).toBe(true)
    })
  })

  describe('Reactivity', () => {
    let state: ReturnType<typeof useBoolean>[0]
    let set: ReturnType<typeof useBoolean>[1]['set']
    beforeEach(() => {
      ;[state, { set }] = useBoolean(false)
    })

    it('set should update state multiple times', () => {
      set(true)
      expect(state.value).toBe(true)
      set(false)
      set(true)
      set(false)
      expect(state.value).toBe(false)
    })
  })

  describe('Edge cases', () => {
    let state: ReturnType<typeof useBoolean>[0]
    let set: ReturnType<typeof useBoolean>[1]['set']
    beforeEach(() => {
      ;[state, { set }] = useBoolean(false)
    })

    it('set(null) should be false', () => {
      set(null as any)
      expect(state.value).toBe(false)
    })
    it('set(undefined) should be false', () => {
      set(undefined as any)
      expect(state.value).toBe(false)
    })
    it('set(NaN) should be false', () => {
      set(NaN as any)
      expect(state.value).toBe(false)
    })
    it('set({}) should be true', () => {
      set({} as any)
      expect(state.value).toBe(true)
    })
    it('set([]) should be true', () => {
      set([] as any)
      expect(state.value).toBe(true)
    })
  })

  describe('Performance', () => {
    it('should return to initial value after toggling 100 times quickly', () => {
      const [state, { toggle }] = useBoolean(false)
      for (let i = 0; i < 100; i++) {
        toggle()
      }
      expect(state.value).toBe(false)
    })
  })
})
