import 'intersection-observer'
import { ref } from 'vue'
import { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import useEffectWithTarget from '../utils/useEffectWithTarget'

export interface UseInViewportOptions {
  /**
   * Margin around the root
   */
  rootMargin?: string

  /**
   * Either a single number or an array of numbers which indicate at what percentage of the target's visibility the ratio should be executed
   */
  threshold?: number | number[]

  /**
   * The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
   */
  root?: BasicTarget<Element>
}

function useInViewport(target: BasicTarget, options?: UseInViewportOptions) {
  const state = ref<boolean>()
  const ratio = ref<number>()

  useEffectWithTarget(
    () => {
      const el = getTargetElement(target)
      if (!el) {
        return
      }

      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            state.value = entry.isIntersecting
            ratio.value = entry.intersectionRatio
          }
        },
        {
          ...options,
          root: getTargetElement(options?.root),
        },
      )

      observer.observe(el)

      return () => {
        observer.disconnect()
      }
    },
    [],
    target,
  )

  return [state, ratio] as const
}

export default useInViewport
