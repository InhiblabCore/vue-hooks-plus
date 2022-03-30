import { ref, Ref, markRaw } from "vue";

interface Actions<T> {
  add: (value: T) => void;
  remove: (value: T) => void;
  has: (value: T) => boolean;
  clear: () => void;
  reset: () => void;
}

function useSet<T = any>(
  initialValue?: T[]
): [state: Ref<Set<any>>, actions: Actions<T>];

function useSet<T = any>(initialValue?: T[]) {
  const initialSet = initialValue ? new Set(initialValue) : new Set();
  const state = ref(initialSet);

  const actions: Actions<T> = {
    add: (value: T) => {
      state.value.add(value);
    },
    remove: (value: T) => {
      state.value.delete(value);
    },
    has: (value: T) => state.value.has(value),
    clear: () => state.value.clear(),
    reset: () => {
      state.value = new Set();
    },
  };

  return [state, markRaw(actions)];
}

export default useSet;
