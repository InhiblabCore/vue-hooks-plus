import { computed, Ref, watch, ref, onMounted, reactive } from 'vue'
import useSize from '../useSize'
import { getTargetElement } from '../utils/domTarget'

type TargetValue<T> = T | undefined | null

export interface Options<T> {
	wrapperTarget: Ref<TargetValue<HTMLElement>>
	itemHeight: number | ((index: number, data: T) => number)
	overscan?: number
}

const useVirtualList = <T = any>(list: Ref<T[]>, options: Options<T>) => {
	// 外部容器ref实例
	const containerTarget = ref<TargetValue<HTMLElement>>()

	// 列表容器ref实例
	const { wrapperTarget, itemHeight, overscan = 5 } = options

	// 列表子项的高度
	const itemHeightRef = ref(itemHeight)

	// 计算外部容器的尺寸
	const size = useSize(containerTarget)

	// 目标列表数据
	const targetList = ref<{ index: number; data: Ref<T> }[]>([])

	const scrollTriggerByScrollToFunc = ref(false)

	const getVisibleCount = (containerHeight: number, fromIndex: number) => {
		if (typeof itemHeightRef.value === 'number') {
			return Math.ceil(containerHeight / itemHeightRef.value)
		}

		let sum = 0
		let endIndex = 0
		for (let i = fromIndex; i < list.value.length; i++) {
			const height = itemHeightRef.value(i, list.value[i])
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
		if (typeof itemHeightRef.value === 'number') {
			return Math.floor(scrollTop / itemHeightRef.value) + 1
		}
		let sum = 0
		let offset = 0
		for (let i = 0; i < list.value.length; i++) {
			const height = itemHeightRef.value(i, list.value[i])
			sum += height
			if (sum >= scrollTop) {
				offset = i
				break
			}
		}
		return offset + 1
	}

	// 获取偏移元素的上部高度
	const getDistanceTop = (index: number) => {
		if (typeof itemHeightRef.value === 'number') {
			const height = index * itemHeightRef.value
			return height
		}
		const height = list.value
			?.slice(0, index)
			?.reduce(
				(sum, _, i) =>
					sum +
					(itemHeightRef.value as Function)?.(i, list?.value[index as number]),
				0
			)
		return height
	}

	// 首次数据总量的高度
	const totalHeight = computed(() => {
		if (typeof itemHeightRef.value === 'number') {
			return list.value.length * itemHeightRef.value
		}

		return list.value.reduce(
			(sum: any, _: any, index: string | number) =>
				sum +
				(itemHeightRef.value as Function)?.(
					index,
					list?.value[index as number]
				),
			0
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
	watch([size, list], () => {
		if (!size?.width || !size?.height || list.value.length) {
			return
		}
		calculateRange()
	})

	onMounted(() => {
		if (size?.width && size?.height && list.value.length) {
			calculateRange()
		}
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
	const container = reactive({
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
	})

	return [targetList, container, scrollTo] as const
}

export default useVirtualList
