import { onMounted, reactive, toRefs, Ref } from 'vue';
import useWinResize from '../useWinResize';

import { getTargetElement } from '../utils/domTarget';
type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | Ref<TargetValue<T>>;

type Size = { width: Ref<number>; height: Ref<number> };

/**
 *
 * @param {dom id节点或者 ref句柄} target
 */
export default function useSize(target: BasicTarget): Size | undefined {
  const size = reactive({
    width: 0,
    height: 0,
  });
  const getSizeInfo = () => {
    const targetDom = getTargetElement(target);
    size.width = targetDom?.clientWidth ?? 0;
    size.height = targetDom?.clientHeight ?? 0;
  };
  useWinResize(getSizeInfo);
  onMounted(() => {
    setTimeout(() => {
      getSizeInfo();
    }, 120);
  });
  return { ...toRefs(size) };
}
