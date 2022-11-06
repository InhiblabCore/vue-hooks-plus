function useLockFn<P extends any[], V>(
  fn: (...args: P) => Promise<V>
): (...args: P) => Promise<V | undefined> {
  let lock = false
  return async (...args: P) => {
    if (lock) return;
    lock = true;
    try {
      const ret = await fn(...args);
      lock = false;
      return ret;
    } catch (e) {
      lock = false;
      throw e;
    }
  };
}

export default useLockFn;
