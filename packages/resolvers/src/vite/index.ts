import { Resolver } from 'unplugin-auto-import/types'
import { resolveModule } from 'local-pkg'
import { readFileSync } from 'node:fs'

let hooks: string[] | undefined

export type VueHooksPlusResolverOptions = Record<string, any>

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

function resolveHooks(name: string, _options: VueHooksPlusResolverOptions) {
  if (!hooks) return

  if (!hooks.includes(name)) return

  console.log({
    name,
    from: 'vue-hooks-plus',
  })

  return {
    name,
    from: 'vue-hooks-plus',
  }
}

export function VueHooksPlusResolver(options: VueHooksPlusResolverOptions = {}): Resolver {
  return name => {
    if (!hooks) {
      queryMetaData()
    }
    return resolveHooks(name, options)
  }
}

export default VueHooksPlusResolver
