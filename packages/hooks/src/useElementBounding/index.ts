import { onMounted, reactive, toRefs, Ref, watch } from 'vue'
import useResizeObserver from '../useResizeObserver'
import useEventListener from '../useEventListener'

import { BasicTarget, getTargetElement } from '../utils/domTarget'

export interface UseElementBoundingOptions {
  /**
   *
   * 当组件为挂载时，将所有值初始化为 0
   *
   * @default true
   */
  reset?: boolean
  /**
   *
   * 监听窗口尺寸变化
   *
   * @default true
   */
  windowResize?: boolean
  /**
   *
   * 监听窗口滚动变化
   *
   * @default true
   */
  windowScroll?: boolean
  /**
   *
   * 组件挂载时立即执行
   *
   * @default true
   */
  immediate?: boolean
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
        // 重置值为 0
        Object.keys(size).forEach(key => {
          // @ts-ignore
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
