import { computed, Ref, watch, ref, shallowRef } from 'vue'
import useSize from '../useSize'
import { getTargetElement } from '../utils/domTarget'

export type UseVirtualListTargetValue<T> = T | undefined | null

// TODO 准备重构
export interface UseVirtualListOptions<T> {
  wrapperTarget: Ref<UseVirtualListTargetValue<HTMLElement>>
  itemHeight: number | ((index: number, data: T) => number)
  overscan?: number
}

const useVirtualList = <T = any>(list: Ref<T[]>, options: UseVirtualListOptions<T>) => {
  // 外部容器ref实例
  const containerTarget = ref<UseVirtualListTargetValue<HTMLElement>>()

  // 列表容器ref实例
  const { wrapperTarget, itemHeight, overscan = 5 } = options

  // 列表子项的高度
  // const itemHeightRef = ref(itemHeight)

  // 计算外部容器的尺寸
  const size = useSize(containerTarget)

  // 目标列表数据
  const targetList = shallowRef<{ index: number; data: T }[]>([])

  const scrollTriggerByScrollToFunc = ref(false)
  let cachedList: T[] | undefined
  let cachedHeights: number[] = []
  let cachedPrefixHeights: number[] = []

  const ensureHeightCache = () => {
    if (typeof itemHeight === 'number') return
    if (cachedList === list.value && cachedPrefixHeights.length === list.value.length + 1) return

    cachedList = list.value
    cachedHeights = list.value.map((item, index) => itemHeight(index, item))
    cachedPrefixHeights = [0]
    for (let i = 0; i < cachedHeights.length; i++) {
      cachedPrefixHeights[i + 1] = cachedPrefixHeights[i] + cachedHeights[i]
    }
  }

  const findOffsetByScrollTop = (scrollTop: number) => {
    ensureHeightCache()
    let left = 0
    let right = cachedPrefixHeights.length - 1
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (cachedPrefixHeights[mid] >= scrollTop) right = mid
      else left = mid + 1
    }
    return Math.max(1, left)
  }

  const getVisibleCount = (containerHeight: number, fromIndex: number) => {
    if (typeof itemHeight === 'number') {
      return Math.ceil(containerHeight / itemHeight)
    }

    let sum = 0
    let endIndex = 0
    ensureHeightCache()
    for (let i = fromIndex; i < list.value.length; i++) {
      const height = cachedHeights[i] ?? itemHeight(i, list.value[i])
      sum += height
      endIndex = i
      if (sum >= containerHeight) {
        break
      }
    }
    return endIndex - fromIndex
  }

  // 计算指定滚动高度的项在列表中的偏移量（索引+1）
  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTop / itemHeight) + 1
    }
    return findOffsetByScrollTop(scrollTop)
  }

  // 获取偏移元素的上部高度
  const getDistanceTop = (index: number) => {
    if (typeof itemHeight === 'number') {
      const height = index * itemHeight
      return height
    }
    ensureHeightCache()
    return cachedPrefixHeights[index] ?? 0
  }

  // 首次数据总量的高度
  const totalHeight = computed(() => {
    if (typeof itemHeight === 'number') {
      return list.value.length * itemHeight
    }
    ensureHeightCache()
    return list.value.reduce(
      (sum: number, _: T, index: number) =>
        sum + (cachedHeights[index] ?? itemHeight(index, list.value[index])),
      0,
    )
  })

  // 计算当前列表应该渲染的项的索引范围
  const calculateRange = () => {
    // 获取外部容器，主要是滚动条
    const container = getTargetElement(containerTarget)

    // 获取包裹列表的容器，主要是容器样式
    const wrapper = getTargetElement(wrapperTarget)

    if (container && wrapper) {
      // 获取外部容器顶部到可视内容的距离的高度 和 获取内容高度
      const { scrollTop, clientHeight } = container

      // 偏移索引
      const offset = getOffset(scrollTop)

      // 获取视图列表项个数
      const visibleCount = getVisibleCount(clientHeight, offset)

      // 截取数组的开始，比如overscan=10  offset(1,2,3,4...) - overscan为-9 ,知道为0的时候，overscan达标，开始从0截取数组
      const start = Math.max(0, offset - overscan)

      // 截取数组的结束，在overscan的限度上，加上可视区域和偏移量作为数据量的缓冲，保证后续可以缓冲看到持续的内容
      const end = Math.min(list.value.length, offset + visibleCount + overscan)

      // 获取上部分的偏移量，verscan=10  offset(1,2,3,4...) - overscan为-9 ,直到0的时候，其实数据的高度为数据总量，当start变为1的时候，其实数据总量应该是total-1，所以需要减去偏移值
      const offsetTop = getDistanceTop(start)

      wrapper.style.height = totalHeight.value - offsetTop + 'px'

      wrapper.style.marginTop = offsetTop + 'px'

      targetList.value = list.value.slice(start, end).map((ele, index) => ({
        data: ele,
        index: index + start,
      }))
    }
  }

  // 当size和list变化重新计算偏移
  watch([size?.width, size?.height, list], () => {
    calculateRange()
  })

  // 快速滚动到指定元素
  const scrollTo = (index: number) => {
    const container = getTargetElement(containerTarget)
    if (container) {
      scrollTriggerByScrollToFunc.value = true

      container.scrollTop = getDistanceTop(index)
      calculateRange()
    }
  }

  // 滚动容器的外层监听
  const container = {
    ref: (ele: any) => {
      containerTarget.value = ele
    },
    onScroll: (e: any) => {
      if (scrollTriggerByScrollToFunc.value) {
        scrollTriggerByScrollToFunc.value = false
        return
      }

      e.preventDefault()
      calculateRange()
    },
  }

  return [targetList, container, scrollTo] as const
}

export default useVirtualList
