import { ref, watchEffect } from "vue";
import type { DebouncedFunc, ThrottleSettings } from "lodash";
import throttle from "lodash/throttle";
import type { Plugin } from "../types";

const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing }
) => {
  const throttledRef = ref<DebouncedFunc<any>>();



  const options: ThrottleSettings = {};
  if (throttleLeading?.value !== undefined) {
    options.leading = throttleLeading.value;
  }
  if (throttleTrailing?.value !== undefined) {
    options.trailing = throttleTrailing.value;
  }

  watchEffect((onInvalidate) => {
    if (throttleWait) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);

      throttledRef.value = throttle(
        (callback: any) => {
          callback();
        },
        throttleWait,
        options
      );
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          throttledRef.value?.(() => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });
        });
      };

      onInvalidate(() => {
        fetchInstance.runAsync = _originRunAsync;
        throttledRef.value?.cancel();
      });
    }
  });

  if (!throttleWait) {
    return {};
  }

  return {
    onCancel: () => {
      throttledRef.value?.cancel();
    },
  };
};

export default useThrottlePlugin;
