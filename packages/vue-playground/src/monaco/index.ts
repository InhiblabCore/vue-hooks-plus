import { getCurrentInstance, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { createSingletonPromise } from '@antfu/utils'
/* __imports__ */

import vueuseTypes from '@vueuse/core/index.d.ts?raw'
import vueTypes from '@vue/runtime-core/dist/runtime-core.d.ts?raw'

import { orchestrator } from '~/orchestrator'

const setup = createSingletonPromise(async() => {
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.javascriptDefaults.getCompilerOptions(),
    noUnusedLocals: false,
    noUnusedParameters: false,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    strict: false,
    allowJs: true,
  })

  const registered: string[] = ['vue', '@vueuse/core']

  monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    declare module '@vueuse/core' { ${vueuseTypes} }
  `, 'ts:vueuse')

  monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    declare module 'vue' { ${vueTypes} }
  `, 'ts:vue')

  watch(() => orchestrator.packages, () => {
    orchestrator.packages.forEach((pack) => {
      if (registered.includes(pack.name))
        return

      registered.push(pack.name)
      monaco.languages.typescript.javascriptDefaults.addExtraLib(`
        declare module '${pack.name}' {
          let x: any;
          export = x;
        }
      `, pack.name)
    })
  }, { immediate: true })

  await Promise.all([
    // load workers
    (async() => {
      const [
        { default: EditorWorker },
        { default: HtmlWorker },
        { default: TsWorker },
      ] = await Promise.all([
        import('monaco-editor/esm/vs/editor/editor.worker?worker'),
        import('./languages/html/html.worker?worker'),
        import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'),
      ])

      // @ts-expect-error
      window.MonacoEnvironment = {
        getWorker(_: any, label: string) {
          if (label === 'html' || label === 'handlebars' || label === 'razor')
            return new HtmlWorker()
          if (label === 'typescript' || label === 'javascript')
            return new TsWorker()
          return new EditorWorker()
        },
      }
    })(),
  ])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const injection_arg = monaco

  /* __async_injections__ */

  if (getCurrentInstance())
    await new Promise<void>(resolve => onMounted(resolve))

  return { monaco }
})

export default setup

setup()
