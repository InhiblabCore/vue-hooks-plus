<template>
	<div>
		<div>
			<button @click="() => set(String(Date.now()), new Date().toJSON())">
				添加
			</button>
			<button @click="() => setAll([['text', 'this is a new Map']])">
				设置新的 Map
			</button>
			<button @click="() => remove('msg')">移除 msg</button>
			<button @click="() => reset()">重置</button>
		</div>
		<div>
			<pre>{{ JSON.stringify(Array.from(map), null, 2) }}</pre>
		</div>
	</div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { useMap } from 'vue3-hooks-plus'

const [map, { set, setAll, remove, reset }] = useMap<string | number>([
	['msg', 'hello useMap'],
	[123, '123'],
])
</script>
<style scoped lang="less">
button {
	margin-left: 8px;
}
</style>
