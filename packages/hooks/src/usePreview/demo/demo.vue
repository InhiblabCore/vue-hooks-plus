<template>
	<div>
		<div ref="container"></div>
		<div ref="container1"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, VueElement } from 'vue'
import demo1 from './demo1.vue'

import { usePreview } from 'vue3-hooks-plus'

const mdRef = ref('# MarkDown  in the browser\n\nRender')
const { container } = usePreview(mdRef)

const { container: container1 } = usePreview((demo1 as unknown) as VueElement)
</script>

<style scoped lang="less"></style>
