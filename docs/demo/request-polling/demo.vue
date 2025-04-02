<template>
  <div
  >Username：<span>{{ loading ? 'loading' : data }}</span>
    <br>
    <p>PollingInterval：{{ computedTime }}ms</p>
    <div style="margin-right: 8px;">
      <vhp-button @click="start()">Start</vhp-button>
      <vhp-button @click="update()" style="margin-left:8px ;">time + 100ms</vhp-button>
      <vhp-button @click="cancel()" style="margin-left: 8px;">Stop</vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(String(Date.now()))
      }, 1000)
    })
  }

  const time = ref(900)

  const computedTime = computed(() => time.value + 100)

  const { data, run, loading, cancel } = useRequest(() => getUsername(), {
    manual: true,
    pollingInterval: computedTime,
    pollingWhenHidden: false,
  })

  const start = () => {
    run()
  }

  const update = () => {
    time.value += 100
  }
</script>
