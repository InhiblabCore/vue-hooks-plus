import { isRef, ref, watch } from 'vue'
import { FetchState, Plugin } from '../types'

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { manual, ready = true, defaultParams = [], refreshDeps = [], refreshDepsAction },
) => {
  const hasAutoRun = ref(false)
  hasAutoRun.value = false

  watch(isRef(ready) ? ready : ref(ready), r => {
    if (!manual && r) {
      hasAutoRun.value = true
      fetchInstance.run(...defaultParams)
    }
  })

  watch(
    refreshDeps,
    () => {
      if (hasAutoRun.value) return
      if (!manual) {
        if (refreshDepsAction) {
          refreshDepsAction()
        } else {
          fetchInstance.refresh()
        }
      }
    },
    {
      deep: true,
    },
  )

  return {
    onBefore: () => {
      if (!(isRef(ready) ? ready.value : ready)) {
        return {
          stopNow: true,
        }
      }
    },
  }
}

useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: (!manual && isRef(ready) ? ready.value : ready) as FetchState<any, any[]>['loading'],
  }
}

export default useAutoRunPlugin
