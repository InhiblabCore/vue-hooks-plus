<template>
	<div ref="valueRef">
		{{ isHovering ? 'hover' : 'no-hover' }}
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// @ts-ignore
import { useHover } from 'vue3-hooks-plus'

const valueRef = ref()
const isHovering = useHover(valueRef)
</script>
