import { watch, ref, Ref, getCurrentScope, onScopeDispose } from 'vue'

import { BasicTarget, getTargetElement } from '../utils/domTarget'

export type UseMutationObserverOptions = MutationObserverInit

export interface UseMutationObserverReturnType {
  isSupported: Ref<boolean>
  stop: () => void
}

export default function useMutationObserver(
  targetDom: BasicTarget,
  callback: MutationCallback,
  options?: UseMutationObserverOptions,
): UseMutationObserverReturnType {
  const isSupported = ref('MutationObserver' in window)
  let ob: MutationObserver | null

  const dispose = () => {
    if (ob) {
      ob.disconnect()
      ob = null
    }
  }

  const watcher = watch(
    () => getTargetElement(targetDom),
    nel => {
      dispose()

      if (isSupported.value && window && nel) {
        ob = new MutationObserver(callback)

        ob!.observe(nel, options)
      }
    },
    {
      immediate: true,
    },
  )

  const stop = () => {
    dispose()
    watcher()
  }

  if (getCurrentScope()) {
    onScopeDispose(stop)
  }

  return {
    isSupported,
    stop,
  }
}
