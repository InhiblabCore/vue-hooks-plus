import { ref, Ref, watch } from "vue";
import useDebounceFn from "../useDebounceFn";
import type { DebounceOptions } from "../useDebounceFn";

function useDebounce<T>(value: Ref<T>, options?: DebounceOptions) {
  const debounced = ref<T>(value.value) as Ref<T>;
  const { run } = useDebounceFn(() => (debounced.value = value.value), options);
  watch(value, () => run(), { deep: true });
  return debounced;
}
export default useDebounce;
