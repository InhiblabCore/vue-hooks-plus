import { ref, watchEffect } from "vue";
import type { Plugin, Interval } from "../types";
import isDocumentVisible from "../utils/isDocumentVisible";
import subscribeReVisible from "../utils/subscribeReVisible";

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = ref(true) }
) => {
  const timerRef = ref<Interval>();
  const unsubscribeRef = ref<() => void>();

  const stopPolling = () => {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
    unsubscribeRef.value?.();
  };

  watchEffect(() => {
    if (!pollingInterval?.value) {
      stopPolling();
    }
  });

  if (!pollingInterval?.value) {
    return {};
  }

  return {
    onBefore: () => {
      stopPolling();
    },
    onFinally: () => {
      if (!pollingWhenHidden.value && !isDocumentVisible()) {
        unsubscribeRef.value = subscribeReVisible(() => {
          fetchInstance.refresh();
        });
        return;
      }

      timerRef.value = setInterval(() => {
        fetchInstance.refresh();
      }, pollingInterval.value);
    },
    onCancel: () => {
      stopPolling();
    },
  };
};

export default usePollingPlugin;
