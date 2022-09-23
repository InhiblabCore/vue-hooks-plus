import { isRef, computed, Ref, ComputedRef } from 'vue'

function useFormatResult<TData, FData>(
  data: TData | Ref<TData>,
  formatResultCallback: (data: TData) => FData,
): ComputedRef<FData> {
  const formatResultData = computed(() =>
    isRef(data) ? formatResultCallback(data.value) : formatResultCallback(data),
  )
  return formatResultData
}

export default useFormatResult
