import { watchEffect, ref, Ref, isRef } from 'vue'

function useInterval(
	fn: () => void,
	delay: Ref<number | undefined> | number | undefined,
	options?: {
		immediate?: boolean
	}
) {
	const immediate = options?.immediate

	const fnRef = ref(fn)

	watchEffect((onInvalidate) => {
		if (isRef(delay)) {
			if (typeof delay.value !== 'number' || delay.value < 0) return
		} else {
			if (typeof delay !== 'number' || delay < 0) return
		}
		if (immediate) {
			fnRef.value()
		}
		const _deply = isRef(delay) ? delay.value : delay
		const timer = setInterval(() => {
			fnRef.value()
		}, _deply)
		onInvalidate(() => {
			clearInterval(timer)
		})
	})
}

export default useInterval
