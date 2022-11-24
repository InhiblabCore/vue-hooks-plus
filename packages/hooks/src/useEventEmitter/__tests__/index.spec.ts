import renderHook from 'test-utils/renderHook'
import { ref } from 'vue'
import useEventEmitter from '..'

describe('useEventEmitter', () => {
  const eventMsgA = ref<string>('')
  const eventMsgB = ref('')
  it('should event work ', () => {
    const [event] = renderHook(() => useEventEmitter<string[]>())
    event.emit('eventMsgA')
    event.useSubscription('eventMsgA', () => {
      eventMsgA.value = 'eventMsgAA'
    })

    expect(eventMsgA.value).toBe('eventMsgAA')

    event.emit('eventMsgA+', 'eventMsgA+')
    event.emit('eventMsgA+', 'eventMsgA-')

    event.useSubscription('eventMsgA+', (args: any) => {
      eventMsgA.value = args.params?.[0]
    })
    expect(eventMsgA.value).toBe('eventMsgA-')
  })

  it('should event global work ', () => {
    const event = useEventEmitter<string[]>({ global: true })
    event.emit('eventMsgB')
    event.useSubscription('eventMsgB', () => {
      eventMsgB.value = 'eventMsgBB'
    })

    expect(eventMsgB.value).toBe('eventMsgBB')

    event.emit('eventMsgB+', 'eventMsgB+')
    event.emit('eventMsgB+', 'eventMsgB-')

    event.useSubscription('eventMsgB+', (args: any) => {
      eventMsgB.value = args.params?.[0]
    })
    expect(eventMsgB.value).toBe('eventMsgB-')
  })
})
