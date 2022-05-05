import { watchEffect, computed, ComputedRef } from 'vue'
import { useLocalStorageState } from '..'

import useMedia from '../useMedia'

export default function useDarkMode(): [
	ComputedRef<any>,
	(value?: unknown) => void
] {
	const [enabledState, setEnabledState] = useLocalStorageState(
		'dark-mode-enabled'
	)

	const prefersDarkMode = usePrefersDarkMode()

	const enabled = computed(() => {
		return typeof enabledState.value !== 'undefined'
			? enabledState.value
			: prefersDarkMode.value
	})

	watchEffect(() => {
		const className = 'dark-mode'
		const element = window.document.body
		if (enabled.value) {
			element.classList.add(className)
		} else {
			element.classList.remove(className)
		}
	})
	return [enabled, setEnabledState]
}

function usePrefersDarkMode() {
	return useMedia(['(prefers-color-scheme: dark)'], [true], false)
}
