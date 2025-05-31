import { onScopeDispose } from 'vue'
import { EventEmitter, eventEmitterOverall, useEventEmitterSubscription } from './event'

export type UseEventEmitterType<T = void> = EventEmitter<T> | typeof eventEmitterOverall


export {
  useEventEmitterSubscription
}

export default function useEventEmitter<T = void>(options?: {
  /**
   * 是否为全局实例
   */
  global?: boolean
}): EventEmitter<T> {
  const isGlobal = options?.global ?? false
  // 全局实例直接返回单例
  if (isGlobal) {
    return eventEmitterOverall as EventEmitter<T>
  }
  // 局部实例
  const localEmitter = new EventEmitter<T>()
  onScopeDispose(() => {
    localEmitter.clear()
  })
  return localEmitter
}
