import type { BasicTarget } from "../utils/domTarget";
import { getTargetElement } from "../utils/domTarget";
import useEffectWithTarget from "../utils/useEffectWithTarget";
import { ref } from "vue";

export interface Options {
  onFiles?: (files: File[], event?: DragEvent) => void;
  onUri?: (url: string, event?: DragEvent) => void;
  onDom?: (content: any, event?: DragEvent) => void;
  onText?: (text: string, event?: ClipboardEvent) => void;
  onDragEnter?: (event?: DragEvent) => void;
  onDragOver?: (event?: DragEvent) => void;
  onDragLeave?: (event?: DragEvent) => void;
  onDrop?: (event?: DragEvent) => void;
  onPaste?: (event?: ClipboardEvent) => void;
}

const useDrop = (target: BasicTarget, options: Options = {}) => {
  const optionsRef = ref(options);

  // https://stackoverflow.com/a/26459269
  const dragEnterTarget = ref<any>();

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const onData = (
        dataTransfer: DataTransfer,
        event: DragEvent | ClipboardEvent
      ) => {
        const uri = dataTransfer.getData("text/uri-list");
        const dom = dataTransfer.getData("custom");

        if (dom && optionsRef.value.onDom) {
          let data = dom;
          try {
            data = JSON.parse(dom);
          } catch (e) {
            data = dom;
          }
          optionsRef.value.onDom(data, event as DragEvent);
          return;
        }

        if (uri && optionsRef.value.onUri) {
          optionsRef.value.onUri(uri, event as DragEvent);
          return;
        }

        if (
          dataTransfer.files &&
          dataTransfer.files.length &&
          optionsRef.value.onFiles
        ) {
          optionsRef.value.onFiles(
            Array.from(dataTransfer.files),
            event as DragEvent
          );
          return;
        }

        if (
          dataTransfer.items &&
          dataTransfer.items.length &&
          optionsRef.value.onText
        ) {
          dataTransfer.items[0].getAsString((text) => {
            optionsRef.value.onText!(text, event as ClipboardEvent);
          });
        }
      };

      const onDragEnter = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        dragEnterTarget.value = event.target;
        optionsRef.value.onDragEnter?.(event);
      };

      const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        optionsRef.value.onDragOver?.(event);
      };

      const onDragLeave = (event: DragEvent) => {
        if (event.target === dragEnterTarget.value) {
          optionsRef.value.onDragLeave?.(event);
        }
      };

      const onDrop = (event: DragEvent) => {
        event.preventDefault();
        onData(event.dataTransfer!, event);
        optionsRef.value.onDrop?.(event);
      };

      const onPaste = (event: ClipboardEvent) => {
        onData(event.clipboardData!, event);
        optionsRef.value.onPaste?.(event);
      };

      targetElement.addEventListener("dragenter", onDragEnter as any);
      targetElement.addEventListener("dragover", onDragOver as any);
      targetElement.addEventListener("dragleave", onDragLeave as any);
      targetElement.addEventListener("drop", onDrop as any);
      targetElement.addEventListener("paste", onPaste as any);

      return () => {
        targetElement.removeEventListener("dragenter", onDragEnter as any);
        targetElement.removeEventListener("dragover", onDragOver as any);
        targetElement.removeEventListener("dragleave", onDragLeave as any);
        targetElement.removeEventListener("drop", onDrop as any);
        targetElement.removeEventListener("paste", onPaste as any);
      };
    },
    [],
    target
  );
};

export default useDrop;
