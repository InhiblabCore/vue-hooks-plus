<template>
  <div>
    <vhp-button @click="refRouter = !refRouter" style="margin-bottom: 16px;">
      toggle router</vhp-button
    >
    <demo v-if="refRouter" />
    <div v-else>
      SHOW TEXT
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Demo from './demo.vue'

  const refRouter = ref(true)
</script>
