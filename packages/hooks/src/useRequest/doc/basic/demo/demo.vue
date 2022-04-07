<template>
	<div>读取用户名称：{{ data }}</div>
</template>

<script lang="ts" setup>
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

const { data } = useRequest(() => getUsername())
</script>

<style scoped lang="less"></style>
