<template>
  <div>
    <div>count1: {{ count1 }}</div>
    <vhp-button @click="count1 += 1">Add</vhp-button>
  </div>
  <div>
    <div>count2: {{ count2 }}</div>
    <vhp-button @click="count2 += 1">Add</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useTrackedEffect } from 'vue-hooks-plus'

  const count1 = ref(0)
  const count2 = ref(0)

  useTrackedEffect(
    changes => {
      console.log('Index of changed dependencies: ', changes)
    },
    [count1, count2],
  )
</script>
