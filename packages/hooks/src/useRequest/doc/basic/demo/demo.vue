<template>
	<div>读取用户名称：{{ data }}</div>
</template>

<script lang="ts" setup>
import { useRequest } from 'vue3-hooks-plus'

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(666)

			resolve('yong_git')
		}, 1000)
	})
}

const { data } = useRequest(() => getUsername())
</script>

<style scoped lang="less"></style>
