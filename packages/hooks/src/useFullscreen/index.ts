import screenfull from 'screenfull'
import { onUnmounted, readonly, ref } from 'vue'
import { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'

export interface UseFullscreenOptions {
  /**
   * Exit full screen trigger
   * @returns void
   */
  onExit?: () => void

  /**
   * Enter full screen trigger
   * @returns void
   */
  onEnter?: () => void

  /**
   *
   * The element enters full screen by default when the binding element is not found or the element is not passed
   * @default html
   */
  defaultElement?: HTMLElement | Element
}

const useFullscreen = (
  /**
   * DOM element or ref
   */
  target?: BasicTarget,
  options?: UseFullscreenOptions,
) => {
  const { onExit, onEnter, defaultElement = document.documentElement } = options || {}

  const onExitRef = ref(onExit)
  const onEnterRef = ref(onEnter)

  const state = ref(false)
  const setState = (val: boolean) => {
    state.value = val
  }

  const onChange = () => {
    if (screenfull.isEnabled) {
      const el = getTargetElement(target, defaultElement)

      if (!screenfull.element) {
        onExitRef.value?.()
        setState(false)
        screenfull.off('change', onChange)
      } else {
        const isFullscreen = screenfull.element === el
        if (isFullscreen) {
          onEnterRef.value?.()
        } else {
          onExitRef.value?.()
        }
        setState(isFullscreen)
      }
    }
  }

  const enterFullscreen = () => {
    const el = getTargetElement(target, defaultElement)
    if (!el) {
      return
    }

    if (screenfull.isEnabled) {
      try {
        screenfull.request(el)
        screenfull.on('change', onChange)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const exitFullscreen = () => {
    const el = getTargetElement(target, defaultElement)
    if (screenfull.isEnabled && screenfull.element === el) {
      screenfull.exit()
    }
  }

  const toggleFullscreen = () => {
    if (state.value) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  onUnmounted(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', onChange)
    }
  })

  return [
    readonly(state),
    {
      enterFullscreen: enterFullscreen,
      exitFullscreen: exitFullscreen,
      toggleFullscreen: toggleFullscreen,
      isEnabled: screenfull.isEnabled,
    },
  ] as const
}

export default useFullscreen
