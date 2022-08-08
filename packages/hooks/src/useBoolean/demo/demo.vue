<template>
	<div>
		<div>{{ flag }}</div>
		<br />
		<div>
			<p>
				<button @click="() => set(!flag)">set</button>
				<button @click="() => setTrue()">setTrue</button>
				<button @click="() => setFalse()">setFalse</button>
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useBoolean } from 'vue-hooks-plus'

const [flag, { set, setFalse, setTrue }] = useBoolean(true)
</script>

<style scoped lang="less">
p button:nth-child(n) {
	margin-left: 16px;
}
</style>
