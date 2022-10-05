import { ref, watchEffect, onUnmounted, isRef } from "vue";
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
    if (isRef(refreshOnWindowFocus) ? refreshOnWindowFocus.value : refreshOnWindowFocus) {
      const limitRefresh = limit(
        fetchInstance.refresh.bind(fetchInstance),
        isRef(focusTimespan) ? focusTimespan.value : focusTimespan
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
