import { unref, ref, watch, watchEffect } from 'vue'

import RegisterDevToolsStore from '../devtools/register'
import { UseRequestFetchState, UseRequestPlugin } from '../types'

// support refreshDeps & ready
const useAutoRunPlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { manual, ready = true, refreshDeps = [], refreshDepsAction },
) => {
  const hasAutoRun = ref(false)

  watchEffect(()=>{
    RegisterDevToolsStore.emit({ ...fetchInstance, options:{...fetchInstance.options,ready:unref(ready)} })
  })

  watchEffect(() => {
    if (!manual && fetchInstance.options.refreshDeps !== true) {
      hasAutoRun.value = unref(ready)
    }
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
    onBefore: (params) => {
      RegisterDevToolsStore.emit({ ...fetchInstance.state, key: fetchInstance.key, params, loading: true })
      if (!unref(ready)) {
        return {
          stopNow: true,
        }
      }
    },
    onSuccess(data, params) {
      RegisterDevToolsStore.emit({ ...fetchInstance.state, key: fetchInstance.key, data, params, loading: false })
    },
  }
}

useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: (!manual && unref(ready)) as UseRequestFetchState<any, any[]>['loading'],
  }
}

export default useAutoRunPlugin
