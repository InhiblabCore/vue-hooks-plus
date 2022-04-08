<template>
  <div>
    <div>submit count: {{ valueRef }}</div>
    <div>开始：{{ startRef }}</div>
    <div>成功：{{ endRef }}</div>
    <div><button @click="() => sumit()">submit</button></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLockFn } from 'vue3-hooks-plus';

const valueRef = ref(0);
const startRef = ref(0);
const endRef = ref(0);

function mockApiRequest() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const sumit = useLockFn(async () => {
  startRef.value += 1;
  await mockApiRequest();
  valueRef.value += 1;
  endRef.value += 1;
});
</script>
<style scoped lang="less"></style>
