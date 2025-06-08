import { computed, defineComponent, ref, SlotsType, cloneVNode, isVNode } from "vue";
import useMouse from ".";

export const UseMouse = defineComponent({
  name: "UseMouse",
  slots: Object as SlotsType<{
    default: (props: ReturnType<typeof useMouse>["value"]) => any,
    target?: () => any
  }>,
  setup(_, { slots }) {
    const targetRef = ref();
    // @ts-ignore
    const data = useMouse(targetRef);
    return () => {
      const targetVNode = slots.target?.();
      let target = null;
      if (targetVNode && targetVNode.length === 1 && isVNode(targetVNode[0])) {
        target = cloneVNode(targetVNode[0], { ref: targetRef });
      }
      return [
        target,
        slots.default && slots.default(computed(() => data.value).value)
      ];
    };
  },
});