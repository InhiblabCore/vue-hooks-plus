<template>
  <button class="vhp-button">
    <slot></slot>
  </button>
</template>

<!-- <script lang="ts" setup></script> -->

<style lang="less">
  .vhp-button {
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 5px;
    min-width: 60px;
    height: 36px;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  }

  .vhp-button:hover {
    border-color: var(--vp-button-brand-hover-border);
    // color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-button-brand-hover-bg);
  }
</style>
