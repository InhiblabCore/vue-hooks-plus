import { computed, Ref, ComputedRef, unref } from 'vue-demi'

function useFormatResult<TData, FData>(
  data: TData | Ref<TData>,
  formatResultCallback: (data: TData) => FData,
): ComputedRef<FData> {
  const formatResultData = computed(() => formatResultCallback(unref(data)))
  return formatResultData
}

export default useFormatResult
