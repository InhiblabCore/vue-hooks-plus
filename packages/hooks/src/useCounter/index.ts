import { ref } from 'vue'
import { isNumber } from '../utils'

export interface Options {
	min?: number
	max?: number
}

export interface Actions {
	inc: (delta?: number) => void
	dec: (delta?: number) => void
	set: (value: number | ((c: number) => number)) => void
	reset: () => void
}

export type ValueParam = number | ((c: number) => number)

function getTargetValue(val: number, options: Options = {}) {
	const { min, max } = options
	let target = val
	if (isNumber(max)) {
		target = Math.min(max, target)
	}
	if (isNumber(min)) {
		target = Math.max(min, target)
	}
	return target
}

function useCounter(initialValue: number = 0, options: Options = {}) {
	const { min, max } = options

	const current = ref(
		getTargetValue(initialValue, {
			min,
			max,
		})
	)

	const setValue = (value: ValueParam) => {
		const target = isNumber(value) ? value : value(current.value)
		current.value = getTargetValue(target, {
			max,
			min,
		})
		return current.value
	}

	const inc = (delta: number = 1) => {
		setValue((c) => c + delta)
	}

	const dec = (delta: number = 1) => {
		setValue((c) => c - delta)
	}

	const set = (value: ValueParam) => {
		setValue(value)
	}

	const reset = () => {
		setValue(initialValue)
	}

	return [
		current,
		{
			inc,
			dec,
			set,
			reset,
		},
	] as const
}

export default useCounter
