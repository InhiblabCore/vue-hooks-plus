<template>
  <button class="vhp-button">
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
  .vhp-button {
    border-color: var(--vp-button-brand-border);
    color: var(--vp-c-bg);
    background-color: var(--vp-c-brand);
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 5px;
    min-width: 60px;
    height: 36px;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s, box-shadow 0.4s,
      opacity 0.4s;
    cursor: pointer;
    transform: scale(1);
  }

  .vhp-button:hover {
    border-color: var(--vp-button-brand-hover-border);
    background-color: var(--vp-c-brand);
    opacity: 0.8;
  }

  .vhp-button::after {
    position: absolute;
    content: '';
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    box-shadow: 0 0 0 6px var(--vp-c-brand);
    transition: 0.4s;
  }
  .vhp-button:active::after {
    box-shadow: none;
    opacity: 1;
    transition: 0s; /*取消过渡*/
  }
</style>
