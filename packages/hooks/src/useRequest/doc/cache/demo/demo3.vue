<template>
	<div>
		<button @click="() => toggle()">show/hidden</button>
		<div v-if="state" style="padding: 16px;">
			<div>{{ `loading: ${loading}` }}</div>
			<input type="text" v-model="id" /><button
				style="margin-left: 12px;"
				@click="run(id)"
			>
				发送
			</button>
			<div>请求参数ID为：{{ id }}</div>
			<p>{{ data }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

import { useRequest, useToggle } from 'vue3-hooks-plus'

const [state, { toggle }] = useToggle()

const id = ref('')

function getUsername(userId): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(String(Date.now()) + '-' + userId)
		}, 1000)
	})
}

const { data, params, loading, run } = useRequest(getUsername, {
	cacheKey: 'cacheKey-demo3',
})

watchEffect(() => {
	id.value = params?.[0]
})
</script>

<style scoped lang="less"></style>
