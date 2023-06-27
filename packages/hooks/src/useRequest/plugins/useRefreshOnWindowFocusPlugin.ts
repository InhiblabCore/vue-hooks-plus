import { ref, watchEffect, onUnmounted, unref } from "vue";
import type { UseRequestPlugin } from "../types";
import limit from "../utils/limit";
import subscribeFocus from "../utils/subscribeFocus";

const useRefreshOnWindowFocusPlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { refreshOnWindowFocus, focusTimespan = 5000 }
) => {
  const unsubscribeRef = ref<() => void>();

  const stopSubscribe = () => {
    unsubscribeRef.value?.();
  };

  watchEffect((onInvalidate) => {
    if (unref(refreshOnWindowFocus)) {
      const limitRefresh = limit(
        fetchInstance.refresh.bind(fetchInstance),
        unref(focusTimespan)
      );
      unsubscribeRef.value = subscribeFocus(() => {
        limitRefresh();
      });
    }
    onInvalidate(() => {
      stopSubscribe();
    });
  });

  onUnmounted(() => {
    stopSubscribe();
  });

  return {
    name: "refreshOnWindowFocusPlugin"
  };
};

export default useRefreshOnWindowFocusPlugin;
