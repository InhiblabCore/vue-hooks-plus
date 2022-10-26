import screenfull from 'screenfull';
import { onUnmounted,ref} from 'vue';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

export interface Options {
  onExit?: () => void;
  onEnter?: () => void;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onExit, onEnter } = options || {};

  const onExitRef = ref(onExit);
  const onEnterRef = ref(onEnter);

  const state = ref(false)
  const setState =  (val:boolean)=>{
    state.value = val
  }

  const onChange = () => {
    if (screenfull.isEnabled) {
      const el = getTargetElement(target);

      if (!screenfull.element) {
        onExitRef.value?.();
        setState(false);
        screenfull.off('change', onChange);
      } else {
        const isFullscreen = screenfull.element === el;
        if (isFullscreen) {
          onEnterRef.value?.();
        } else {
          onExitRef.value?.();
        }
        setState(isFullscreen);
      }
    }
  };

  const enterFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (screenfull.isEnabled) {
      try {
        screenfull.request(el);
        screenfull.on('change', onChange);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const exitFullscreen = () => {
    const el = getTargetElement(target);
    if (screenfull.isEnabled && screenfull.element === el) {
      screenfull.exit();
    }
  };

  const toggleFullscreen = () => {
    if (state.value) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  onUnmounted(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', onChange);
    }
  })

  return [
    state,
    {
      enterFullscreen: enterFullscreen,
      exitFullscreen: exitFullscreen,
      toggleFullscreen: toggleFullscreen,
      isEnabled: screenfull.isEnabled,
    },
  ] as const;
};

export default useFullscreen;
