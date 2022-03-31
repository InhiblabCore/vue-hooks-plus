<script setup lang="ts">
import { defineProps } from 'vue'
import { useVModel, useClipboard, useEventListener } from '@vueuse/core'
import { isDark, toggleDark } from '~/logic/dark'
import { exportState } from '~/orchestrator'

const props = defineProps<{ modelValue: boolean }>()
const isOpen = useVModel(props)
const { copy } = useClipboard()

const share = () => {
	const state = exportState()
	window.location.hash = state
	return copy(window.location.href)
}

useEventListener('keydown', (ev) => {
	if (ev.ctrlKey && ev.code === 'KeyS' && !ev.shiftKey) {
		ev.preventDefault()
		share().then(() => alert('URL copied to clipboard'))
	}
})
</script>

<template>
	<div
		position="fixed left-0 top-0 bottom-0"
		p="y-4 x-2"
		w="18"
		flex="~ col"
		items="center"
		spcae="y-2"
	>
		<!-- <img src="/vueuse.svg" class="w-12" /> -->
		<div class="font-700 text-2xl">Vue</div>
		<span class="flex-1"></span>
		<Button icon text="base" @click="toggleDark">
			<carbon-moon v-if="isDark" />
			<carbon-sun v-else />
		</Button>
		<Button icon text="base" @click="share()">
			<carbon-share />
		</Button>
		<Button icon text="base" @click="isOpen = true">
			<carbon-settings />
		</Button>
		<a href="https://github.com/InhiblabCore/vue3-hooks-plus" target="_blank">
			<Button icon text="base">
				<mdi-github />
			</Button>
		</a>
	</div>
</template>
