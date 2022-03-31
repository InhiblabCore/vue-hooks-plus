<script setup lang="ts">
import { orchestrator } from '~/orchestrator'
</script>

<template>
  <div class="overflow-auto">
    <Message
      v-for="message in orchestrator.runtimeErrors"
      :key="message"
      :message="message.toString()"
      type="error"
    />
    <Message
      v-for="message in orchestrator.errors"
      :key="message"
      :message="message.toString()"
      type="error"
    />
  </div>
</template>
