import cloneDeep from 'lodash-es/cloneDeep'
import { ref, watchEffect } from 'vue'

// 事件名类型，支持 string | number 或自定义字面量类型
type EventKey = string | number

// 事件参数类型
type EventParams = any

// 订阅回调类型
type Subscription<T = EventParams, K extends EventKey = EventKey> = (params: { params: T; event: K }) => void

// 订阅参数类型
type SubscriptionParams<T = EventParams, K extends EventKey = EventKey> = {
  params: T
  event: K
}

interface EventEmitterOptions {
  global?: boolean
}

class EventEmitter<
  T = EventParams,
  K extends EventKey = string
> {
  // 事件订阅表
  private subscriptions = new Map<K, Set<Subscription<T, K>>>()
  // 事件缓存表（仅非全局实例）
  private emitEffectCache = new Map<K, SubscriptionParams<T, K>>()
  // 是否全局实例
  private readonly isGlobal: boolean
  // 全局单例
  private static instance: EventEmitter<any, any> | null = null

  constructor(options?: EventEmitterOptions) {
    this.isGlobal = !!options?.global
    this.clear()
  }

  /**
   * 获取全局单例
   */
  static getInstance<T = EventParams, K extends EventKey = string>() {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter<T, K>({ global: true })
    }
    return EventEmitter.instance as EventEmitter<T, K>
  }

  /**
   * 订阅事件
   * @param event 事件名
   * @param listener 订阅回调
   * @returns 取消订阅函数
   */
  subscribe<E extends K = K>(event: E, listener: Subscription<T, E>): () => void {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, new Set())
    }
    const listeners = this.subscriptions.get(event)!
    listeners.add(listener as Subscription<T, K>)
    // 非全局实例回放缓存
    if (!this.isGlobal) {
      this.emitEffect(event)
    }
    // 返回取消订阅函数
    return () => {
      listeners.delete(listener as Subscription<T, K>)
      if (listeners.size === 0) {
        this.subscriptions.delete(event)
      }
    }
  }

  /**
   * 发送事件通知
   * @param event 事件名
   * @param args 事件参数
   */
  emit<E extends K = K>(event: E, ...args: T extends any[] ? T : [T]): void {
    if (typeof event === 'string' || typeof event === 'number') {
      const listeners = this.subscriptions.get(event)
      listeners?.forEach(callback => {
        callback?.({
          params: cloneDeep(args.length === 1 ? args[0] : args) as T,
          event,
        })
      })
      // 非全局实例缓存事件
      if (!this.isGlobal) {
        this.emitEffectCache.set(event, {
          params: cloneDeep(args.length === 1 ? args[0] : args) as T,
          event,
        })
      }
    } else {
      throw new TypeError('event must be string or number!')
    }
  }

  /**
   * 回放缓存事件（仅非全局实例）
   */
  emitEffect<E extends K = K>(event: E) {
    if (this.isGlobal) return
    const emitEffectCache = this.emitEffectCache.get(event)
    const listeners = this.subscriptions.get(event)
    if (emitEffectCache) {
      listeners?.forEach(listener => {
        listener?.({ ...emitEffectCache })
      })
    }
  }

  /**
   * 移除监听
   */
  removeListener<E extends K = K>(event: E, listener?: Subscription<T, E>) {
    if (!listener) {
      this.subscriptions.delete(event)
    } else {
      const listeners = this.subscriptions.get(event)
      listeners?.delete(listener as Subscription<T, K>)
      if (listeners && listeners.size === 0) {
        this.subscriptions.delete(event)
      }
    }
  }

  /**
   * 清空所有事件
   */
  clear() {
    this.subscriptions.clear()
    this.emitEffectCache.clear()
  }
}

/**
 * Vue hook: 订阅事件，自动解绑
 */
function useEventEmitterSubscription<
  T = EventParams,
  K extends EventKey = string,
  E extends K = K
>(event: E, listener: Subscription<T, E>, emitter?: EventEmitter<T, K>) {
  const _emitter = emitter || EventEmitter.getInstance<T, K>()
  const callbackRef = ref(listener)
  let unsubscribe: (() => void) | null = null

  watchEffect((onInvalidate) => {
    if (unsubscribe) unsubscribe()
    unsubscribe = _emitter.subscribe(event, (params) => {
      callbackRef.value(params)
    })
    onInvalidate(() => {
      if (unsubscribe) unsubscribe()
    })
  })
}

// 默认全局实例
const eventEmitterOverall = EventEmitter.getInstance()

export {
  EventEmitter,
  eventEmitterOverall,
  useEventEmitterSubscription,
}
// 类型导出
export type { EventKey, EventParams, Subscription, SubscriptionParams }
