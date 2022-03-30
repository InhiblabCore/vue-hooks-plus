import type { Ref, ComputedRef } from "vue";
import useToggle from "../useToggle";
import { computed } from "vue";

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
}

export default function useBoolean(
  defaultValue = false
): [Ref<boolean>, Actions] {
  const [state, { set }] = useToggle(defaultValue);
  const actions: ComputedRef<Actions> = computed(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      set: (v: boolean) => set(!!v),
      setTrue,
      setFalse,
    };
  });

  return [state, { ...actions.value }];
}
