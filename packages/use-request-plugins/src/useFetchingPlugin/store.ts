import { defineStore } from 'pinia'
import { FetchingPluginType } from './useFetching'

export type FetchingGlobalStore = {
  states: Record<
    string,
    Partial<{
      key: string
      data: any
      status: 'success' | 'error'
      onFetching: FetchingPluginType['onFetching']
      isFetching: FetchingPluginType['isFetching']
    }>
  >
}

export const useFetchingGlobalStore = defineStore('useRequert-plugin-useFetchingPlugin-Store', {
  state: (): FetchingGlobalStore => {
    return {
      states: {},
    }
  },
  getters: {},
  actions: {
    setFetchingInit(
      key: string,
      onFetching?: FetchingPluginType['onFetching'],
      isFetching?: FetchingPluginType['isFetching'],
    ) {
      this.states[key] = {
        key,
        onFetching,
        isFetching,
      }
    },

    setCurrentKeyData(key: string, data: any, status: 'success' | 'error') {
      if (this.states[key]?.key) {
        this.states[key] = {
          ...this.states[key],
          data,
          status,
        }
        this.broadcastFetching()
      } else {
        console.warn('key is no exist!')
      }
    },

    broadcastFetching() {
      for (const key in this.states) {
        if (Object.prototype.hasOwnProperty.call(this.states, key)) {
          const current = this.states[key]
          current.onFetching?.(current, this.states)
          if (current.isFetching) this.isFetchingAll(current.isFetching)
        }
      }
    },

    isFetchingAll(fn: (value: boolean) => void) {
      const keyCount = Object.keys(this.states)
      const successCount = Object.keys(this.states).filter(
        key => this.states[key].status === 'success',
      )
      fn(keyCount.length === successCount.length)
    },
  },
})
