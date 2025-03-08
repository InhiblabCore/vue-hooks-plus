import { computed, unref, watchEffect } from 'vue'
import { type ThrottleSettings } from 'lodash'
import { UseRequestPlugin } from '../types'
import useThrottleFn from '../../useThrottleFn'

const useThrottlePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {
  const options = computed(() => {
    const ops: ThrottleSettings = {}
    const leading = unref(throttleLeading)
    const trailing = unref(throttleTrailing)
    if (leading !== undefined) {
      ops.leading = leading;
    }
    if (trailing !== undefined) {
      ops.trailing = trailing;
    }
    return ops
  })

  const { run, cancel, flush } = useThrottleFn(callback => {
    callback()
    unref(throttleWait) ?? 0,
      options.value
  })

  watchEffect(onInvalidate => {
    if (unref(throttleWait)) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          run(() => _originRunAsync(...args).then(resolve).catch(reject))
        })
      }
      onInvalidate(() => {
        cancel()
        fetchInstance.runAsync = _originRunAsync
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
      cancel()
      flush()
    },
  }
}

export default useThrottlePlugin
