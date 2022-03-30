type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | number;
type CachedData = {
  data: unknown;
  params: unknown;
  timer: Timer | undefined;
  time: number;
  staleTime: number;
  loading: boolean;
};

type Listener = (data: unknown) => void;

const cache = new Map<CachedKey, CachedData>();

const listeners: Record<string, Listener[]> = {};

const setCache = (
  key: CachedKey,
  cacheTime: number,
  data: unknown,
  params: unknown,
  staleTime = 0,
  loading = true
) => {
  const currentCache = cache.get(key);
  if (currentCache?.timer) {
    clearTimeout(currentCache.timer);
  }

  let timer: Timer | undefined = undefined;
  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }
  if (listeners[key]) {
    listeners[key].forEach((item) => item(data));
  }
  cache.set(key, {
    data,
    params,
    timer,
    time: new Date().getTime(),
    staleTime,
    loading,
  });
};

const getCache = (key: CachedKey) => {
  const currentCache = cache.get(key);

  if (
    currentCache?.staleTime === -1 ||
    (currentCache !== undefined &&
      typeof currentCache.time === "number" &&
      typeof currentCache.staleTime === "number" &&
      new Date().getTime() - currentCache.time <= currentCache.staleTime)
  ) {
    return {
      ...cache.get(key),
      loading: false,
    };
  }
  return cache.get(key);
};

const subscribe = (key: string, listener: Listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);

  return function unsubscribe() {
    const index = listeners[key].indexOf(listener);
    listeners[key].splice(index, 1);
  };
};

const clearCache = (key?: string | string[]) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((cacheKey) => cache.delete(cacheKey));
  } else {
    cache.clear();
  }
};

export { getCache, setCache, subscribe, clearCache };
