import { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import useEffectWithTarget from '../utils/useEffectWithTarget'
import { ref } from 'vue'

export interface UseDropOptions {
  /**
   * The callback when file is dropped or pasted
   * @param files File[]
   * @param event DragEvent
   * @returns void
   */
  onFiles?: (files: File[], event?: DragEvent) => void

  /**
   * The callback when uri is dropped or pasted
   * @param url string
   * @param event DragEvent
   * @returns void
   */
  onUri?: (url: string, event?: DragEvent) => void

  /**
   * The callback when DOM is dropped or pasted
   * @param content any
   * @param event DragEvent
   * @returns void
   */
  onDom?: (content: any, event?: DragEvent) => void
  /**
   * The callback when text is dropped or pasted
   * @param text `string`
   * @param event `ClipboardEvent`
   * @returns `void`
   */
  onText?: (text: string, event?: ClipboardEvent) => void

  /**
   *  On drag enter callback
   * @param event `DragEvent`
   * @returns `void`
   */
  onDragEnter?: (event?: DragEvent) => void

  /**
   * On drag over callback
   * @param event `DragEvent``
   * @returns `void`
   */
  onDragOver?: (event?: DragEvent) => void

  /**
   * On drag leave callback
   * @param event `DragEvent`
   * @returns `void`
   */
  onDragLeave?: (event?: DragEvent) => void

  /**
   * The callback when any is dropped
   * @param event DragEvent
   * @returns void
   */
  onDrop?: (event?: DragEvent) => void

  /**
   * The callback when any is pasted
   * @param event ClipboardEvent
   * @returns void
   */
  onPaste?: (event?: ClipboardEvent) => void
}

const useDrop = (target: BasicTarget, options: UseDropOptions = {}) => {
  const optionsRef = ref(options)

  // https://stackoverflow.com/a/26459269
  const dragEnterTarget = ref<any>()

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target)
      if (!targetElement?.addEventListener) {
        return
      }

      const onData = (dataTransfer: DataTransfer, event: DragEvent | ClipboardEvent) => {
        const uri = dataTransfer.getData('text/uri-list')
        const dom = dataTransfer.getData('custom')

        if (dom && optionsRef.value.onDom) {
          let data = dom
          try {
            data = JSON.parse(dom)
          } catch (e) {
            data = dom
          }
          optionsRef.value.onDom(data, event as DragEvent)
          return
        }

        if (uri && optionsRef.value.onUri) {
          optionsRef.value.onUri(uri, event as DragEvent)
          return
        }

        if (dataTransfer.files && dataTransfer.files.length && optionsRef.value.onFiles) {
          optionsRef.value.onFiles(Array.from(dataTransfer.files), event as DragEvent)
          return
        }

        if (dataTransfer.items && dataTransfer.items.length && optionsRef.value.onText) {
          dataTransfer.items[0].getAsString(text => {
            optionsRef.value.onText!(text, event as ClipboardEvent)
          })
        }
      }

      const onDragEnter = (event: DragEvent) => {
        event.preventDefault()
        event.stopPropagation()

        dragEnterTarget.value = event.target
        optionsRef.value.onDragEnter?.(event)
      }

      const onDragOver = (event: DragEvent) => {
        event.preventDefault()
        optionsRef.value.onDragOver?.(event)
      }

      const onDragLeave = (event: DragEvent) => {
        if (event.target === dragEnterTarget.value) {
          optionsRef.value.onDragLeave?.(event)
        }
      }

      const onDrop = (event: DragEvent) => {
        event.preventDefault()
        onData(event.dataTransfer!, event)
        optionsRef.value.onDrop?.(event)
      }

      const onPaste = (event: ClipboardEvent) => {
        onData(event.clipboardData!, event)
        optionsRef.value.onPaste?.(event)
      }

      targetElement.addEventListener('dragenter', onDragEnter as any)
      targetElement.addEventListener('dragover', onDragOver as any)
      targetElement.addEventListener('dragleave', onDragLeave as any)
      targetElement.addEventListener('drop', onDrop as any)
      targetElement.addEventListener('paste', onPaste as any)

      return () => {
        targetElement.removeEventListener('dragenter', onDragEnter as any)
        targetElement.removeEventListener('dragover', onDragOver as any)
        targetElement.removeEventListener('dragleave', onDragLeave as any)
        targetElement.removeEventListener('drop', onDrop as any)
        targetElement.removeEventListener('paste', onPaste as any)
      }
    },
    [],
    target,
  )
}

export default useDrop
