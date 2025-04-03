<template>
	<div ref="valueRef">
		{{ isHovering ? 'hover' : 'no-hover' }}
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useHover } from 'vue-hooks-plus'

const valueRef = ref()
const isHovering = useHover(valueRef)
</script>
