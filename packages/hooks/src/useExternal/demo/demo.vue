<template>
	<div style="overflow: scroll;height: 600px;">
		<div>Status: {{ status }}</div>
		<div>Result: {{ `${data?.data?.city ?? ''}星期一天气` }}</div>
		<div>{{ `${JSON.stringify(data?.data?.data?.[0])}` }}</div>
	</div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from 'vue'

import { useExternal } from 'vue3-hooks-plus'

const status = useExternal(
	'https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js',
	{
		js: {
			async: true,
		},
	}
)

const data = ref()

watchEffect(() => {
	if (status.value === 'ready') {
		// @ts-ignore
		axios
			.get(
				'https://yiketianqi.com/api?unescape=1&version=v1&appid=85841439&appsecret=EKCDLT4I&city=广州'
			)
			.then((res: any) => {
				data.value = res
			})
	}
})
</script>

<style scoped lang="less"></style>
