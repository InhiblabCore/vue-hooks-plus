import 'intersection-observer';
import { ref } from 'vue';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

export interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
}

function useInViewport(target: BasicTarget, options?: Options) {
  const state = ref<boolean>();
  const ratio = ref<number>();

  useEffectWithTarget(
    () => {
      const el = getTargetElement(target);
      if (!el) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            state.value = entry.isIntersecting
            ratio.value = entry.intersectionRatio
            
          }
        },
        {
          ...options,
          root: getTargetElement(options?.root),
        },
      );

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    },
    [],
    target,
  );

  return [state, ratio] as const;
}

export default useInViewport;
