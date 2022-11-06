import type { Ref } from "vue";
import useToggle from "../useToggle";

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}

export default function useBoolean(
  defaultValue = false
): [Ref<boolean>, Actions] {
  const [state, { set, toggle }] = useToggle(defaultValue);
  const actions = {
    set: (v: boolean) => set(!!v),
    setTrue: () => set(true),
    setFalse: () => set(false),
    toggle,
  }

  return [state, actions];
}
