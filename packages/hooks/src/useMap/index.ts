import { ref, Ref, markRaw } from "vue";

type MapValue = readonly (readonly [any, any])[];

type Actions<T> = {
  set: (key: string, value: T) => void;
  get: (key: string) => T;
  remove: (key: string) => void;
  has: (key: string) => boolean;
  clear: () => void;
  setAll: (newMap: MapValue) => void;
  reset: () => void;
};

function useMap<T = any>(
  initialValue?: MapValue
): [state: Ref<Map<any, any>>, actions: Actions<T>];

function useMap<T = any>(initialValue?: MapValue) {
  const initialMap = initialValue ? new Map(initialValue) : new Map();
  const state = ref(initialMap) as Ref<Map<any, any>>;

  const actions: Actions<T> = {
    set: (key: any, value: T) => {
      state.value.set(key, value);
    },
    get: (key: any) => {
      return state.value.get(key);
    },
    remove: (key: any) => {
      state.value.delete(key);
    },
    has: (key: any) => state.value.has(key),
    clear: () => state.value.clear(),
    setAll: (newMap: MapValue) => {
      state.value = new Map(newMap);
    },
    reset: () => (state.value = initialMap),
  };

  return [state, markRaw(actions)];
}

export default useMap;
