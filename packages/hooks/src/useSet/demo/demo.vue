<template>
	<div>
		<div>
			<button @click="() => add(String(Date.now()))">
				添加
			</button>
			<button
				@click="() => remove('hi vue-hooks-plus')"
				:disabled="!set.has('hi vue-hooks-plus')"
			>
				移除
			</button>
			<button @click="() => reset()">重置</button>
		</div>
		<div>
			<pre>{{ JSON.stringify(Array.from(set), null, 2) }}</pre>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useSet } from 'vue-hooks-plus'

const [set, { add, remove, reset }] = useSet(['hi vue-hooks-plus'])
</script>
<style scoped lang="less">
button {
	margin-left: 8px;
}
</style>
