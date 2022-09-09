<template>
  <div>
    <div>
      <vhp-button
        style="margin-left: 8px;"
        @click="() => set(String(Date.now()), new Date().toJSON())"
      >
        添加
      </vhp-button>
      <vhp-button style="margin-left: 8px;" @click="() => setAll([['text', 'this is a new Map']])">
        设置新的 Map
      </vhp-button>
      <vhp-button style="margin-left: 8px;" @click="() => remove('msg')">移除 msg</vhp-button>
      <vhp-button style="margin-left: 8px;" @click="() => reset()">重置</vhp-button>
    </div>
    <div>
      <pre>{{ JSON.stringify(Array.from(map), null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useMap } from 'vue-hooks-plus'

  const [map, { set, setAll, remove, reset }] = useMap<string | number, any>([
    ['msg', 'hello useMap'],
    [123, '123'],
  ])
</script>
