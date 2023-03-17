type CachedKey = string | number;
const cachePromise = new Map<CachedKey, Promise<any>>();

const getCachePromise = (cacheKey: CachedKey) => {
  return cachePromise.get(cacheKey);
};

const setCachePromise = (cacheKey: CachedKey, promise: Promise<any>) => {
  // 应该缓存同样的请求
  cachePromise.set(cacheKey, promise);

  // 兼容-不使用promise.finally
  promise
    .then((res) => {
      cachePromise.delete(cacheKey);
      return res;
    })
    .catch((err) => {
      cachePromise.delete(cacheKey);
      throw err;
    });
};

export { getCachePromise, setCachePromise };
