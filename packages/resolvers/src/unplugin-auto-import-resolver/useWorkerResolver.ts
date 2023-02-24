import { Resolver } from 'unplugin-auto-import/types'
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
    hooks = ['useWorker']
  } catch (e) {
    console.error(e)
    throw new Error(
      '[@vue-hooks-plus/use-worker:plugins] failed to load @vue-hooks-plus/use-worker, have you installed it?',
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
    from: '@vue-hooks-plus/use-worker',
  }
}

export default function VueHooksPlusUseWorkerResolver(
  options: VueHooksPlusResolverOptions = {},
): Resolver {
  return name => {
    if (!hooks) {
      queryMetaData()
    }
    return resolveHooks(name, options)
  }
}
