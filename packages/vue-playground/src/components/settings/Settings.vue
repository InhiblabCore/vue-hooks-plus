<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { orchestrator } from '~/orchestrator'

const props = defineProps<{ modelValue: boolean }>()
const isOpen = useVModel(props)
const activeTab = ref('packages')
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
        backdrop="~ blur"
        bg="dark:(black opacity-20)"
      />

      <div
        position="relative"
        border="rounded-md"
        overflow="hidden"
        bg="light-100 dark:dark-700"
        shadow="lg"
        max-w="screen-lg"
        w="full"
        max-h="[70vh]"
        h="full"
      >
        <div h="full" grid="~ cols-4">
          <div bg="light-100 dark:dark-500" border="r dark:dark-900">
            <div
              bg="light-500 dark:dark-800"
              border="b light-900 dark:dark-900"
              h="20"
              text="dark:(light-900 opacity-80)"
              flex="~ row"
              items="center"
              p="l-4 t-[1px] r-2"
              space="x-2"
            >
              <carbon-settings />
              <span flex="1">
                Settings
              </span>
              <Button icon @click="isOpen = false">
                <carbon-close />
              </Button>
            </div>

            <!-- <SettingsTab m="t-2" :active="activeTab === 'editor'" @click="activeTab = 'editor'">
              <carbon-code />
              <span>Editor</span>
            </SettingsTab> -->
            <SettingsTab :badge="orchestrator.packages.length" :active="activeTab === 'packages'" @click="activeTab = 'packages'">
              <mdi-package-variant />
              <span>Packages</span>
            </SettingsTab>
            <SettingsTab :active="activeTab === 'install'" @click="activeTab = 'install'">
              <mdi-package-variant-closed />
              <span>Install</span>
            </SettingsTab>
            <!-- <SettingsTab :active="activeTab === 'windicss'" @click="activeTab = 'windicss'">
              <mdi-tailwind />
              <span>WindiCSS</span>
            </SettingsTab> -->
          </div>
          <div grid="col-span-3" overflow="auto">
            <EditorSettings v-if="activeTab === 'editor'" />
            <InstallSettings v-else-if="activeTab === 'install'" />
            <PackagesSettings v-else-if="activeTab === 'packages'" />
            <WindiCSSSettings v-else-if="activeTab === 'windicss'" />
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
