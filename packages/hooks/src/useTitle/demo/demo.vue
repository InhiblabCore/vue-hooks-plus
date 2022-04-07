<template>
  <div>设置标题：hello vue3-hooks-plus</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTitle } from 'vue3-hooks-plus';

const title = ref('hello vue3-hooks-plus');
useTitle(title);
</script>

<style scoped lang="less"></style>
