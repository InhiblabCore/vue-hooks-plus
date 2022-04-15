<template>
	<div>
		<input type="text" placeholder="输入" v-model="valueRef" />
		<p>500ms后变化：{{ debouncedValue }}</p>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useDebounce } from 'vue3-hooks-plus'
const valueRef = ref('')

const debouncedValue = useDebounce(valueRef, { wait: 500 })
</script>
<style scoped lang="less"></style>
