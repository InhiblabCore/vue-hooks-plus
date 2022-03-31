import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

export function copyVuePlugin(): Plugin {
  return {
    name: 'copy-vue',
    generateBundle() {
      const filePath = path.resolve(
        __dirname,
        '../node_modules/vue/dist/vue.runtime.esm-browser.js'
      )
      console.log(filePath)
      if (!fs.existsSync(filePath)) {
        throw new Error(
          `vue.runtime.esm-browser.js not built. ` +
            `Run "yarn build vue -f esm-browser" first.`
        )
      }
      this.emitFile({
        type: 'asset',
        fileName: 'vue.runtime.esm-browser.js',
        source: fs.readFileSync(filePath, 'utf-8')
      })
    }
  }
}