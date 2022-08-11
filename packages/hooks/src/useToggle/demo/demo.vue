<template>
	<div>
		<div>{{ flag }}</div>
		<br />
		<div>
			<p>
				<button @click="() => toggle()">toggle</button>
				<button @click="() => setRight()">togle True</button>
				<button @click="() => setLeft()">togle False</button>
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useToggle } from 'vue-hooks-plus'

const [flag, { toggle, setLeft, setRight }] = useToggle()
</script>

<style scoped lang="less">
p button:nth-child(n) {
	margin-left: 16px;
}
</style>
