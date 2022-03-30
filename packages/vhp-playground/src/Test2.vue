<template>
  <div>456</div>
</template>

<script lang="ts" setup>
// import useEventEmitter from "./useEventEmitter";

import { EventEmitterType } from "./useEventEmitter";

const props = defineProps<{ eventBus: EventEmitterType }>();

console.log(props);

// console.log(eventBus);

// onMounted(() => {
//   console.log(props);

// }),

// // const eventBus = useEventEmitter({ global: true });

props?.eventBus?.useSubscription("test2", (value) => {
  console.log("test2", value);
});

// eventBus?.emit("test", { name: "test" });
</script>

<style scoped lang="less"></style>
