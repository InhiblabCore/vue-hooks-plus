import { ref, Ref, onUnmounted, onMounted, watch } from "vue";

import isBrowser from "../utils/isBrowser";

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};

function useTitle(title: Ref<string>, options: Options = DEFAULT_OPTIONS) {
  const titleRef = ref(isBrowser ? document.title : "");
  watch(title, () => {
    document.title = title.value;
  });

  onMounted(() => {
    document.title = title.value;
  });

  onUnmounted(() => {
    if (options.restoreOnUnmount) {
      document.title = titleRef.value;
    }
  });
}

export default useTitle;
