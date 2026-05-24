import { nextTick, onMounted, onScopeDispose, reactive, toRefs, Ref } from 'vue'
import useEventListener from '../useEventListener'
import useResizeObserver from '../useResizeObserver'

import { BasicTarget, getTargetElement } from '../utils/domTarget'

type Size = { width: Readonly<Ref<number>>; height: Readonly<Ref<number>> }

/**
 *
 * @param {dom id节点或者 ref句柄} target
 */
export default function useSize(target: BasicTarget): Size {
  const size = reactive({
    width: 0,
    height: 0,
  })
  let frame: number | undefined
  const getSizeInfo = () => {
    const targetDom = getTargetElement(target)
    const width = targetDom?.clientWidth ?? 0
    const height = targetDom?.clientHeight ?? 0
    if (size.width !== width) size.width = width
    if (size.height !== height) size.height = height
  }
  const scheduleUpdate = () => {
    if (typeof requestAnimationFrame !== 'function') {
      nextTick(getSizeInfo)
      return
    }
    if (frame !== undefined) cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      frame = undefined
      getSizeInfo()
    })
  }
  useResizeObserver(target, scheduleUpdate)
  useEventListener('resize', scheduleUpdate, { passive: true })
  onMounted(() => {
    nextTick(getSizeInfo)
  })
  onScopeDispose(() => {
    if (frame !== undefined) cancelAnimationFrame(frame)
  })
  return { ...toRefs(size) }
}
