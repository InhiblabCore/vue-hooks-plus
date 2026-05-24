type Listener = (data: any) => void;
const listeners: Record<string, Listener[]> = {};
const otherListeners: Listener[] = []

const trigger = (key: string, data: any) => {
  if (listeners[key]) {
    listeners[key].forEach((item) => item(data));
    otherListeners.forEach((item) => item({
      type: key,
      data
    }))
  }
};

const subscribe = (key: string, listener: Listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);

  return function unsubscribe() {
    const index = listeners[key].indexOf(listener);
    if (index > -1) {
      listeners[key].splice(index, 1);
    }
  };
};

const otherSubscribe = (listener: Listener) => {
  otherListeners.push(listener)
  return function unsubscribe() {
    const index = otherListeners.indexOf(listener)
    if (index > -1) {
      otherListeners.splice(index, 1)
    }
  }
}

export { trigger, subscribe, otherSubscribe };
