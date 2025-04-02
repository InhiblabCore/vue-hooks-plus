<template>
  <div style="border: 1px solid rgba(100, 126, 255, 0.7);border-radius: 12px; padding: 6px;">
    <p>current name: {{ currentName }}</p>
    <p>current age: {{ currentAge }}</p>
  </div>
  <br>
  <div style="border: 1px solid rgba(59, 206, 128, 0.7);border-radius: 12px; padding: 6px;">
    <p>previous name: {{ previousName }}</p>
    <p>previous age: {{ previousage }}</p>
  </div>
  <br>
  <div>
    <input v-model="currentNameInput" placeholder="Input Name">
    <vhp-button @click="handleUpdateName" style="margin-left: 8px;">Update</vhp-button>
  </div>

  <br>
  <div>
    <input v-model="currentAgeInput" placeholder="Input Age">
    <vhp-button @click="handleUpdateAge" style="margin-left: 8px;">Update</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { usePrevious } from 'vue-hooks-plus'

  const currentNameInput = ref('')
  const currentName = ref('')
  const currentAgeInput = ref()
  const currentAge = ref()

  const nameCompareFunction = (prev: string | undefined, next: string) => {
    if (!prev) {
      return true
    }
    if (prev !== next) {
      return true
    }
    return false
  }

  const ageCompareFunction = (prev: number | undefined, next: number) => {
    if (!prev) {
      return true
    }
    if (prev !== next) {
      return true
    }
    return false
  }

  const previousName = usePrevious(currentName, nameCompareFunction)
  const previousage = usePrevious(currentAge, ageCompareFunction)

  const handleUpdateName = () => {
    currentName.value = currentNameInput.value
  }

  const handleUpdateAge = () => {
    currentAge.value = currentAgeInput.value
  }
</script>

<style scoped lang="less"></style>
