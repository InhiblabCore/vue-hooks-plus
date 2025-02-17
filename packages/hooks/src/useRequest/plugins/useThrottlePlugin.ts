import { computed, unref, watchEffect, ref } from 'vue'
import { type DebouncedFunc, type ThrottleSettings } from 'lodash'
import throttle from 'lodash/throttle'
import { UseRequestPlugin } from '../types'

const useThrottlePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {
  const options = computed(() => {
    const ops: ThrottleSettings = {
      leading: unref(throttleLeading),
      trailing: unref(throttleTrailing),
    }

    return ops
  })

  const throttledRef = ref<DebouncedFunc<any>>()

  watchEffect(onInvalidate => {
    if (unref(throttleWait)) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)

      throttledRef.value = throttle(
        (...args: any[]) => {
          return new Promise((resolve, reject) => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject)
          })
        },
        unref(throttleWait),
        options.value,
      )

      onInvalidate(() => {
        throttledRef.value?.cancel()
      })
    }
  })

  if (!unref(throttleWait)) {
    return {
      name: 'throttlePlugin',
    }
  }

  return {
    name: 'throttlePlugin',
    onCancel: () => {
      throttledRef.value?.cancel()
    },
  }
}

export default useThrottlePlugin
