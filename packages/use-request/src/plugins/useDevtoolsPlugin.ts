import { computed, unref, watchEffect } from 'vue'

import { UseRequestPlugin } from '../types'
import { getArrowFunctionName, getFunctionName } from '../devtools/utils'
import devToolsStore from '../devtools/store'

const useDevtoolsPlugin: UseRequestPlugin<
  unknown,
  unknown[],
  {
    debugKey: string
  }
> = (fetchInstance, { ready = true, debugKey, ...rest }) => {
  // devtools provider
  const createDevTarget = () => {
    if (debugKey && !devToolsStore.has(debugKey)) {
      const functionName = fetchInstance.serviceRef.value.toString().includes('function')
        ? getFunctionName(fetchInstance.serviceRef.value.toString())
        : getArrowFunctionName(fetchInstance.serviceRef.value.toString())
      devToolsStore.insert(debugKey, {
        instance: fetchInstance,
        requestName: functionName,
        time: Date.now(),
      })
    }
  }

  const processObj = computed(() =>
    Object.fromEntries(
      Object.entries({ ready, ...rest }).map(([key, value]) => [key, unref(value)]),
    ),
  )

  watchEffect(() => {
    if (debugKey && devToolsStore.has(debugKey)) {
      devToolsStore.emit({
        ...fetchInstance,
        options: { ...fetchInstance.options, ...processObj.value },
      })
    }
  })

  return {
    name: "devtoolsPlugin",
    onBefore: params => {
      createDevTarget()
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          params,
          loading: true,
          time: Date.now(),
          type: 'pending',
        })
    },
    onSuccess(data, params) {
      createDevTarget()
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          data,
          params,
          loading: false,
          time: Date.now(),
          type: 'done',
        })
    },
    onCancel() {
      createDevTarget()
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          loading: false,
          time: Date.now(),
          type: 'cancel',
        })
    },
    onError(e, params) {
      createDevTarget()
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          params,
          loading: false,
          error: e,
          time: Date.now(),
          type: 'error',
        })
    },
    onMutate(data) {
      createDevTarget()
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          data,
          loading: false,
          time: Date.now(),
          type: 'mutate',
        })
    },
  }
}

export default useDevtoolsPlugin
