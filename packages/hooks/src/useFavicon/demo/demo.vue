<template>
  <div style="padding: 16px;">
    <div>当前：{{ url }}</div>
    <div style="margin-top: 16px;">
      <vhp-button @click="() => (url = 'https://www.google.com/favicon.ico')">
        切换至 google favicon。
      </vhp-button>
      <vhp-button
        style="margin-left: 8px;"
        @click="() => (url = 'https://nelsonyong.github.io/hooks-doc/favicon.ico')"
      >
        切换至vue-hooks-plus favicon。
      </vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useFavicon } from 'vue-hooks-plus'
  const url = ref('https://nelsonyong.github.io/hooks-doc/favicon.ico')

  useFavicon(url)
</script>

<style scoped lang="less"></style>
