import { ref } from 'vue'
import { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import useEffectWithTarget from '../utils/useEffectWithTarget'

type noop = (...p: any) => void

export type UseEventListenerTarget = BasicTarget<HTMLElement | Element | Window | Document>

type UseEventListenerOptions<T extends UseEventListenerTarget = UseEventListenerTarget> = {
  /**
   * DOM element or ref
   */
  target?: T

  /**
   * Optional, a Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
   */
  capture?: boolean

  /**
   * Optional, A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.
   */
  once?: boolean

  /**
   * Optional, A Boolean which, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning.
   */
  passive?: boolean
}

function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: UseEventListenerOptions<HTMLElement>,
): void
function useEventListener<K extends keyof ElementEventMap>(
  eventName: K,
  handler: (ev: ElementEventMap[K]) => void,
  options?: UseEventListenerOptions<Element>,
): void
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (ev: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions<Document>,
): void
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: UseEventListenerOptions<Window>,
): void
function useEventListener(eventName: string, handler: noop, options: UseEventListenerOptions): void

function useEventListener(
  /**
   * Event name
   */
  eventName: string,

  /**
   *  Callback function
   */
  handler: noop,
  options: UseEventListenerOptions = {},
) {
  const handlerRef = ref(handler)

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(options.target, window)
      if (!targetElement?.addEventListener) {
        return
      }
      const eventListener = (event: Event) => {
        return handlerRef.value(event)
      }

      targetElement.addEventListener(eventName, eventListener, {
        capture: options.capture,
        once: options.once,
        passive: options.passive,
      })

      return () => {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture,
        })
      }
    },
    [eventName, options.capture, options.once, options.passive],
    options.target,
  )
}

export default useEventListener
