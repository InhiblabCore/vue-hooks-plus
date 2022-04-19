<template>
	<div>
		<div>错误次数: {{ error }}</div>
		<p v-for="(item, index) in list" :key="index">
			{{ item }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAsyncOrder } from 'vue3-hooks-plus'

const error = ref<number>(0)
const list = ref<string[]>([])

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('第一个数据')
		}, 3000)
	})
}

function getUsername2(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('第二个数据')
		}, 2000)
	})
}

function getUsername3(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('第三个数据')
		}, 2000)
	})
}

useAsyncOrder({
	task: [
		(resolve) => {
			getUsername().then((res) => {
				resolve?.(res)
			})
		},
		(resolve) => {
			getUsername2().then((res) => {
				resolve?.(res)
			})
		},
		(_, reject) => {
			getUsername2().then(() => {
				reject?.({ err: 'error' })
			})
		},
		(_, reject) => {
			getUsername3().then(() => {
				reject?.({ error: 'error' })
			})
		},
	],
	option: {
		onError: (err) => {
			error.value += 1
		},
		onSuccess: (res) => {
			list.value.push(res)
		},
	},
})
</script>

<style scoped lang="less"></style>
