import { ref } from "vue";

function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
) {
  const lockRef = ref(false);
  return async (...args: P) => {
    if (lockRef.value) return;
    lockRef.value = true;
    try {
      const ret = await fn(...args);
      lockRef.value = false;
      return ret;
    } catch (e) {
      lockRef.value = false;
      throw e;
    }
  };
}

export default useLockFn;
