<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { orchestrator } from '~/orchestrator'

const name = ref('')
const url = ref('')

const props = defineProps<{ modelValue: boolean }>()
const isOpen = useVModel(props)

const addPackage = () => {
  orchestrator.packages = [
    ...orchestrator.packages,
    {
      name: name.value,
      source: 'External',
      url: url.value,
    },
  ]

  isOpen.value = false
  name.value = ''
  url.value = ''
}
</script>

<template>
  <Dialog
    :open="isOpen"
    position="fixed inset-0"
    overflow="y-auto"
    z="10"
    @close="isOpen = false"
  >
    <div
      position="relative"
      grid="~"
      place="items-center"
      min-h="screen"
      p="4"
    >
      <DialogOverlay
        position="fixed inset-0"
        backdrop="~ blur-sm"
        bg="dark:(black opacity-20)"
      />

      <div
        position="relative"
        border="rounded-md"
        overflow="hidden"
        bg="light-100 dark:dark-700"
        shadow="lg"
        max-w="prose"
        w="full"
        max-h="[70vh]"
        p="4"
      >
        <div grid="~" gap="4">
          <div text="lg" font="medium">
            Add Package
          </div>
          <Textfield v-model="name" placeholder="@vueuse/core">
            <mdi-package-variant-closed />
          </Textfield>
          <Textfield v-model="url" placeholder="https://unpkg.com/@vueuse/core/dist/index.esm.js">
            <carbon-link />
          </Textfield>
          <div flex="~ row" space="x-4">
            <span flex="1"></span>
            <Button>Cancel</Button>
            <Button primary @click="addPackage()">
              Add Package
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
