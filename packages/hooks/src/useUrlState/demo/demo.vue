<template>
	<div>
		<button @click="add">add</button>
		<button style="margin-left: 16px;" @click="() => setState({ count: 1 })">
			clear
		</button>
		<div>state: {{ count }}</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useUrlState } from 'vue-hooks-plus'
const { state, setState } = useUrlState({ count: 1 })

const count = computed(() => state.value.count)
const add = () => {
	setState({ count: count.value + 1 })
}
</script>

<style scoped lang="less"></style>
