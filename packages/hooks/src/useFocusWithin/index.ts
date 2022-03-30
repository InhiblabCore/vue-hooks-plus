import useEventListener from "../useEventListener";
import type { BasicTarget } from "../utils/domTarget";
import { useBoolean } from "..";

export interface Options {
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (isFocusWithin: boolean) => void;
}

export default function useFocusWithin(target: BasicTarget, options?: Options) {
  const [isFocusWithin, { set: setIsFocusWithin }] = useBoolean(false);
  const { onFocus, onBlur, onChange } = options || {};

  useEventListener(
    "focusin",
    (e: FocusEvent) => {
      if (!isFocusWithin) {
        onFocus?.(e);
        onChange?.(true);
        setIsFocusWithin(true);
      }
    },
    {
      target,
    }
  );

  useEventListener(
    "focusout",
    (e: FocusEvent) => {
      // @ts-ignore
      if (isFocusWithin && !e.currentTarget?.contains?.(e.relatedTarget)) {
        onBlur?.(e);
        onChange?.(false);
        setIsFocusWithin(false);
      }
    },
    {
      target,
    }
  );

  return isFocusWithin;
}
