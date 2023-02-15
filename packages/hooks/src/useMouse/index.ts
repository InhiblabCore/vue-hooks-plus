import useEventListener from '../useEventListener'
import { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import { ref } from 'vue'

export interface UseMouseCursorState {
  screenX: number
  screenY: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  elementX: number
  elementY: number
  elementH: number
  elementW: number
  elementPosX: number
  elementPosY: number
}

const initState: UseMouseCursorState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
  elementX: NaN,
  elementY: NaN,
  elementH: NaN,
  elementW: NaN,
  elementPosX: NaN,
  elementPosY: NaN,
}

export default function useMouse(target?: BasicTarget) {
  const state = ref(initState)

  useEventListener(
    'mousemove',
    (event: MouseEvent) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event
      const newState = {
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        elementX: NaN,
        elementY: NaN,
        elementH: NaN,
        elementW: NaN,
        elementPosX: NaN,
        elementPosY: NaN,
      }
      const targetElement = getTargetElement(target)

      if (targetElement) {
        const { left, top, width, height } = targetElement.getBoundingClientRect()
        newState.elementPosX = left + window.pageXOffset
        newState.elementPosY = top + window.pageYOffset
        newState.elementX = pageX - newState.elementPosX
        newState.elementY = pageY - newState.elementPosY
        newState.elementW = width
        newState.elementH = height
      }
      state.value = newState
    },
    {
      target: document,
    },
  )

  return state
}
