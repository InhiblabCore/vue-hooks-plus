<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, watch } from 'vue'
import type { WatchStopHandle } from 'vue'
// import { useElementSize, useCssVar } from '@vueuse/core'
import srcdoc from '../template.html?raw'
import { PreviewProxy } from '~/logic/PreviewProxy'
import { MAIN_FILE, vueRuntimeUrl } from '~/compiler/sfcCompiler'
import { compileModulesForPreview } from '~/compiler/moduleCompiler'
import { orchestrator, orchestrator as store } from '~/orchestrator'
import { isDark } from '~/logic/dark'

const container = ref()
const runtimeError = ref()
const runtimeWarning = ref()
let sandbox: HTMLIFrameElement
let proxy: PreviewProxy
let stopUpdateWatcher: WatchStopHandle

watch([runtimeError, runtimeWarning], () => {
  orchestrator.runtimeErrors = [runtimeError.value, runtimeWarning.value].filter(x => x)
})

// create sandbox on mount
onMounted(createSandbox)
// reset sandbox when import map changes

watch(() => store.importMap, (importMap, prev) => {
  if (!importMap) {
    if (prev) {
      // import-map.json deleted
      createSandbox()
    }
    return
  }
  try {
    const map = JSON.parse(importMap)
    if (!map.imports) {
      store.errors = [
        'import-map.json is missing "imports" field.',
      ]
      return
    }
    if (map.imports.vue) {
      store.errors = [
        'Select Vue versions using the top-right dropdown.\n'
        + 'Specifying it in the import map has no effect.',
      ]
    }
    createSandbox()
  }
  catch (e) {
    store.errors = [e]
  }
})
// reset sandbox when version changes
watch(vueRuntimeUrl, createSandbox)
onUnmounted(() => {
  proxy.destroy()
  stopUpdateWatcher && stopUpdateWatcher()
})
function createSandbox() {
  if (sandbox) {
    proxy.destroy()
    if (stopUpdateWatcher)
      stopUpdateWatcher()
    container.value.removeChild(sandbox)
  }
  sandbox = document.createElement('iframe')
  sandbox.setAttribute('sandbox', [
    'allow-forms',
    'allow-modals',
    'allow-pointer-lock',
    'allow-popups',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation-by-user-activation',
  ].join(' '))
  let importMap: Record<string, any>
  try {
    importMap = JSON.parse(store.importMap || '{}')
  }
  catch (e) {
    store.errors = [`Syntax error in import-map.json: ${e.message}`]
    return
  }
  if (!importMap.imports)
    importMap.imports = {}

  importMap.imports.vue = vueRuntimeUrl.value
  const sandboxSrc = srcdoc.replace(/<!--IMPORT_MAP-->/, JSON.stringify(importMap))
  sandbox.srcdoc = sandboxSrc
  container.value.appendChild(sandbox)
  proxy = new PreviewProxy(sandbox, {
    on_fetch_progress: (progress: any) => {
      // pending_imports = progress;
    },
    on_error: (event: any) => {
      const msg = event.value instanceof Error ? event.value.message : event.value
      if (
        msg.includes('Failed to resolve module specifier')
        || msg.includes('Error resolving module specifier')
      ) {
        runtimeError.value = `${msg.replace(/\. Relative references must.*$/, '')
        }.\nTip: add an "import-map.json" file to specify import paths for dependencies.`
      }
      else {
        runtimeError.value = event.value
      }
    },
    on_unhandled_rejection: (event: any) => {
      let error = event.value
      if (typeof error === 'string')
        error = { message: error }

      runtimeError.value = `Uncaught (in promise): ${error.message}`
    },
    on_console: (log: any) => {
      if (log.level === 'error') {
        if (log.args[0] instanceof Error)
          runtimeError.value = log.args[0].message
        else
          runtimeError.value = log.args[0]
      }
      else if (log.level === 'warn') {
        if (log.args[0].toString().includes('[Vue warn]')) {
          runtimeWarning.value = log.args
            .join('')
            .replace(/\[Vue warn\]:/, '')
            .trim()
        }
      }
    },
    on_console_group: (action: any) => {
      // group_logs(action.label, false);
    },
    on_console_group_end: () => {
      // ungroup_logs();
    },
    on_console_group_collapsed: (action: any) => {
      // group_logs(action.label, true);
    },
  })
  sandbox.addEventListener('load', () => {
    proxy.handle_links()
    stopUpdateWatcher = watchEffect(updatePreview)
  })
}
async function updatePreview() {
  // console.clear()
  runtimeError.value = null
  runtimeWarning.value = null
  try {
    const modules = compileModulesForPreview()
    // eslint-disable-next-line no-console
    console.log(`successfully compiled ${modules.length} modules.`)
    // reset modules
    await proxy.eval([
      'window.__modules__ = {};window.__css__ = \'\'',
      ...modules,
      isDark.value ? 'document.querySelector("html").classList.add("dark")' : 'document.querySelector("html").classList.remove("dark")',
      `
      import { createApp as _createApp } from "vue"
      if (window.__app__) {
        window.__app__.unmount()
        document.getElementById('app').innerHTML = ''
      }
      document.getElementById('__sfc-styles').innerHTML = window.__css__
      const app = window.__app__ = _createApp(__modules__["${MAIN_FILE}"].default)
      app.config.errorHandler = e => console.error(e)
      app.mount('#app')`.trim(),
    ])
  }
  catch (e) {
    runtimeError.value = e.message
  }
}
</script>

<template>
  <div
    ref="container"
    w="full"
    h="full"
    flex="~"
    class="preview-container"
    place="items-center content-center"
  ></div>
</template>

<style>
.preview-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.preview-container,
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
