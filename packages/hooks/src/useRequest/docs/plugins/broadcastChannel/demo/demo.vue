<template>
  <div>Current: {{ loading ? 'loading..' : data }}</div>

  <div>
    <vhp-button @click="refresh()">Refresh</vhp-button>
    <div style="margin-top: 8px;">
      <h4>Desc</h4>
      <input v-model="input">
      <vhp-button style="margin-left: 4px;" @click="submit()">Send</vhp-button>
    </div>
  </div>
  <div>
    <h3>Channel History:</h3>
    <div v-for="(item, index) in other" :key="index">{{ item }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRequest } from 'vue-hooks-plus'
  import { useBroadcastChannelPlugin } from '@vue-hooks-plus/use-request-plugins'

  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`${params.desc}-${String(Date.now())}`)
      }, 1000)
    })
  }

  const other = ref<string[]>([])
  const input = ref('')
  const desc = ref('good')

  const submit = () => {
    desc.value = `send-other-${input.value}`
  }

  const { data, loading, refresh } = useRequest(
    () => getUsername({ desc: desc.value }),
    {
      refreshDeps: true,
      broadcastChannel: 'nice-broadcastChannel',
      onBroadcastChannel: (message: any, channel: any) => {
        other.value.push(message.data)
      },
    },
    [useBroadcastChannelPlugin],
  )
</script>

<style scoped lang="less"></style>
