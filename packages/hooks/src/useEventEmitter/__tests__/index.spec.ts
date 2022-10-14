import { ref } from 'vue'
import useEventEmitter from '..'

describe('useEventEmitter', () => {
  const eventMsgA = ref<string>('')
  const eventMsgB = ref('')
  it('should event work ', () => {
    const event = useEventEmitter<string[]>()
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
})
