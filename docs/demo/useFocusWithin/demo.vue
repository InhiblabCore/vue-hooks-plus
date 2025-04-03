<template>
  <div
    ref="divRef"
    :style="{
      padding: '16px',
      backgroundColor: isFocusWithin ? 'rgba(0,0,0,0.65)' : '',
      border: '1px solid gray',
    }"
  >
    <label style="display: block">Input: <input> </label>
    <p>isFocusWithin: {{ JSON.stringify(isFocusWithin) }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useFocusWithin } from 'vue-hooks-plus'
  const divRef = ref(null)

  const isFocusWithin = useFocusWithin(divRef, {
    onFocus: () => {
      console.log('focus')
    },
    onBlur: () => {
      console.log('blur')
    },
  })
</script>
