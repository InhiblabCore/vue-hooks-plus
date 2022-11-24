<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>{{ falg ? 'true' : 'false' }}</view>
    <button @click="() => set(!falg)">切换</button>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // eslint-disable-next-line no-restricted-imports
  import { useBoolean } from 'vue-hooks-plus'
  const [falg, { set }] = useBoolean(true)
  const title = ref('Hello')
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
