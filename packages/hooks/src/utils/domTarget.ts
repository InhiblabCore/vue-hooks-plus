import { isRef } from 'vue';
import type { Ref } from 'vue';
import isBrowser from './isBrowser';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | Ref<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;
  if (typeof target === 'function') {
    targetElement = target();
  } else if (isRef(target)) {
    targetElement = target.value;
  } else {
    targetElement = target;
  }
  return targetElement;
}
