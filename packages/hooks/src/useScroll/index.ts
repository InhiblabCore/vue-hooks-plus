import { ref, Ref } from 'vue'
import { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import useEffectWithTarget from '../utils/useEffectWithTarget'

type Position = { left: number; top: number }

export type UseScrollTarget = BasicTarget<Element | Document>
export type UseScrollListenController = (val: Position) => boolean

function useScroll(
  target?: UseScrollTarget,
  shouldUpdate: UseScrollListenController = () => true,
): Ref<Position | undefined> {
  const position = ref<Position>()

  const shouldUpdateRef = ref(shouldUpdate)

  useEffectWithTarget(
    () => {
      const el = getTargetElement(target, document)
      if (!el) {
        return
      }
      const updatePosition = () => {
        let newPosition: Position
        if (el === document) {
          if (document.scrollingElement) {
            newPosition = {
              left: document.scrollingElement.scrollLeft,
              top: document.scrollingElement.scrollTop,
            }
          } else {
            newPosition = {
              left: Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop,
              ),
              top: Math.max(
                window.pageXOffset,
                document.documentElement.scrollLeft,
                document.body.scrollLeft,
              ),
            }
          }
        } else {
          newPosition = {
            left: (el as Element).scrollLeft,
            top: (el as Element).scrollTop,
          }
        }
        if (shouldUpdateRef.value(newPosition)) {
          position.value = newPosition
        }
      }

      updatePosition()

      el.addEventListener('scroll', updatePosition)
      return () => {
        el.removeEventListener('scroll', updatePosition)
      }
    },
    [],
    target,
  )

  return position
}

export default useScroll
