import { watchEffect, computed, ref } from "vue";
import { EventEmitter, eventEmitterOverall } from "./event";

export type EventEmitterType<T = void> =
  | EventEmitter<T>
  | typeof eventEmitterOverall;

export default function useEventEmitter<T = void>(options?: {
  global?: boolean;
}) {
  const eventRef = ref<EventEmitterType<T>>();

  const eventEmitterOptions = computed(() => options ?? { global: false });

  if (!eventRef.value) {
    eventRef.value = eventEmitterOptions.value.global
      ? (eventRef.value = eventEmitterOverall)
      : (eventRef.value = new EventEmitter());
  }

  watchEffect((onInvalidate) => {
    onInvalidate(() => eventRef.value?.clear());
  });

  return eventRef.value;
}
