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

type MouseDownEvents = 'pointerdown' | 'touchstart' | 'mousedown';
type MouseUpEvents = 'pointerup' | 'touchend' | 'mouseup';
type MouseMoveEvents = 'pointermove' | 'touchmove' | 'mousemove';

const getSupportedMouseEvents = (): {
  mouseMove: MouseMoveEvents;
  mouseUp: MouseUpEvents;
  mouseDown: MouseDownEvents
} => {
  const hasPointEvent = 'PointerEvent' in window;
  if (hasPointEvent) {
    return {
      mouseDown: 'pointerdown',
      mouseUp: 'pointerup',
      mouseMove: 'pointermove'
    }
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouch) {
    return {
      mouseDown: 'touchstart',
      mouseUp: 'touchend',
      mouseMove: 'touchmove'
    }
  }

  return {
    mouseDown: 'mousedown',
    mouseUp: 'mouseup',
    mouseMove: 'mousemove'
  }
}

const useLongPress: ( target: BasicTarget, options?: UseLongPressOptions ) => {
  pressingTime: DeepReadonly<Ref<number>>;
  isPressing: DeepReadonly<Ref<boolean>>
} = ( target: BasicTarget, options: UseLongPressOptions = {} ) => {
  const DEFAULT_DELAY_TIME = 500
  const DEFAULT_UPDATE_TIME = 100

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

      const { mouseDown, mouseUp, mouseMove } = getSupportedMouseEvents()

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
