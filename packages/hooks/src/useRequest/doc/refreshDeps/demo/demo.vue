<template>
	<div>参数值：{{ id }}</div>
	<div style="margin-top: 16px;">
		<button @click="() => (id = 1)">改变ID为 1</button>
		<button @click="() => (id = 2)" style="margin-left: 16px;">
			改变ID为 2
		</button>
		<button @click="() => (id = 3)" style="margin-left: 16px;">
			改变ID为 3
		</button>
	</div>
	<div style="margin-top: 16px;">读取值：{{ data }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
//@ts-ignore
import { useRequest } from 'vue3-hooks-plus'

function getUsername(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`${String(Date.now())}-参数${id}`)
		}, 1000)
	})
}

const id = ref(1)

const { data } = useRequest(() => getUsername(id.value), {
	refreshDeps: [id],
})
</script>

<style scoped lang="less"></style>
