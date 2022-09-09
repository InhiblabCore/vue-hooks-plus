<template>
  <div>
    <div>
      <vhp-button style="margin-left: 8px;" @click="() => add(String(Date.now()))">
        添加
      </vhp-button>
      <vhp-button
        style="margin-left: 8px;"
        @click="() => remove('hi vue-hooks-plus')"
        :disabled="!set.has('hi vue-hooks-plus')"
      >
        移除
      </vhp-button>
      <vhp-button style="margin-left: 8px;" @click="() => reset()">重置</vhp-button>
    </div>
    <div>
      <pre>{{ JSON.stringify(Array.from(set), null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSet } from 'vue-hooks-plus'

  const [set, { add, remove, reset }] = useSet(['hi vue-hooks-plus'])
</script>
