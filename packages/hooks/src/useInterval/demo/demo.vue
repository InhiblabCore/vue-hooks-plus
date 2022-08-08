<template>
	<div>
		{{ valueRef }}
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useInterval } from 'vue-hooks-plus'

const valueRef = ref(0)
useInterval(() => {
	valueRef.value += 1
}, 2000)
</script>
