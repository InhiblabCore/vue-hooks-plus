import { ref, computed, watchEffect, isRef } from "vue";
import type { DebouncedFunc, DebounceSettings } from "lodash";
import debounce from "lodash/debounce";
import type { Plugin } from "../types";

const useDebouncePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait }
) => {
  const debouncedRef = ref<DebouncedFunc<any>>();
  const options = computed(() => {
    const ret: DebounceSettings = {};
    const debounceLeading_ = isRef(debounceLeading) ? debounceLeading.value : debounceLeading;
    const debounceTrailing_ = isRef(debounceTrailing) ? debounceTrailing.value : debounceTrailing;
    const debounceMaxWait_ = isRef(debounceMaxWait) ? debounceMaxWait.value : debounceMaxWait;
    if (debounceLeading_ !== undefined) {
      ret.leading =debounceLeading_;
    }
    if (debounceTrailing_ !== undefined) {
      ret.trailing = debounceTrailing_
    }
    if (debounceMaxWait_ !== undefined) {
      ret.maxWait =debounceMaxWait_;
    }
    return ret;
  });

  watchEffect((onInvalidate) => {
    if (debounceWait) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
      debouncedRef.value = debounce(
        (callback: any) => {
          callback();
        },
        debounceWait,
        options.value
      );
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          debouncedRef.value?.(() => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });
        });
      };
      onInvalidate(() => {
        debouncedRef.value?.cancel();
        fetchInstance.runAsync = _originRunAsync;
      });
    }
  });

  if (!debounceWait) {
    return {};
  }

  return {
    onCancel: () => {
      debouncedRef.value?.cancel();
    },
  };
};

export default useDebouncePlugin;
