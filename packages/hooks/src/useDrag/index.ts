import { ref } from "vue";
import type { BasicTarget } from "../utils/domTarget";
import { getTargetElement } from "../utils/domTarget";
import useEffectWithTarget from "../utils/useEffectWithTarget";

export interface Options {
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
}

const useDrag = <T>(data: T, target: BasicTarget, options: Options = {}) => {
  const optionsRef = ref(options);

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const onDragStart = (event: DragEvent) => {
        optionsRef.value.onDragStart?.(event);
        event.dataTransfer?.setData("custom", JSON.stringify(data));
      };

      const onDragEnd = (event: DragEvent) => {
        optionsRef.value.onDragEnd?.(event);
      };

      targetElement.setAttribute("draggable", "true");

      targetElement.addEventListener("dragstart", onDragStart as any);
      targetElement.addEventListener("dragend", onDragEnd as any);

      return () => {
        targetElement.removeEventListener("dragstart", onDragStart as any);
        targetElement.removeEventListener("dragend", onDragEnd as any);
      };
    },
    [],
    target
  );
};

export default useDrag;
