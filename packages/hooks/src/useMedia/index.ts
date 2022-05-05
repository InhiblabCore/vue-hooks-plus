import { watchEffect, ref } from 'vue'

export default function useMedia(
	queries: any[],
	values: { [x: string]: any },
	defaultValue: any
) {
	const mediaQueryLists = queries.map((q: string) => window.matchMedia(q))
	const getValue = () => {
		const index = mediaQueryLists.findIndex(
			(mql: { matches: any }) => mql.matches
		)
		return typeof values[index] !== 'undefined' ? values[index] : defaultValue
	}
	const value = ref(getValue())

	const handler = () => {
		value.value = getValue()
	}

	watchEffect((onInvalidate) => {
		mediaQueryLists.forEach(
			(mql: { addListener: (arg0: () => void) => any }) => {
				mql.addListener(handler)
			}
		)
		onInvalidate(() => {
			mediaQueryLists.forEach(
				(mql: { removeListener: (arg0: () => void) => any }) =>
					mql.removeListener(handler)
			)
		})
	})
	return value
}
