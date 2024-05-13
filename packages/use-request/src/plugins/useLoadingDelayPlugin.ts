import { ref, unref } from 'vue'
import { Timeout, UseRequestPlugin } from '../types'

const useLoadingDelayPlugin: UseRequestPlugin<unknown, unknown[]> = (inst, { loadingDelay }) => {
  const delayRef = ref<Timeout>()

  const clear = () => {
    if (delayRef.value) {
      clearTimeout(unref(delayRef.value))

      delayRef.value = undefined
    }
  }

  return {
    name: 'loadingDelayPlugin',
    onFinally: () => {
      clear()

      const delay = unref(loadingDelay)

      /**
       *
       * if loadingDelay is set, the loading state will be delayed,
       * until the delay time is reached.
       *
       * if delay is set to 0, the loading state will not be delayed. because 0 is mean nothing.
       */
      if (delay) {
        inst.setState({
          loading: true,
        })

        delayRef.value = setTimeout(() => {
          inst.setState({
            loading: false,
          })
        }, delay)
      }
    },
    onError: () => {
      clear()
    },
  }
}

export default useLoadingDelayPlugin
