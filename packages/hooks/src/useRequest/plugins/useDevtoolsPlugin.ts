import { computed, onMounted, unref, watchEffect } from 'vue'

import { UseRequestPlugin } from '../types'
import { getArrowFunctionName, getFunctionName } from '../devtools/utils'
import devToolsStore from '../devtools/store'

const useDevtoolsPlugin: UseRequestPlugin<
  unknown,
  unknown[],
  {
    devKey: string
  }
> = (fetchInstance, { ready = true, devKey, ...rest }) => {
  // devtools provider
  const createDevTarget = () => {
    if (devKey && !devToolsStore.has(devKey)) {
      const functionName = fetchInstance.serviceRef.value.toString().includes('function')
        ? getFunctionName(fetchInstance.serviceRef.value.toString())
        : getArrowFunctionName(fetchInstance.serviceRef.value.toString())
      devToolsStore.insert(devKey, {
        instance: fetchInstance,
        requestName: functionName,
        time: Date.now(),
      })
    }
  }

  onMounted(() => {
    createDevTarget()
  })

  const processObj = computed(() =>
    Object.fromEntries(
      Object.entries({ ready, ...rest }).map(([key, value]) => [key, unref(value)]),
    ),
  )

  watchEffect(() => {
    if (devKey && devToolsStore.has(devKey)) {
      devToolsStore.emit({
        ...fetchInstance,
        options: { ...fetchInstance.options, ...processObj.value },
      })
    }
  })

  return {
    onBefore: params => {
      createDevTarget()
      if (devKey && devToolsStore.has(devKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: devKey,
          params,
          loading: true,
          time: Date.now(),
          type: 'pending',
        })
    },
    onSuccess(data, params) {
      createDevTarget()
      if (devKey && devToolsStore.has(devKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: devKey,
          data,
          params,
          loading: false,
          time: Date.now(),
          type: 'done',
        })
    },
    onCancel() {
      createDevTarget()
      if (devKey && devToolsStore.has(devKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: devKey,
          loading: false,
          time: Date.now(),
          type: 'cancel',
        })
    },
    onError(e, params) {
      createDevTarget()
      if (devKey && devToolsStore.has(devKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: devKey,
          params,
          loading: false,
          error: e,
          time: Date.now(),
          type: 'error',
        })
    },
    onMutate(data) {
      createDevTarget()
      if (devKey && devToolsStore.has(devKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: devKey,
          data,
          loading: false,
          time: Date.now(),
          type: 'mutate',
        })
    },
  }
}

export default useDevtoolsPlugin
