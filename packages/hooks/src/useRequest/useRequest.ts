import useAutoRunPlugin from './plugins/useAutoRunPlugin'
import useCachePlugin from './plugins/useCachePlugin'
import useDebouncePlugin from './plugins/useDebouncePlugin'
import useDevtoolsPlugin from './plugins/useDevtoolsPlugin'
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin'
import usePollingPlugin from './plugins/usePollingPlugin'
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin'
import useRetryPlugin from './plugins/useRetryPlugin'
import useThrottlePlugin from './plugins/useThrottlePlugin'

import useRequestImplement from './useRequestImplement'

import { UseRequestOptions, UseRequestOptionsWithFormatResult, UseRequestPlugin, useRequestResult, UseRequestService } from './types'
import { withArgs } from './utils/resolve-args'


// 有 formatResult
export function useRequest<
  TData,
  TParams extends unknown[] = unknown[],
  PluginsOptions extends UseRequestPlugin<TData, TParams>[] = UseRequestPlugin<TData, TParams>[],
  SR = any,
>(service: UseRequestService<SR, TParams>, options?: UseRequestOptionsWithFormatResult<TData, TParams, PluginsOptions extends (infer P)[]
  ? P extends UseRequestPlugin<TData, TParams, infer R>
  ? R
  : never
  : never, SR>, plugins?: PluginsOptions): useRequestResult<TData, TParams>


// 无 formatResults
export function useRequest<
  TData,
  TParams extends unknown[] = unknown[],
  PluginsOptions extends UseRequestPlugin<TData, TParams>[] = UseRequestPlugin<TData, TParams>[],
>(service: UseRequestService<TData, TParams>, options?: UseRequestOptions<TData, TParams, PluginsOptions extends (infer P)[]
  ? P extends UseRequestPlugin<TData, TParams, infer R>
  ? R
  : never
  : never>, plugins?: PluginsOptions): useRequestResult<TData, TParams>

export function useRequest<
  TData,
  TParams extends unknown[] = unknown[],
  PluginsOptions extends UseRequestPlugin<TData, TParams>[] = UseRequestPlugin<TData, TParams>[],
>(
  service: UseRequestService<TData, TParams>,
  options?: UseRequestOptions<TData, TParams, PluginsOptions extends (infer P)[]
    ? P extends UseRequestPlugin<TData, TParams, infer R>
    ? R
    : never
    : never>,
  plugins?: PluginsOptions,
) {

  const BuiltInPlugins = [
    process.env.NODE_ENV === 'development' ? useDevtoolsPlugin : null,
    useDebouncePlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
    useRefreshOnWindowFocusPlugin,
    useThrottlePlugin,
    useAutoRunPlugin,
    useCachePlugin,
    useRetryPlugin
  ]?.filter(Boolean)

  return withArgs<TData, TParams>(useRequestImplement, options?.use)(service, options, [
    ...(plugins || []),
    ...BuiltInPlugins
  ] as UseRequestPlugin<TData, TParams>[])
}



export default useRequest
