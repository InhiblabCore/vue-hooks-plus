import Fetch from '../Fetch'

type FetchInstanceType = Fetch<any, any[]>
type Listener = (data: any) => void;

class RegisterDevToolsStore {
  private requestInstances: Record<symbol, FetchInstanceType> = {}
  private listeners: Listener[] = [];

  emit(payload: any) {
    this.listeners.forEach(item => item(payload))
  }
  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  }
  insert(key: symbol, instance: any) {
    this.requestInstances[key] = instance
  }
  update(key: symbol, payload: any) {
    // @ts-ignore
    this.requestInstances[key].time = payload.time
    // @ts-ignore
    this.requestInstances[key].type = payload.type
  }
  reset() {
    this.requestInstances = {}
  }
  getAll() {
    return this.requestInstances
  }
}

const devToolsStore = new RegisterDevToolsStore()

export default devToolsStore
