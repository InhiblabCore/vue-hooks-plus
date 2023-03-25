import { unref, ref, watchEffect } from "vue";
import type { UseRequestPlugin, Interval } from "../types";
import isDocumentVisible from "../utils/isDocumentVisible";
import subscribeReVisible from "../utils/subscribeReVisible";

const usePollingPlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true, pollingErrorRetryCount = -1 }
) => {
  const timerRef = ref<Interval>();
  const unsubscribeRef = ref<() => void>();
  const countRef = ref<number>(0);



  const stopPolling = () => {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
    unsubscribeRef.value?.();
  };

  watchEffect(() => {
    if (!unref(pollingInterval)) {
      stopPolling();
    }
  });

  if (!unref(pollingInterval)) {
    return {};
  }

  return {
    onBefore: () => {
      stopPolling();
    },
    onError: () => {
      countRef.value += 1;
    },
    onSuccess: () => {
      countRef.value = 0;
    },
    onFinally: () => {
      if (
        pollingErrorRetryCount === -1 ||
        // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
        (pollingErrorRetryCount !== -1 && countRef.value <= pollingErrorRetryCount)
      ) {
        timerRef.value = setTimeout(() => {
          // if pollingWhenHidden = false && document is hidden, then stop polling and subscribe revisible
          if (!pollingWhenHidden && !isDocumentVisible()) {
            unsubscribeRef.value = subscribeReVisible(() => {
              fetchInstance.refresh();
            });
          } else {
            fetchInstance.refresh();
          }
        }, unref(pollingInterval));
      } else {
        countRef.value = 0;
      }
      // if (!pollingWhenHidden && !isDocumentVisible()) {
      //   unsubscribeRef.value = subscribeReVisible(() => {
      //     fetchInstance.refresh();
      //   });
      //   return;
      // }
      // timerRef.value = setInterval(() => {
      //   fetchInstance.refresh();
      // },unref(pollingInterval));
    },
    onCancel: () => {
      stopPolling();
    },
  };
};

export default usePollingPlugin;
