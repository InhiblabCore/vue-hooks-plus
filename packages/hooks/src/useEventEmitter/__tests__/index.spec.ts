import renderHook from 'test-utils/renderHook'
import { ref, nextTick } from 'vue'
import useEventEmitter from '..'
import { EventEmitter } from '../event'

describe('EventEmitter (local instance)', () => {
  it('should subscribe and emit events', async () => {
    const [emitter] = renderHook(() => useEventEmitter<number>())
    const count = ref(0)
    emitter.subscribe('inc', ({ params }) => {
      count.value += params
    })
    emitter.emit('inc', 2)
    await nextTick()
    expect(count.value).toBe(2)
    emitter.emit('inc', 3)
    await nextTick()
    expect(count.value).toBe(5)
  })

  it('should unsubscribe correctly', async () => {
    const [emitter] = renderHook(() => useEventEmitter<number>())
    const count = ref(0)
    const unsub = emitter.subscribe('inc', ({ params }) => {
      count.value += params
    })
    emitter.emit('inc', 1)
    await nextTick()
    expect(count.value).toBe(1)
    unsub()
    emitter.emit('inc', 1)
    await nextTick()
    expect(count.value).toBe(1)
  })

  it('should clear all listeners', async () => {
    const [emitter] = renderHook(() => useEventEmitter<number>())
    const count = ref(0)
    emitter.subscribe('inc', ({ params }) => {
      count.value += params
    })
    emitter.clear()
    emitter.emit('inc', 5)
    await nextTick()
    expect(count.value).toBe(0)
  })

  it('should support multiple subscribers', async () => {
    const [emitter] = renderHook(() => useEventEmitter<number>())
    const a = ref(0)
    const b = ref(0)
    emitter.subscribe('inc', ({ params }) => { a.value += params })
    emitter.subscribe('inc', ({ params }) => { b.value += params })
    emitter.emit('inc', 2)
    await nextTick()
    expect(a.value).toBe(2)
    expect(b.value).toBe(2)
  })

  it('should remove specific listener', async () => {
    const [emitter] = renderHook(() => useEventEmitter<number>())
    const a = ref(0)
    const b = ref(0)
    const fnA = ({ params }: any) => { a.value += params }
    const fnB = ({ params }: any) => { b.value += params }
    emitter.subscribe('inc', fnA)
    emitter.subscribe('inc', fnB)
    emitter.removeListener('inc', fnA)
    emitter.emit('inc', 1)
    await nextTick()
    expect(a.value).toBe(0)
    expect(b.value).toBe(1)
  })

  it('should replay last event for new subscriber (non-global)', async () => {
    const [emitter] = renderHook(() => new EventEmitter<number>())
    emitter.emit('inc', 7)
    const count = ref(0)
    emitter.subscribe('inc', ({ params }) => {
      count.value += params
    })
    await nextTick()
    expect(count.value).toBe(7)
  })
})

describe('EventEmitter (global instance)', () => {
  it('should not replay last event for new subscriber', async () => {
    const emitter = useEventEmitter<number>({ global: true })
    emitter.emit('inc', 5)
    const count = ref(0)
    emitter.subscribe('inc', ({ params }) => {
      count.value += params
    })
    await nextTick()
    expect(count.value).toBe(0)
    emitter.emit('inc', 2)
    await nextTick()
    expect(count.value).toBe(2)
  })

  it('should clear all listeners (global)', async () => {
    const emitter = useEventEmitter<number>({ global: true })
    const count = ref(0)
    emitter.subscribe('inc', ({ params }) => {
      count.value += params
    })
    emitter.clear()
    emitter.emit('inc', 5)
    await nextTick()
    expect(count.value).toBe(0)
  })

  it('should support string and number event keys', async () => {
    const emitter = useEventEmitter<number | string>({ global: true })
    const a = ref<string>('')
    const b = ref<number>(0)
    emitter.subscribe('str', ({ params }) => {
      if (typeof params === 'string') a.value = params
    })
    // @ts-ignore
    emitter.subscribe(123, ({ params }) => {
      if (typeof params === 'number') b.value = params
    })
    emitter.emit('str', 'hello')
    // @ts-ignore
    emitter.emit(123, 42)
    await nextTick()
    expect(a.value).toBe('hello')
    expect(b.value).toBe(42)
  })
})
