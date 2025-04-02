<template>
  <div>
    <input
      type="text"
      :value="message"
      @change="change"
      placeholder="请输入"
      style="width: 300px;"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useLocalStorageState } from 'vue-hooks-plus'
  const [message, setMessage] = useLocalStorageState('use-local-storage-state-demo1', {
    defaultValue: 'Hello ~ VueHooks Plus',
  })

  const change = (e: Event | any) => {
    setMessage(e?.target?.value)
  }
</script>
