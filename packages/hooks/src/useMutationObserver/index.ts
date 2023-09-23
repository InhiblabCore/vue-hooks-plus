import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';
import useDeepCompareEffectWithTarget from '../utils/useDeepCompareWithTarget';


const useMutationObserver = (
  callback: MutationCallback,
  target: BasicTarget,
  options: MutationObserverInit = {},
): void => {
  useDeepCompareEffectWithTarget(
    () => {
      const element = getTargetElement(target);
      if (!element) {
        return;
      }
      const observer = new MutationObserver(callback);
      observer.observe(element, options);
      return () => {
        observer?.disconnect();
      };
    },
    [options],
    target,
  );
};

export default useMutationObserver;