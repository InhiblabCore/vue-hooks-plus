import { ref, Ref, unref, UnwrapRef, readonly, DeepReadonly, UnwrapNestedRefs } from 'vue'
import { merge } from 'lodash-es'

type UseSetStateType<S> = S | (() => S) | Ref<S> | (() => Ref<S>)

function useSetState<S extends Record<string, any>>(
  initialState: UseSetStateType<S>,
): [
    DeepReadonly<UnwrapNestedRefs<[S] extends [Ref<any>] ? S : Ref<UnwrapRef<S>>>>,
    (patch: Record<string, any>, cover?: boolean) => void,
  ] {
  const getInitialState = () => unref(initialState)

  const state = ref<S>(getInitialState() as S)

  const setMergeState = (patch: Record<string, any>, cover = false) => {
    const newState = unref(patch)
    // @ts-ignore
    if (cover) state.value = newState
    else state.value = newState ? merge(state.value, newState) : state.value
  }
  // @ts-ignore
  return [readonly(state), setMergeState]
}

export default useSetState
