import { Ref } from 'vue'
import { watchEffect, ref, unref, computed } from 'vue'

export interface Options {
  type?: 'js' | 'css'
  js?: Partial<HTMLScriptElement>
  css?: Partial<HTMLStyleElement>
}
// remove external when no used
const EXTERNAL_USED_COUNT: Record<string, number> = {}

export type Status = 'unset' | 'loading' | 'ready' | 'error'

interface loadResult {
  ref: Element
  status: Status
}
const loadScript = (path: string, props = {}): loadResult => {
  const script = document.querySelector(`script[src="${path}"]`)

  if (!script) {
    const newScript = document.createElement('script')
    newScript.src = path

    Object.keys(props).forEach(key => {
      // @ts-ignore
      newScript[key] = props[key]
    })

    newScript.setAttribute('data-status', 'loading')
    document.body.appendChild(newScript)

    return {
      ref: newScript,
      status: 'loading',
    }
  }
  return {
    ref: script,
    status: (script.getAttribute('data-status') as Status) || 'ready',
  }
}

const loadCss = (path: string, props = {}): loadResult => {
  const css = document.querySelector(`link[href="${path}"]`)
  if (!css) {
    const newCss = document.createElement('link')

    newCss.rel = 'stylesheet'
    newCss.href = path
    Object.keys(props).forEach(key => {
      // @ts-ignore
      newCss[key] = props[key]
    })
    // IE9+
    const isLegacyIECss = 'hideFocus' in newCss
    // use preload in IE Edge (to detect load errors)
    if (isLegacyIECss && newCss.relList) {
      newCss.rel = 'preload'
      newCss.as = 'style'
    }
    newCss.setAttribute('data-status', 'loading')
    document.head.appendChild(newCss)

    return {
      ref: newCss,
      status: 'loading',
    }
  }

  return {
    ref: css,
    status: (css.getAttribute('data-status') as Status) || 'ready',
  }
}

export default function useExternal(path?: string | Ref<string>, options?: Options): Ref<Status> {
  const status = ref<Status>(path ? 'loading' : 'unset')
  const hookRef = ref<Element>()
  const path_ = computed(() => unref(path))
  watchEffect(onInvalidate => {
    if (!path_.value) {
      status.value = 'unset'
      return
    }
    const pathname = path_.value?.replace(/[|#].*$/, '') ?? ''
    if (options?.type === 'css' || (!options?.type && /(^css!|\.css$)/.test(pathname))) {
      const result = loadCss(path_.value ?? '', options?.css)
      hookRef.value = result.ref
      status.value = result.status
    } else if (options?.type === 'js' || (!options?.type && /(^js!|\.js$)/.test(pathname))) {
      const result = loadScript(path_.value ?? '', options?.js)
      hookRef.value = result.ref
      status.value = result.status
    } else {
      // do nothing
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css'). " +
          'Refer to the https://ahooks.js.org/hooks/dom/use-external/#options',
      )
    }
    if (!hookRef.value) {
      return
    }

    if (path_.value && EXTERNAL_USED_COUNT[path_.value] === undefined) {
      EXTERNAL_USED_COUNT[path_.value] = 1
    } else {
      if (path_.value) EXTERNAL_USED_COUNT[path_.value] += 1
    }
    const handler = (event: Event) => {
      const targetStatus = event.type === 'load' ? 'ready' : 'error'
      hookRef.value?.setAttribute('data-status', targetStatus)
      status.value = targetStatus
    }

    hookRef.value.addEventListener('load', handler)
    hookRef.value.addEventListener('error', handler)

    onInvalidate(() => {
      hookRef.value?.removeEventListener('load', handler)
      hookRef.value?.removeEventListener('error', handler)

      if (path_.value) EXTERNAL_USED_COUNT[path_.value] -= 1

      if (path_.value && EXTERNAL_USED_COUNT[path_.value] === 0) {
        hookRef.value?.remove()
      }

      hookRef.value = undefined
    })
  })

  return status
}
