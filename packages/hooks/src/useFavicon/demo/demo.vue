<template>
	<div style="padding: 16px;">
		<div>当前：{{ url }}</div>
		<div style="margin-top: 16px;">
			<button @click="() => (url = 'https://www.google.com/favicon.ico')">
				切换至 google favicon。
			</button>
			<button
				style="margin-left: 8px;"
				@click="
					() => (url = 'https://nelsonyong.github.io/hooks-doc/favicon.ico')
				"
			>
				切换至 vue3-hooks-plus favicon。
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useFavicon } from 'vue3-hooks-plus'
const url = ref('https://nelsonyong.github.io/hooks-doc/favicon.ico')

useFavicon(url)
</script>

<style scoped lang="less"></style>
