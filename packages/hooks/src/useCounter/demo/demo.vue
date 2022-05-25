<template>
	<div>
		<p>{{ current }} [max: 10; min: 1;]</p>
		<div class="contain">
			<button type="button" @click="inc()">
				inc()
			</button>
			<button type="button" @click="dec()">
				dec()
			</button>
			<button type="button" @click="set(3)">
				set(3)
			</button>
			<button type="button" @click="reset()">
				reset()
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useCounter } from 'vue3-hooks-plus'
const [current, { inc, dec, set, reset }] = useCounter(20, { min: 1, max: 10 })
</script>

<style scoped lang="less">
.contain {
	& > button {
		margin-right: 8px;
	}
}
</style>
