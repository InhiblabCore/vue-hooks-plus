import { watch, Ref, unref, ref } from 'vue'
import { until, createEventHook, tryOnUnmounted } from '@vueuse/core'

import darktheme from 'theme-vitesse/themes/vitesse-dark.json'
import lightTheme from 'theme-vitesse/themes/vitesse-light.json'
import type { editor as Editor } from 'monaco-editor'
import { editorPlugins } from '~/monaco/plugins/editor'
import setupMonaco from '~/monaco'
import { isDark } from '~/logic/dark'

export function useMonaco(target: Ref, options: any) {
  const changeEventHook = createEventHook<string>()
  const isSetup = ref(false)
  let editor: Editor.IStandaloneCodeEditor

  const setContent = async(content: string) => {
    await until(isSetup).toBeTruthy()
    if (editor)
      editor.setValue(content)
  }

  const init = async() => {
    const { monaco } = await setupMonaco()
    // @ts-expect-error
    monaco.editor.defineTheme('vitesse-dark', darktheme)
    // @ts-expect-error
    monaco.editor.defineTheme('vitesse-light', lightTheme)

    watch(target, () => {
      const el = unref(target)

      if (!el)
        return

      const extension = () => {
        if (options.language === 'typescript')
          return 'ts'
        else if (options.language === 'javascript')
          return 'js'
        else if (options.language === 'html')
          return 'html'
      }

      const model = monaco.editor.createModel(options.code, options.language, monaco.Uri.parse(`file:///root/${Date.now()}.${extension()}`))
      editor = monaco.editor.create(el, {
        model,
        tabSize: 2,
        insertSpaces: true,
        autoClosingQuotes: 'always',
        detectIndentation: false,
        folding: false,
        automaticLayout: true,
        theme: 'vitesse-dark',
        minimap: {
          enabled: false,
        },
      })

      isSetup.value = true

      watch(isDark, () => {
        if (isDark.value)
          monaco.editor.setTheme('vitesse-dark')
        else
          monaco.editor.setTheme('vitesse-light')
      }, { immediate: true })

      const plugins = editorPlugins.filter(({ language }) => language === options.language)
      editor.getModel()?.onDidChangeContent(() => {
        changeEventHook.trigger(editor.getValue())
        plugins.forEach(({ onContentChanged }) => onContentChanged(editor))
      })
    }, {
      flush: 'post',
      immediate: true,
    })
  }

  init()

  tryOnUnmounted(() => stop())

  return {
    onChange: changeEventHook.on,
    setContent,
  }
}
