import { isRef, ref } from "vue";
import type { Plugin, Timeout } from "../types";

const useLoadingDelayPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { loadingDelay }
) => {
  const timerRef = ref<Timeout>();
  if (isRef(loadingDelay) ? !loadingDelay.value : !loadingDelay) {
    return {};
  }

  const cancelTimeout = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
    }
  };

  

  return {
    onBefore: () => {
      cancelTimeout();
      timerRef.value = setTimeout(() => {
        fetchInstance.setState({
          loading: true,
        });
      }, (isRef(loadingDelay) ? loadingDelay.value : loadingDelay) as number);

      return {
        loading: false,
      };
    },
    onFinally: () => {
      cancelTimeout();
    },
    onCancel: () => {
      cancelTimeout();
    },
  };
};

export default useLoadingDelayPlugin;
