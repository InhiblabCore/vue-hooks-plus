import { Ref, watch } from 'vue'

export type UseTrackedEffect = (
  changes?: number[],
  previousDeps?: Ref[],
  currentDeps?: Ref[],
) => void | (() => void)

const diffTwoDeps = (deps1?: Ref[], deps2?: Ref[]) => {
  return deps1
    ? deps1.map((_ele, idx) => (deps1[idx] !== deps2?.[idx] ? idx : -1)).filter(ele => ele >= 0)
    : deps2
    ? deps2.map((_ele, idx) => idx)
    : []
}

const useTrackedEffect = (effect: UseTrackedEffect, deps?: Ref[]) => {
  watch(deps ?? [], (curr, prev) => {
    const changes = diffTwoDeps(prev, curr)
    effect(changes)
  })
}

export default useTrackedEffect
