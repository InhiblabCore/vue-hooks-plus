import _ from 'lodash'
import { ref, watchEffect } from 'vue-demi'

type SubscriptionParams<T = any> = {
  params: T
  event: string | number
}

type Subscription<T> = ({ params, event }: SubscriptionParams<T>) => void

class EventEmitter<T> {
  private subscriptions = new Map<string | number, Subscription<T>[]>()
  private emitEffectCache = new Map<string | number, SubscriptionParams<T>>()

  constructor() {
    this.clear()
  }

  /**
   * Subscribe to the event
   * @param event string
   * @param listener Subscription<T>
   */
  useSubscription = (event: string, listener?: Subscription<T>) => {
    const callbackRef = ref<Subscription<T>>()
    watchEffect(onInvalidate => {
      callbackRef.value = listener
      function subscription(val: SubscriptionParams) {
        if (callbackRef.value) {
          callbackRef.value(val)
        }
      }

      const subscriptions = this.subscriptions?.get(event) ?? []
      subscriptions.push(subscription)
      this.subscriptions.set(event, subscriptions)

      this.emitEffect(event)
      onInvalidate(() => {
        this.subscriptions.delete(event)
      })
    })
  }

  /**
   * Send an event notification
   * @param event string | number
   * @param args T extends any[] ? any[] : any
   */
  emit = (event: string | number, ...args: T extends any[] ? any[] : any) => {
    if (typeof event === 'string' || typeof event === 'number') {
      const subscriptionValuesCallback = this.subscriptions.get(event)
      subscriptionValuesCallback?.forEach(callback => {
        callback?.({
          params: _.cloneDeep(args) as any,
          event,
        })
      })

      this.emitEffectCache.set(event, {
        params: _.cloneDeep(args) as any,
        event,
      })
    } else throw new TypeError('event must be string or number !')
  }

  emitEffect = (event: string | number) => {
    const emitEffectCache = this.emitEffectCache.get(event)
    const listeners = this.subscriptions.get(event)
    if (emitEffectCache)
      listeners?.forEach(listener => {
        listener?.({
          ...emitEffectCache,
        })
      })
  }

  removeListener = (event: string) => {
    this.subscriptions.delete(event)
  }

  clear = () => {
    this.subscriptions.clear()
  }
}

const eventEmitterOverall = new EventEmitter()

export { EventEmitter, eventEmitterOverall }
