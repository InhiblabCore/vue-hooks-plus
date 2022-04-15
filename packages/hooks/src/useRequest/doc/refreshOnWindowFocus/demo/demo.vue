<template>
	<div style="margin-top: 16px;">读取值：{{ loading ? 'loading' : data }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useRequest } from 'vue3-hooks-plus'

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`${String(Date.now())}`)
		}, 1000)
	})
}

const { data, loading } = useRequest(() => getUsername(), {
	refreshOnWindowFocus: true,
})
</script>

<style scoped lang="less"></style>
