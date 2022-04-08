<template>
	<div>
		<button @click="() => toggle()">show/hidden</button>
		<div v-if="state" style="padding: 16px;">
			<p>{{ data }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { useRequest, useToggle } from 'vue3-hooks-plus'

const [state, { toggle }] = useToggle()

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(String(Date.now()) + 'useRequest')
		}, 1000)
	})
}

const cacheKey = 'setCache-demo'
const { data } = useRequest(() => getUsername(), {
	ready: state,
	cacheKey,
	staleTime: 5000,

	setCache: (res) => {
		localStorage.setItem(cacheKey, `${res.data}`)
	},
	getCache: () => {
		return localStorage.getItem(cacheKey)
	},
})
</script>

<style scoped lang="less"></style>
