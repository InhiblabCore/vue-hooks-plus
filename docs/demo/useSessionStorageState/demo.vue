<template>
  <div>
    <input
      type="text"
      :value="message"
      @input="change"
      placeholder="Only kept for this session"
      style="width: 300px;"
    />
    <vhp-button type="vhp-button" style="margin-left: 12px" @click="() => setMessage(undefined)">
      clear
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
import { useSessionStorageState } from 'vue-hooks-plus'

const [message, setMessage] = useSessionStorageState('use-session-storage-state-demo', {
  defaultValue: 'Hello session',
})

const change = (e: Event) => {
  setMessage((e.target as HTMLInputElement).value)
}
</script>
