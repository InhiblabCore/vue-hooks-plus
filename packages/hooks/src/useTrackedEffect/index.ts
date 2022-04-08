import { watch } from 'vue'
import { Ref } from 'vue'

type DependencyList = Ref[]
type Effect = (
	changes?: number[],
	previousDeps?: DependencyList,
	currentDeps?: DependencyList
) => void | (() => void)

const diffTwoDeps = (deps1?: DependencyList, deps2?: DependencyList) => {
	return deps1
		? deps1
				.map((_ele, idx) => (deps1[idx] !== deps2?.[idx] ? idx : -1))
				.filter((ele) => ele >= 0)
		: deps2
		? deps2.map((_ele, idx) => idx)
		: []
}

const useTrackedEffect = (effect: Effect, deps?: DependencyList) => {
	watch(deps ?? [], (curr, prev) => {
		const changes = diffTwoDeps(prev, curr)
		effect(changes)
	})
}

export default useTrackedEffect
