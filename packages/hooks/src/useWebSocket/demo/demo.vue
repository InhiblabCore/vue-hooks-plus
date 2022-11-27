<template>
  <div class="container">
    <vhp-button
      v-if="readyState === ReadyState.Open"
      @click="() => sendMessage && sendMessage(`${Date.now()}`)"
    >✉️ send</vhp-button
    >
    <vhp-button
      style="margin-left: 8px;"
      v-if="readyState === ReadyState.Open"
      @click="() => disconnect && disconnect()"
    >
      ❌ disconnect</vhp-button
    >
    <vhp-button
      style="margin-left: 8px;"
      v-if="readyState !== ReadyState.Open"
      @click="() => connect && connect()"
    >{{ readyState === ReadyState.Connecting ? 'connecting' : '📞 connect' }}</vhp-button
    >
    <div style="margin-top: 8px;">readyState: {{ readyState }}</div>
    <div style="margin-top: 8px;"> message count: {{ messageList.length }}</div>
    <div style="margin-top: 8px;">
      <p>received message: </p>
      <p v-for="(item, index) in messageList" :key="index">{{ item }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watchEffect } from 'vue'
  import { useWebSocket } from 'vue-hooks-plus'

  enum ReadyState {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3,
  }

  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  )
  const messageHistory = computed(() => latestMessage?.value)

  const messageList = ref<any[]>([])

  watchEffect(() => {
    if (messageHistory.value?.data) messageList.value.push(messageHistory.value?.data)
  })
</script>

<style scoped lang="less">
  .container {
    height: 400px;

    overflow: scroll;
  }
</style>
