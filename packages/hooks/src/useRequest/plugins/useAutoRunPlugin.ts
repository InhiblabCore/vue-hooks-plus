import { isRef, ref, watch, watchEffect } from 'vue'
import { FetchState, Plugin } from '../types'

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
	fetchInstance,
	{
		manual,
		ready = true,
		defaultParams = [],
		refreshDeps = [],
		refreshDepsAction,
	}
) => {
	const hasAutoRun = ref(false)
	hasAutoRun.value = false

	watchEffect(() => {
		if (!manual) {
			if (isRef(ready) ? ready.value : ready) {
				hasAutoRun.value = true
				fetchInstance.run(...defaultParams)
			}
		}
	})

	watch(refreshDeps, () => {
		if (!manual && hasAutoRun.value) {
			if (refreshDepsAction) {
				refreshDepsAction()
			} else {
				fetchInstance.refresh()
			}
		}
	})

	return {
		onBefore: () => {
			if (!(isRef(ready) ? ready.value : ready)) {
				return {
					stopNow: true,
				}
			}
		},
	}
}

useAutoRunPlugin.onInit = ({ ready = ref(true), manual }) => {
	return {
		loading: (!manual && isRef(ready) ? ready.value : ready) as FetchState<
			any,
			any[]
		>['loading'],
	}
}

export default useAutoRunPlugin
