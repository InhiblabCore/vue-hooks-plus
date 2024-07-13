<template>
  <div> value: {{ valueRef }} </div>
  <vhp-button style="margin-top: 8px;" @click="handleInterval">interval + 1000</vhp-button>
  <vhp-button style="margin-left: 8px;" @click="resetInterval"> reset interval</vhp-button>
  <vhp-button style="margin-left: 8px;" @click="clear">clear</vhp-button>
  <vhp-button style="margin-left: 8px;" @click="restart">restart</vhp-button>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useInterval } from 'vue-hooks-plus'

  const valueRef = ref(0)
  const intervalRef = ref(2000)
  const { clear, restart } = useInterval(() => {
    valueRef.value += 1
  }, intervalRef)

  const handleInterval = () => {
    intervalRef.value += 1000
  }

  const resetInterval = () => {
    intervalRef.value = 2000
  }
</script>
