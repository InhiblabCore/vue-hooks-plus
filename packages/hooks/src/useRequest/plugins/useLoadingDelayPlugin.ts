import { ref, unref } from 'vue'
import { Timeout, UseRequestPlugin } from '../types'

const useLoadingDelayPlugin: UseRequestPlugin<unknown, unknown[]> = (inst, { loadingDelay }) => {
  const delayRef = ref<Timeout>()

  return {
    name: 'loadingDelayPlugin',
    onFinally: () => {
      if (delayRef.value) {
        clearTimeout(unref(delayRef.value))

        delayRef.value = undefined
      }

      inst.setState({
        loading: true,
      })
      setTimeout(() => {
        inst.setState({
          loading: false,
        })
      }, unref(loadingDelay))
    },
  }
}

export default useLoadingDelayPlugin
