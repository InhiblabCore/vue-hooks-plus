import type { HTMLPlugin } from './types'
import { windicssHTMLPlugin } from './windicss'
import { vueHTMLPlugin } from './vue'

export const htmlCompletionPlugins: HTMLPlugin[] = [
  windicssHTMLPlugin,
  vueHTMLPlugin,
]
