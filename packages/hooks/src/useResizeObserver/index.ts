import { watch, ref, computed, Ref, getCurrentScope, onScopeDispose } from 'vue'

import { BasicTarget, getTargetElement } from '../utils/domTarget'

export type ResizeObserverCallback = (
  entries: ReadonlyArray<ResizeObserverEntry>,
  ob: ResizeObserver,
) => void

export interface UseResizeObserverOptions {
  /**
   * The box the observer is observing changes to. 
   * The default is content-box.
   *
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions
}

export interface UseResizeObserverReturnType {
  isSupported: Ref<boolean>
  stop: () => void
}

export default function useResizeObserver(
  target: BasicTarget | BasicTarget[],
  callback: ResizeObserverCallback,
  options?: UseResizeObserverOptions,
): UseResizeObserverReturnType {
  const { box = 'content-box', ...argsOptions } = options ?? {}
  const isSupported = ref('ResizeObserver' in window)
  let ob: ResizeObserver | null
  const modelTargets = computed(() =>
    Array.isArray(target) ? target.map(curr => getTargetElement(curr)) : [getTargetElement(target)],
  )

  const dispose = () => {
    if (ob) {
      ob.disconnect()
      ob = null
    }
  }

  const watcher = watch(
    modelTargets,
    elements => {
      dispose()

      if (isSupported.value && window) {
        ob = new ResizeObserver(callback)

        elements.forEach(curr => {
          curr &&
            ob!.observe(curr, {
              box,
              ...argsOptions,
            })
        })
      }
    },
    {
      flush: 'post',
      immediate: true,
      deep: true,
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
