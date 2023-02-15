import useEventListener from '../useEventListener'
import { BasicTarget } from '../utils/domTarget'
import useBoolean from '../useBoolean'

export interface UseFocusWithinOptions {
  /**
   * Callback to be executed on focus
   * @param e FocusEvent
   * @returns void
   */
  onFocus?: (e: FocusEvent) => void

  /**
   * Callback to be executed on blur
   * @param e FocusEvent
   * @returns void
   */
  onBlur?: (e: FocusEvent) => void

  /**
   * Callback to be executed on focus change
   * @param isFocusWithin boolean
   * @returns void
   */
  onChange?: (isFocusWithin: boolean) => void
}

export default function useFocusWithin(
  /**
   * DOM element or ref
   */
  target: BasicTarget,
  options?: UseFocusWithinOptions,
) {
  const [isFocusWithin, { set: setIsFocusWithin }] = useBoolean(false)
  const { onFocus, onBlur, onChange } = options || {}

  useEventListener(
    'focusin',
    (e: FocusEvent) => {
      if (!isFocusWithin.value) {
        onFocus?.(e)
        onChange?.(true)
        setIsFocusWithin(true)
      }
    },
    {
      target,
    },
  )

  useEventListener(
    'focusout',
    (e: FocusEvent) => {
      // @ts-ignore
      if (isFocusWithin.value && !e.currentTarget?.contains?.(e.relatedTarget)) {
        onBlur?.(e)
        onChange?.(false)
        setIsFocusWithin(false)
      }
    },
    {
      target,
    },
  )

  return isFocusWithin
}
