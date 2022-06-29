import { isRef, ref, watch } from "vue";
import type { FetchState, Plugin } from "../types";

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    manual,
    ready = true,
    defaultParams = [],
    refreshDeps = [],
    refreshDepsAction,
  }
) => {
  watch(isRef(ready) ? ready : ref(ready), (curr) => {   
    if (curr && !manual) {     
      fetchInstance.run(...defaultParams);
    }
  });

  watch(refreshDeps, () => {
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
      if (!(isRef(ready) ? ready.value : ready)) {
        return {
          stopNow: true,
        };
      }
    },
  };
};

useAutoRunPlugin.onInit = ({ ready = ref(true), manual }) => {
  return {
    loading: (!manual && isRef(ready) ? ready.value : ready) as FetchState<any, any[]>["loading"],
  };
};

export default useAutoRunPlugin;
