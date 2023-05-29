import { computed, ref, WatchSource } from 'vue'
import isEqual from 'lodash/isEqual'

export type EffectCallback = () => void
export type DependencyList = WatchSource | any[] | any

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps)
}

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  const prevDependencies = ref<DependencyList>(deps)
  const areDeepsEqual = depsEqual(prevDependencies.value, deps)
  if (!areDeepsEqual) {
    prevDependencies.value = deps
  }

  return computed(() => prevDependencies.value && effect)
}

export default useDeepCompareEffect
