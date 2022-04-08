import { Ref, ref, watch } from 'vue'
import useThrottleFn from '../useThrottleFn'

export interface ThrottleOptions {
	wait?: number
	leading?: boolean
	trailing?: boolean
}

function useThrottle<T>(value: Ref<T>, options?: ThrottleOptions) {
	const throttled = ref()

	const { run } = useThrottleFn(() => {
		throttled.value = value.value as any
	}, options)

	watch(value, () => {
		run.value()
	})

	return throttled
}

export default useThrottle
