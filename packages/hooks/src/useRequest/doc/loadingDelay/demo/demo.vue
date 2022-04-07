<template>
	<div>读取用户名称A：{{ data }}</div>
	<div>读取用户名称B：{{ loading ? 'loading...' : data1 }}</div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
//@ts-ignore
import { useRequest } from 'vue3-hooks-plus'

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0.5) {
				resolve('vue3-hooks-plus useRequest')
			} else {
				reject(new Error('Failed to get username'))
			}
		}, 1000)
	})
}

function getUsername1(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0.5) {
				resolve('vue3-hooks-plus useRequest A')
			} else {
				reject(new Error('Failed to get username'))
			}
		}, 1000)
	})
}

const { data } = useRequest(() => getUsername())
const { data: data1, loading } = useRequest(() => getUsername1(), {
	loadingDelay: 300,
	// loadingDelay: ref(500),
})
</script>

<style scoped lang="less"></style>
