import { unref, ref, watch, watchEffect } from 'vue'
import { FetchState, Plugin } from '../types'

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<unknown, unknown[]> = (
  fetchInstance,
  { manual, ready = true, refreshDeps = [], refreshDepsAction },
) => {
  const hasAutoRun = ref(false)

  watchEffect(() => {
    if (!manual) hasAutoRun.value = unref(ready)
  })

  if (refreshDeps instanceof Array)
    watch(
      [hasAutoRun, ...refreshDeps],
      ([autoRun]) => {
        if (!autoRun) return
        if (!manual && autoRun) {
          if (refreshDepsAction) {
            refreshDepsAction()
          } else {
            fetchInstance.refresh()
          }
        }
      },
      {
        deep: true,
        immediate: false,
      },
    )
  else
    watch(hasAutoRun, h => {
      if (!manual && h) {
        if (refreshDepsAction) {
          refreshDepsAction()
        } else {
          fetchInstance.refresh()
        }
      }
    })

  return {
    onBefore: () => {
      if (!unref(ready)) {
        return {
          stopNow: true,
        }
      }
    },
  }
}

useAutoRunPlugin.onInit = ({ initialData, ready = true, manual }) => {
  return {
    loading: (!manual && unref(ready)) as FetchState<any, any[]>['loading'],
  }
}

export default useAutoRunPlugin
