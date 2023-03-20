import { UseRequestOptions, UseRequestPlugin, UseRequestService } from './types'
import useRequest from './useRequest'

function createUseRequest<
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
        : any
      : any
  >,
  plugins?: PluginsOptions,
) {
  return useRequest<TData, TParams, PluginsOptions>(service, options, plugins)
}

export default createUseRequest
