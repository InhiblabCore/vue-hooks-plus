import { ref, computed, watch, type Ref, type ComputedRef } from 'vue';

export function useControlledState<T, C = T>(
  value: Ref<T | undefined>,
  defaultValue: T,
  onChange?: (v: C, ...args: any[]) => void
): [ComputedRef<T>, (value: T | ((prev: T) => T), ...args: any[]) => void] {
  const isControlled = computed(() => value.value !== undefined);
  const initialValue = value.value ?? defaultValue;
  const internalState = ref(initialValue) as Ref<T>;
  const wasControlled = ref(isControlled.value);

  const currentValue = computed(() =>
    isControlled.value ? value.value! : internalState.value
  );

  watch(isControlled, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.warn(
        `WARN: Component changed from ${wasControlled.value ? 'controlled' : 'uncontrolled'} ` +
        `to ${newVal ? 'controlled' : 'uncontrolled'}`
      );
      wasControlled.value = newVal;
    }
  });

  function setValue(newValue: T | ((prev: T) => T), ...args: any[]) {
    if (typeof newValue === 'function') {
      console.warn(
        'Function callbacks are not supported. See: https://github.com/adobe/react-spectrum/issues/2320'
      );
      const prev = currentValue.value;
      const updatedValue = (newValue as (prev: T) => T)(prev);

      if (!isControlled.value) {
        internalState.value = updatedValue;
      }

      if (!Object.is(prev, updatedValue)) {
        onChange?.(updatedValue as unknown as C, ...args);
      }
    } else {
      const shouldUpdate = !Object.is(currentValue.value, newValue);

      if (!isControlled.value) {
        internalState.value = newValue;
      }

      if (shouldUpdate) {
        onChange?.(newValue as unknown as C, ...args);
      }
    }
  }

  return [currentValue, setValue];
}