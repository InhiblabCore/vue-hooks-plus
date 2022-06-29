<template>
	<div>参数值：{{ id }}</div>
	<div style="margin-top: 16px;">
		<button @click="() => (store.id = 3)">改变ID为 1</button>
		<button @click="() => (store.id = 2)" style="margin-left: 16px;">
			改变ID为 2
		</button>
		<button @click="() => (id = 3)" style="margin-left: 16px;">
			改变ID为 3
		</button>
	</div>
	<div style="margin-top: 16px;">读取值：{{ data }}</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

import { useRequest } from 'vue3-hooks-plus'

function getUsername(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`${String(Date.now())}-参数${id}`)
		}, 1000)
	})
}

const id = ref(1)

const store = reactive({
	id: 1,
})

const { data } = useRequest(() => getUsername(id.value), {
	refreshDeps: [id, () => store.id],
})
</script>

<style scoped lang="less"></style>
