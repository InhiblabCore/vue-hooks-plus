import Fetch from '../Fetch'

type FetchInstanceType = Fetch<any, any[]>
type Listener = (data: any) => void

class RegisterDevToolsStore {
  private requestInstances: Map<
    string,
    {
      instance: FetchInstanceType
      requestName: string
      type?: string
      time?: number
    }
  > = new Map()
  private listeners: Listener[] = []

  emit(payload: any) {
    this.listeners.forEach(item => item(payload))
  }
  subscribe(listener: Listener) {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      this.listeners.splice(index, 1)
    }
  }
  insert(key: string, payload: { instance: any; requestName: string } & any) {
    this.requestInstances.set(key, { ...payload })
    this.emit({
      key,
      ...payload,
    })
  }
  update(key: string, payload: any) {
    if (this.has(key)) {
      this.requestInstances.set(key, { ...this.requestInstances.get(key), ...payload })
    }
  }
  has(key: string) {
    return this.requestInstances.has(key)
  }
  reset(key: string) {
    if (this.requestInstances.has(key)) {
      const current = this.requestInstances.get(key)
      this.requestInstances.clear()
      this.insert(key, current)
    } else
      this.requestInstances.clear()
  }
  getAll() {
    return this.requestInstances
  }
}

const devToolsStore = new RegisterDevToolsStore()

export default devToolsStore
