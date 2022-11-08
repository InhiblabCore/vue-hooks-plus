import { ref, watchEffect, onUnmounted, unref } from "vue";
import type { Plugin } from "../types";
import limit from "../utils/limit";
import subscribeFocus from "../utils/subscribeFocus";

const useRefreshOnWindowFocusPlugin: Plugin<any, any[]> = (
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

  return {};
};

export default useRefreshOnWindowFocusPlugin;
