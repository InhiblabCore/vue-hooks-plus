import { BasicTarget, getTargetElement } from '../utils/domTarget'
import { DeepReadonly, readonly, Ref, ref } from 'vue'
import useEffectWithTarget from '../utils/useEffectWithTarget'

export interface UseLongPressOptions {
  delay?: number;
  minUpdateTime?: number;
  cancelOnMove?: boolean;
  modifiers?: LongPressModifiers;
}

export interface LongPressModifiers {
  stop?: boolean;
  once?: boolean;
  prevent?: boolean;
  capture?: boolean;
  self?: boolean;
}

type MouseDownEvents = 'touchstart' | 'mousedown';
type MouseUpEvents = 'touchend' | 'mouseup';
type MouseMoveEvents = 'touchmove' | 'mousemove';

const useLongPress: ( target: BasicTarget, options?: UseLongPressOptions ) => {
  pressingTime: DeepReadonly<Ref<number>>;
  isPressing: DeepReadonly<Ref<boolean>>
} = ( target: BasicTarget, options: UseLongPressOptions = {} ) => {
  const DEFAULT_DELAY_TIME = 500
  const DEFAULT_UPDATE_TIME = 100

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const mouseDown: MouseDownEvents = isTouch ? 'touchstart' : 'mousedown';
  const mouseUp: MouseUpEvents = isTouch ? 'touchend' : 'mouseup';
  const mouseMove: MouseMoveEvents = isTouch ? 'touchmove' : 'mousemove';
  const isPressing = ref<boolean>(false)
  const pressingTime = ref(0);

  let pressingTimer: ReturnType<typeof setTimeout> | undefined;
  let timeoutTimer: ReturnType<typeof setTimeout> | undefined;
  const eventOptions = {
    capture: options?.modifiers?.capture,
    once: options?.modifiers?.once,
  };

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target)
      if (!targetElement) {
        return
      }

      function clear() {
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
          timeoutTimer = undefined;
        }

        if (pressingTimer) {
          clearInterval(pressingTimer);
          pressingTimer = undefined;
        }
        pressingTime.value = 0;
        isPressing.value = false;
      }

      function onDown( ev: Event ): void {
        if (options.modifiers?.self && ev.target !== targetElement) return;

        clear();

        if (options.modifiers?.prevent) ev.preventDefault();

        if (options.modifiers?.stop) ev.stopPropagation();

        timeoutTimer = setTimeout(() => {
          isPressing.value = true;
          pressingTimer = setInterval(() => {
            pressingTime.value += options.minUpdateTime || DEFAULT_UPDATE_TIME;
          }, options.minUpdateTime || DEFAULT_UPDATE_TIME)
        }, options.delay || DEFAULT_DELAY_TIME);
      }


      targetElement.addEventListener(mouseDown, onDown, eventOptions);
      targetElement.addEventListener(mouseUp, clear, eventOptions);
      if (options.cancelOnMove ?? true) {
        targetElement.addEventListener(mouseMove, clear, eventOptions);
      }

      return () => {
        targetElement.removeEventListener(mouseDown, onDown);
        targetElement.removeEventListener(mouseUp, clear);
        if (options.cancelOnMove ?? true) {
          targetElement.removeEventListener(mouseMove, clear);
        }
      }
    },
    [],
    target,
  )

  return { isPressing: readonly(isPressing), pressingTime: readonly(pressingTime) }
}

export default useLongPress
