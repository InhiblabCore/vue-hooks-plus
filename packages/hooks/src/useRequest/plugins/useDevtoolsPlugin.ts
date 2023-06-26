import { computed, unref, watchEffect } from 'vue'

import devToolsStore from '../devtools/store'
import { UseRequestPlugin } from '../types'

const useDevtoolsPlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { ready = true, ...rest },
) => {

  const processObj = computed(() => Object.fromEntries(
    Object.entries({ ready, ...rest }).map(([key, value]) => [key, unref(value)])
  ))

  watchEffect(() => {
    devToolsStore.emit({ ...fetchInstance, options: { ...fetchInstance.options, ...processObj.value } })
  })

  return {
    onBefore: (params) => {
      devToolsStore.emit({ ...fetchInstance.state, key: fetchInstance.key, params, loading: true, time: Date.now(), type: "pending" })
    },
    onSuccess(data, params) {
      devToolsStore.emit({ ...fetchInstance.state, key: fetchInstance.key, data, params, loading: false, time: Date.now(), type: "done" })
    },
    onError(e, params) {
      devToolsStore.emit({ ...fetchInstance.state, key: fetchInstance.key, params, loading: false, error: e, time: Date.now(), type: "error" })
    },
    onMutate(data) {
      devToolsStore.emit({ ...fetchInstance.state, key: fetchInstance.key, data, loading: false, time: Date.now(), type: "mutate" })
    },

  }
}

export default useDevtoolsPlugin
