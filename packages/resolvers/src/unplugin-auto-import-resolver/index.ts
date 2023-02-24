import { Resolver } from 'unplugin-auto-import/types'
import { resolveModule } from 'local-pkg'
import { readFileSync } from 'node:fs'
import VueHooksPlusUseWorkerResolver from './useWorkerResolver'
import VueHooksPlusUseImmerResolver from './useImmerResolver'

let hooks: string[] | undefined

export type VueHooksPlusResolverOptions = {
  /**
   * prefix for name of components
   *
   * @default ''
   */
  prefix?: string
}

function queryMetaData() {
  try {
    const root = resolveModule('vue-hooks-plus') || process.cwd()
    const path =
      resolveModule('vue-hooks-plus/meta-data.json') ||
      resolveModule('vue-hooks-plus/meta-data.json', { paths: [root] })
    const metaData = JSON.parse(readFileSync(path!, 'utf-8'))

    hooks = metaData.function
  } catch (e) {
    console.error(e)
    throw new Error(
      '[vue-hooks-plus:plugins] failed to load vue-hooks-plus, have you installed it?',
    )
  }
}

function resolveHooks(name: string, options: VueHooksPlusResolverOptions) {
  if (!hooks) return

  const { prefix } = options
  if (prefix) {
    if (!name.startsWith(prefix)) return
    name = name.substring(prefix.length)
  }
  if (!hooks.includes(name)) return

  return {
    name,
    from: 'vue-hooks-plus',
  }
}

function VueHooksPlusResolver(options: VueHooksPlusResolverOptions = {}): Resolver {
  return name => {
    if (!hooks) {
      queryMetaData()
    }
    return resolveHooks(name, options)
  }
}

export { VueHooksPlusUseImmerResolver, VueHooksPlusUseWorkerResolver, VueHooksPlusResolver }
