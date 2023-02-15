import { Ref } from 'vue-demi'
import { useBoolean } from '../index'
import useEventListener from '../useEventListener'
import { BasicTarget } from '../utils/domTarget'

export interface UseHoverOptions {
  /**
   * Callback to be executed on mouse hover
   * @returns void
   */
  onEnter?: () => void

  /**
   *  Callback to be executed on mouse leave
   * @returns void
   */
  onLeave?: () => void

  /**
   * Callback to be executed on hover change
   * @param isHovering boolean
   * @returns void
   */
  onChange?: (isHovering: boolean) => void
}

export default function useHover(target: BasicTarget, options?: UseHoverOptions): Ref<boolean> {
  const { onEnter, onLeave, onChange } = options || {}

  const [state, { setTrue, setFalse }] = useBoolean(false)

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.()
      setTrue()
      onChange?.(true)
    },
    {
      target,
    },
  )

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.()
      setFalse()
      onChange?.(false)
    },
    {
      target,
    },
  )

  return state
}
