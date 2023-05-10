import produce, { Draft, freeze } from 'immer'
import { ShallowRef, shallowRef, shallowReadonly } from 'vue'

export type DraftFunction<S> = (draft: Draft<S>) => void
export type Updater<S> = (arg: S | DraftFunction<S>) => void
export type ImmerHook<S> = [Readonly<ShallowRef<S>>, Updater<S>]

export function useImmer<S = any>(initialValue: S | (() => S)): ImmerHook<S>

export function useImmer<S>(initialValue: any) {
  const state = shallowRef(
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue, true),
  )
  const update = (updater: Updater<S>) => {
    if (typeof updater === 'function') {
      state.value = produce(state.value, updater)
    } else state.value = freeze(updater)
  }
  return [shallowReadonly(state), update]
}
