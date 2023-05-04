import { ref } from 'vue';
import { BroadcastChannel, BroadcastChannelOptions } from 'broadcast-channel'
import { UseRequestPlugin, UseRequestFetchState } from "@vue-hooks-plus/use-request/dist/types/types";
import Fetch from '@vue-hooks-plus/use-request/dist/types/Fetch';

type MessageType = UseRequestFetchState<any, any> & { type: string }

export interface BroadcastChannelType {
  broadcastChannel?: string
  broadcastChannelKey?: string
  broadcastChannelOptions?: BroadcastChannelOptions
  customPostMessage?: (postMessage: (msg?: any) => Promise<void>, channel?: BroadcastChannel, setFetchState?: Fetch<any, []>['setFetchState']) => void
  onBroadcastChannel?: (value?: MessageType, channel?: BroadcastChannel, setFetchState?: Fetch<any, []>['setFetchState']) => void
}

export const useBroadcastChannelPlugin: UseRequestPlugin<any, [], BroadcastChannelType> = (fetchInstance, { broadcastChannel, broadcastChannelKey, broadcastChannelOptions = { webWorkerSupport: false }, customPostMessage, onBroadcastChannel }) => {
  let transaction = false
  const channel = ref<BroadcastChannel>()

  const tx = (callback: () => void) => {
    transaction = true
    callback()
    transaction = false
  }

  if (broadcastChannel) {
    channel.value = new BroadcastChannel(broadcastChannel, broadcastChannelOptions)

    if (customPostMessage) {
      customPostMessage(channel.value?.postMessage, channel.value)
    }

    channel.value.onmessage = message => {
      tx(() => {
        onBroadcastChannel?.(message, channel.value, fetchInstance.setFetchState)
      })
    }
  }


  return {
    onBefore: () => {
      if (typeof channel.value?.isClosed === "boolean" && channel.value?.isClosed && broadcastChannel) {
        channel.value = new BroadcastChannel(broadcastChannel, broadcastChannelOptions)
      }
    },
    onSuccess: (data, params) => {
      if (broadcastChannel && transaction === false && !customPostMessage) {
        channel.value?.postMessage({
          type: broadcastChannelKey ?? broadcastChannel,
          data,
          params,
          error: null
        })
      }
    },
    onError: (error, params) => {
      if (broadcastChannel && transaction === false && !customPostMessage) {
        channel.value?.postMessage({
          type: broadcastChannelKey ?? broadcastChannel,
          params,
          error
        })
      }
    },
    onCancel: async () => {
      await channel.value?.close()
    }
  }

}