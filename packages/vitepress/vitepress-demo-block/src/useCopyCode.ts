import { reactive, toRefs } from 'vue';

export function useCopyCode(code: string) {
  const state = reactive({
    showTip: false,
  });

  function copyCode() {
    console.log("code", code);

    navigator.clipboard.writeText(code);
    state.showTip = true;
    setTimeout(() => {
      state.showTip = false;
    }, 5 * 1000);
  }

  return {
    ...toRefs(state),
    copyCode,
  };
}
