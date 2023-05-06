/* eslint-disable no-unused-vars */
import { watchEffect, ref, readonly, Ref } from 'vue'

export interface UseNetworkState {
  since?: Date
  online?: boolean
  rtt?: number
  type?: string
  downlink?: number
  saveData?: boolean
  downlinkMax?: number
  effectiveType?: string
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}

function getConnection() {
  const nav = navigator as any
  if (typeof nav !== 'object') return null
  return nav.connection || nav.mozConnection || nav.webkitConnection
}

function getConnectionProperty(): UseNetworkState {
  const c = getConnection()
  if (!c) return {}
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  }
}

function useNetwork(): Readonly<Ref<UseNetworkState>> {
  const state = ref<UseNetworkState>({
    since: undefined,
    online: navigator?.onLine,
    ...getConnectionProperty(),
  })
  watchEffect(onInvalidate => {
    const onOnline = () => {
      state.value = {
        ...state.value,
        online: true,
        since: new Date(),
      }
    }

    const onOffline = () => {
      state.value = {
        ...state.value,
        online: false,
        since: new Date(),
      }
    }

    const onConnectionChange = () => {
      state.value = {
        ...state.value,
        ...getConnectionProperty(),
      }
    }

    window.addEventListener(NetworkEventType.ONLINE, onOnline)
    window.addEventListener(NetworkEventType.OFFLINE, onOffline)

    const connection = getConnection()
    connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange)

    onInvalidate(() => {
      window.removeEventListener(NetworkEventType.ONLINE, onOnline)
      window.removeEventListener(NetworkEventType.OFFLINE, onOffline)
      connection?.removeEventListener(NetworkEventType.CHANGE, onConnectionChange)
    })
  })

  return readonly(state)
}

export default useNetwork
