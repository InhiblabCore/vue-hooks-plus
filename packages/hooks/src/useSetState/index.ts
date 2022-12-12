import { ref, Ref, unref, UnwrapRef, readonly, DeepReadonly, UnwrapNestedRefs } from 'vue'
import merge from 'lodash/merge'

type StateType<S> = S | (() => S) | Ref<S> | (() => Ref<S>)

function useSetState<S extends Record<string, any>>(
  initialState: StateType<S>,
): [
  DeepReadonly<UnwrapNestedRefs<[S] extends [Ref<any>] ? S : Ref<UnwrapRef<S>>>>,
  (patch: Record<string, any>) => void,
] {
  const getInitialState = () => unref(initialState)

  const state = ref<S>(getInitialState() as S)

  const setMergeState = (patch: Record<string, any>) => {
    const newState = unref(patch)
    state.value = newState ? merge(state.value, newState) : state.value
  }

  return [readonly(state), setMergeState]
}

export default useSetState
