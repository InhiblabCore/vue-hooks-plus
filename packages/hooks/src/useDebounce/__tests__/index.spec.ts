import { ref } from 'vue'
import { sleep } from 'test-utils/sleep'
import useDebounce from '..'
import renderHook from 'test-utils/renderHook'

describe('useDebounce', () => {
  it('should be defined', () => {
    expect(useDebounce).toBeDefined()
  })
  it('should useDebounce work', async () => {
    const count = ref(0)
    const [debouncedCount] = renderHook(() => useDebounce(count, { wait: 200 }))
    count.value++
    count.value++
    count.value++
    count.value++
    count.value++
    expect(count.value).toEqual(5)
    expect(debouncedCount.value).toEqual(0)
    await sleep(300)
    expect(debouncedCount.value).toEqual(5)
  })
  it('should debounce string ref', async () => {
    const text = ref('hello')
    const [debouncedText] = renderHook(() => useDebounce(text, { wait: 100 }))
    text.value = 'world'
    text.value = 'vue'
    expect(debouncedText.value).toBe('hello')
    await sleep(150)
    expect(debouncedText.value).toBe('vue')
  })
  it('should debounce object ref', async () => {
    const obj = ref({ a: 1 })
    const [debouncedObj] = renderHook(() => useDebounce(obj, { wait: 100 }))
    obj.value = { a: 2 }
    obj.value = { a: 3 }
    expect(debouncedObj.value).toEqual({ a: 1 })
    await sleep(150)
    expect(debouncedObj.value).toEqual({ a: 3 })
  })
  it('should support leading option', async () => {
    const count = ref(0)
    const [debouncedCount] = renderHook(() => useDebounce(count, { wait: 100, leading: true, trailing: false }))
    count.value = 1
    count.value = 2
    count.value = 3
    // Should not update immediately
    expect(debouncedCount.value).toBe(0)
    await sleep(150)
    // According to lodash debounce, with leading: true and trailing: false,
    // only the last change within the debounce window is taken.
    expect(debouncedCount.value).toBe(3)
  })
  it('should support trailing option', async () => {
    const count = ref(0)
    const [debouncedCount] = renderHook(() => useDebounce(count, { wait: 100, leading: false, trailing: true }))
    count.value = 1
    count.value = 2
    count.value = 3
    expect(debouncedCount.value).toBe(0)
    await sleep(150)
    expect(debouncedCount.value).toBe(3)
  })
  it('should support maxWait option', async () => {
    const count = ref(0)
    const [debouncedCount] = renderHook(() => useDebounce(count, { wait: 100, maxWait: 200 }))
    count.value = 1
    await sleep(90)
    count.value = 2
    await sleep(90)
    count.value = 3
    expect(debouncedCount.value).toBe(0)
    await sleep(50)
    expect(debouncedCount.value).toBe(3)
  })
  it('should debounce with wait = 0', async () => {
    const count = ref(0)
    const [debouncedCount] = renderHook(() => useDebounce(count, { wait: 0 }))
    count.value = 1
    count.value = 2
    await sleep(10)
    expect(debouncedCount.value).toBe(2)
  })
  it('should cancel debounce on unmount', async () => {
    const count = ref(0)
    const [debouncedCount, app] = renderHook(() => useDebounce(count, { wait: 100 }))
    count.value = 1
    app.unmount()
    await sleep(150)
    // Should not update after unmount
    expect(debouncedCount.value).toBe(0)
  })
})
