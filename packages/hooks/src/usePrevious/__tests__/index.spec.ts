import { ref, computed, nextTick } from 'vue'
import usePrevious from '../index'

describe('usePrevious', () => {
  describe('Basic functionality', () => {
    it('should be defined', () => {
      expect(usePrevious).toBeDefined()
    })

    it('should return undefined as initial previous value', () => {
      const state = ref(0)
      const previousValue = usePrevious(state)
      expect(previousValue.value).toBeUndefined()
    })

    it('should return readonly ref', () => {
      const state = ref(0)
      const previousValue = usePrevious(state)
      expect(previousValue.value).toBeUndefined()
      
      // Should not be able to modify the returned value directly
      // readonly refs in Vue log warnings but don't throw errors
      expect(() => {
        // @ts-expect-error - testing readonly behavior
        previousValue.value = 1
      }).not.toThrow()
      
      // But the value should remain unchanged
      expect(previousValue.value).toBeUndefined()
    })
  })

  describe('State tracking', () => {
    it('should track previous value when state changes', async () => {
      const state = ref(0)
      const previousValue = usePrevious(state)
      
      // Initial previous value should be undefined
      expect(previousValue.value).toBeUndefined()
      
      // Update state
      state.value = 1
      await nextTick()
      
      // Previous value should now be 0
      expect(previousValue.value).toBe(0)
      
      // Update state again
      state.value = 2
      await nextTick()
      
      // Previous value should now be 1
      expect(previousValue.value).toBe(1)
    })

    it('should work with string values', async () => {
      const state = ref('hello')
      const previousValue = usePrevious(state)
      
      expect(previousValue.value).toBeUndefined()
      
      state.value = 'world'
      await nextTick()
      
      expect(previousValue.value).toBe('hello')
      
      state.value = 'vue'
      await nextTick()
      
      expect(previousValue.value).toBe('world')
    })

    it('should work with object values', async () => {
      const state = ref({ a: 1 })
      const previousValue = usePrevious(state)
      
      expect(previousValue.value).toBeUndefined()
      
      const newObj = { a: 2 }
      state.value = newObj
      await nextTick()
      
      expect(previousValue.value).toEqual({ a: 1 })
      
      state.value = { a: 3 }
      await nextTick()
      
      expect(previousValue.value).toStrictEqual(newObj)
    })

    it('should work with computed ref', async () => {
      const baseValue = ref(10)
      const computedValue = computed(() => baseValue.value * 2)
      const previousValue = usePrevious(computedValue)
      
      expect(previousValue.value).toBeUndefined()
      
      baseValue.value = 20
      await nextTick()
      
      expect(previousValue.value).toBe(20) // previous computed value (10 * 2)
      
      baseValue.value = 30
      await nextTick()
      
      expect(previousValue.value).toBe(40) // previous computed value (20 * 2)
    })
  })

  describe('Custom shouldUpdate function', () => {
    it('should use custom shouldUpdate function', async () => {
      const state = ref(0)
      const shouldUpdate = vi.fn((prev, next) => {
        if (prev === undefined) return true
        return Math.abs(prev - next) > 1
      })
      const previousValue = usePrevious(state, shouldUpdate)
      
      expect(previousValue.value).toBeUndefined()
      
      // First change should always update (from undefined)
      state.value = 1
      await nextTick()
      
      expect(previousValue.value).toBeUndefined()
      expect(shouldUpdate).toHaveBeenCalled()
      
      // Change by 1, should not update due to custom logic
      state.value = 2
      await nextTick()
      
      expect(previousValue.value).toBe(0)
      
      // Change by 2, should update
      state.value = 4
      await nextTick()
      
      expect(previousValue.value).toBe(2)
      expect(shouldUpdate).toHaveBeenCalledTimes(4) // Initial + 3 updates
    })

    it('should handle undefined values in custom shouldUpdate', async () => {
      const state = ref<number | undefined>(undefined)
      const shouldUpdate = vi.fn((prev, next) => prev !== next)
      const previousValue = usePrevious(state, shouldUpdate)
      
      expect(previousValue.value).toBeUndefined()
      
      state.value = 1
      await nextTick()
      
      expect(previousValue.value).toBeUndefined()
      expect(shouldUpdate).toHaveBeenCalledWith(undefined, 1)
      
      state.value = undefined
      await nextTick()
      
      expect(previousValue.value).toBe(1)
      expect(shouldUpdate).toHaveBeenCalledWith(1, undefined)
    })

    it('should not update when shouldUpdate returns false', async () => {
      const state = ref(0)
      const shouldUpdate = vi.fn(() => false)
      const previousValue = usePrevious(state, shouldUpdate)
      
      expect(previousValue.value).toBeUndefined()
      
      state.value = 1
      await nextTick()
      
      expect(previousValue.value).toBeUndefined()
      expect(shouldUpdate).toHaveBeenCalledWith(undefined, 1)
      
      state.value = 2
      await nextTick()
      
      expect(previousValue.value).toBeUndefined()
      expect(shouldUpdate).toHaveBeenCalledWith(undefined, 2)
    })
  })

  describe('Default shouldUpdate behavior', () => {
    it('should use Object.is for comparison by default', async () => {
      const state = ref(0)
      const previousValue = usePrevious(state)
      
      // Same value should not update
      state.value = 0
      await nextTick()
      
      expect(previousValue.value).toBeUndefined()
      
      // Different value should update
      state.value = 1
      await nextTick()
      
      expect(previousValue.value).toBe(0)
    })

    it('should handle NaN values correctly', async () => {
      const state = ref(NaN)
      const previousValue = usePrevious(state)
      
      expect(previousValue.value).toBeUndefined()
      
      // NaN should equal NaN with Object.is
      state.value = NaN
      await nextTick()
      
      expect(previousValue.value).toBeUndefined()
      
      // Change to a different value
      state.value = 1
      await nextTick()
      
      expect(previousValue.value).toBeNaN()
    })
  })

  describe('Edge cases', () => {
    it('should handle rapid state changes', async () => {
      const state = ref(0)
      const previousValue = usePrevious(state)
      
      // Rapid changes
      state.value = 1
      state.value = 2
      state.value = 3
      await nextTick()
      
      // Should track the previous value before the final change
      expect(previousValue.value).toBe(0)
    })

    it('should handle boolean values', async () => {
      const state = ref(true)
      const previousValue = usePrevious(state)
      
      expect(previousValue.value).toBeUndefined()
      
      state.value = false
      await nextTick()
      
      expect(previousValue.value).toBe(true)
      
      state.value = true
      await nextTick()
      
      expect(previousValue.value).toBe(false)
    })

    it('should handle null and undefined values', async () => {
      const state = ref<string | null | undefined>(null)
      const previousValue = usePrevious(state)
      
      expect(previousValue.value).toBeUndefined()
      
      state.value = undefined
      await nextTick()
      
      expect(previousValue.value).toBeNull()
      
      state.value = 'hello'
      await nextTick()
      
      expect(previousValue.value).toBeUndefined()
    })
  })
}) 