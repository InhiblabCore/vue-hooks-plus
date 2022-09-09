<template>
  <button class="vhp-button">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup></script>

<style lang="less">
  .vhp-button {
    // border: 1px solid rgba(0, 0, 0, 0.5);
    background-color: rgba(82, 129, 255, 0.15);
    padding: 4px;
    border-radius: 5px;
    margin-top: 8px;
  }

  .vhp-button:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
</style>
