import { computed, readonly, ref, shallowReadonly, watch } from "vue";
import useBoolean from '../useBoolean'
import useEventListener from '../useEventListener'
import useRequest from '../useRequest'

import { getTargetElement } from "../utils/domTarget";

import { getClientHeight, getScrollHeight, getScrollTop } from "../utils/rect";
import type { UseInfiniteData, UseInfiniteScrollOptions, UseInfiniteService } from "./types";

const useInfiniteScroll = <TData extends UseInfiniteData>(
  service: UseInfiniteService<TData>,
  options: UseInfiniteScrollOptions<TData> = {}
) => {
  const {
    target,
    isNoMore,
    threshold = 100,
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const finalData = ref<TData>();
  const [loadingMore, { set: setLoadingMore }] = useBoolean();

  const setFinalData = (mutateData: any) => {
    finalData.value = mutateData;
  };

  const noMore = computed(() => {
    if (!isNoMore) return false;
    return isNoMore(finalData.value);
  });

  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const currentData = await service(lastData);

      if (!lastData) {
        finalData.value = currentData;
      } else {
        finalData.value = {
          ...currentData,

          list: [...lastData.list, ...currentData.list],
        };
      }
      return currentData;
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          scrollMethod();
        });
        onSuccess?.(d);
      },
      onError: (e) => onError?.(e),
    }
  );

  const loadMore = () => {
    if (noMore.value) return;
    setLoadingMore(true);
    run(finalData.value);
  };

  const loadMoreAsync = () => {
    if (noMore.value) return;
    setLoadingMore(true);
    return runAsync(finalData.value);
  };

  const reload = () => run();
  const reloadAsync = () => runAsync();

  const scrollMethod = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMore();
    }
  };

  useEventListener(
    "scroll",
    () => {
      if (loading.value || loadingMore.value) {
        return;
      }
      scrollMethod();
    },
    { target }
  );

  watch(reloadDeps, () => {
    run();
  });

  const _loading = computed(() => loadingMore.value && loading.value);

  return {
    data: shallowReadonly(finalData),
    loading: readonly(_loading),
    loadingMore,
    noMore,
    loadMore: loadMore,
    loadMoreAsync: loadMoreAsync,
    reload: reload,
    reloadAsync: reloadAsync,
    mutate: setFinalData,
    scrollMethod,
    cancel,
  };
};

export default useInfiniteScroll;
