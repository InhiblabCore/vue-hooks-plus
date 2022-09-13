import { Ref } from "vue";
import { useBoolean } from "../index";
import useEventListener from "../useEventListener";
import type { BasicTarget } from "../utils/domTarget";

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
}

export default function useHover(
  target: BasicTarget,
  options?: Options
): Ref<boolean> {
  const { onEnter, onLeave } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEventListener(
    "mouseenter",
    () => {
      onEnter?.();
      setTrue();
    },
    {
      target,
    }
  );

  useEventListener(
    "mouseleave",
    () => {
      onLeave?.();
      setFalse();
    },
    {
      target,
    }
  );

  return state;
}
