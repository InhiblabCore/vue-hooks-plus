import { ref, watch } from "vue";
import type { FetchState, Plugin } from "../types";

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    manual,
    ready = ref(true),
    defaultParams = [],
    refreshDeps = [],
    refreshDepsAction,
  }
) => {
  watch(ready, (curr) => {   
    if (curr && !manual) {     
      fetchInstance.run(...defaultParams);
    }
  });

  watch([...refreshDeps], () => {
    if (!manual) {
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.refresh();
      }
    }
  });

  return {
    onBefore: () => {       
      if (!ready.value) {
        return {
          stopNow: true,
        };
      }
    },
  };
};

useAutoRunPlugin.onInit = ({ ready = ref(true), manual }) => {
  return {
    loading: (!manual && ready.value) as FetchState<any, any[]>["loading"],
  };
};

export default useAutoRunPlugin;
