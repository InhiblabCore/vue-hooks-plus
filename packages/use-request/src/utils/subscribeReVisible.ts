import isDocumentVisible from "./isDocumentVisible";
import { canUseDom } from "./utils";

type Listener = () => void;

const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return function unsubscribe() {
    listeners.has(listener) && listeners.delete(listener);
  };
}

if (canUseDom()) {
  const revalidate = () => {
    if (!isDocumentVisible()) return;
    listeners.forEach(listener => {
      listener();
    });
  };
  window.addEventListener("visibilitychange", revalidate, false);
}

export default subscribe;
