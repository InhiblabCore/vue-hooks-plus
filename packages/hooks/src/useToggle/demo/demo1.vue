<template>
	<div>
		<div>{{ flag }}</div>
		<br />
		<div>
			<p>
				<button @click="() => toggle()">toggle</button>
				<button @click="() => set('Hello')">set Hello</button>
				<button @click="() => set('Vue-hooks-plus')">set Vue-hooks-plus</button>
				<button @click="() => setRight()">setRight</button>
				<button @click="() => setLeft()">setLeft</button>
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { useToggle } from 'vue3-hooks-plus'

const [flag, { toggle, set, setLeft, setRight }] = useToggle(
	'Hello',
	'Vue-hooks-plus'
)
</script>

<style scoped lang="less">
p button:nth-child(n) {
	margin-left: 16px;
}
</style>
