import { onMounted, reactive, toRefs, Ref, watch } from 'vue'
import useResizeObserver from '../useResizeObserver'
import useEventListener from '../useEventListener'

import { BasicTarget, getTargetElement } from '../utils/domTarget'

export interface UseElementBoundingOptions {
  /**
   *
   * When the component is mounted, initialize all values to 0
   *
   * @default true
   */
  reset?: boolean
  /**
   *
   * windowResize
   *
   * @default true
   */
  windowResize?: boolean
  /**
   *
   * windowScroll
   *
   * @default true
   */
  windowScroll?: boolean
  /**
   *
   * immediate
   *
   * @default true
   */
  immediate?: boolean
}

function keyisUseElementBoundingReturnTypeKey(key: string): key is keyof UseElementBoundingReturnType {
  return ['width', 'height', 'top', 'left', 'bottom', 'right'].includes(key)
}

export interface UseElementBoundingReturnType {
  width: Ref<number>
  height: Ref<number>
  top: Ref<number>
  left: Ref<number>
  bottom: Ref<number>
  right: Ref<number>
}

export default function useElementBounding(
  target: BasicTarget,
  options?: UseElementBoundingOptions,
): UseElementBoundingReturnType {
  const { reset = true, windowResize = true, windowScroll = true, immediate = true } = options ?? {}
  const size = reactive({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  })

  const update = () => {
    const targetDom = getTargetElement(target)

    if (!targetDom) {
      if (reset) {
        Object.keys(size).forEach(key => {
          if (keyisUseElementBoundingReturnTypeKey(key))
            size[key] = 0
        })
      }

      return
    }

    if (targetDom) {
      const { width, height, top, left, bottom, right } = targetDom.getBoundingClientRect()

      size.width = width
      size.height = height
      size.top = top
      size.left = left
      size.bottom = bottom
      size.right = right
    }
  }

  if (windowResize) {
    useEventListener('resize', update, {
      passive: true,
    })
  }

  if (windowScroll) {
    useEventListener('scroll', update, {
      capture: true,
      passive: true,
    })
  }

  useResizeObserver(target, update)
  watch(() => getTargetElement(target), update)

  onMounted(() => {
    immediate && update()
  })

  return {
    ...toRefs(size),
  }
}
