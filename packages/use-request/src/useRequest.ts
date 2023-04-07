import useAutoRunPlugin from './plugins/useAutoRunPlugin'
import useCachePlugin from './plugins/useCachePlugin'
import useDebouncePlugin from './plugins/useDebouncePlugin'
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin'
import usePollingPlugin from './plugins/usePollingPlugin'
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin'
import useRetryPlugin from './plugins/useRetryPlugin'
import useThrottlePlugin from './plugins/useThrottlePlugin'

import useRequestImplement from './useRequestImplement'

import { UseRequestOptions, UseRequestPlugin, UseRequestService } from './types'

function useRequest<
  TData,
  TParams extends unknown[] = unknown[],
  PluginsOptions extends UseRequestPlugin<TData, TParams>[] = UseRequestPlugin<TData, TParams>[]
>(
  service: UseRequestService<TData, TParams>,
  options?: UseRequestOptions<
    TData,
    TParams,
    PluginsOptions extends (infer P)[]
      ? P extends UseRequestPlugin<TData, TParams, infer R>
        ? R
        : never
      : never
  >,
  plugins?: PluginsOptions,
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    useDebouncePlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
    useRefreshOnWindowFocusPlugin,
    useThrottlePlugin,
    useAutoRunPlugin,
    useCachePlugin,
    useRetryPlugin,
  ] as UseRequestPlugin<TData, TParams>[])
}

export default useRequest
