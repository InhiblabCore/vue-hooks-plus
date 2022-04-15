<template>
	<div>读取用户名称：{{ loading ? 'loading' : data }}</div>
	<button @click="cancel()">停止</button>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'

import { useRequest } from 'vue3-hooks-plus'

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0.5) {
				resolve(String(Date.now()))
			} else {
				reject(new Error('Failed to get username'))
			}
		}, 1000)
	})
}

const { data, loading, cancel } = useRequest(() => getUsername(), {
	pollingInterval: 3000,
	pollingWhenHidden: false,

	//ref(3000)
	// onf
})
</script>

<style scoped lang="less"></style>
