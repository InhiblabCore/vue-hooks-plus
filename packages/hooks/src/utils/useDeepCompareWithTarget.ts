import { ref } from 'vue'
import { isEqual } from 'lodash-es'
import { EffectCallback } from './createEffectWithTarget'
import { DependencyList } from './depsAreSame'
import { BasicTarget } from './domTarget'
import useEffectWithTarget from './useEffectWithTarget'

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps)
}

const useDeepCompareEffectWithTarget = (
  effect: EffectCallback,
  deps: DependencyList,
  target: BasicTarget<any> | BasicTarget<any>[],
) => {
  const targetRef = ref()
  const signalRef = ref<number>(0)

  if (!depsEqual(deps, targetRef.value)) {
    targetRef.value = deps
    signalRef.value += 1
  }

  useEffectWithTarget(effect, [signalRef], target)
}

export default useDeepCompareEffectWithTarget
