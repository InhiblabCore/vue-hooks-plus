<template>
  <div>
    <p>{{ value?.join('-') }}</p>
    <vhp-button
      type="vhp-button"
      style="margin-right: 16px"
      @click="
        () =>
          setValue([
            // @ts-ignore
            ...value,
            Math.random()
              .toString(36)
              .slice(-1),
          ])
      "
    >
      push random
    </vhp-button>
    <vhp-button type="vhp-button" @click="() => setValue(defaultArray)">
      reset
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { useLocalStorageState } from 'vue-hooks-plus'
  const defaultArray = ['a', 'e', 'i', 'o', 'u']

  const [value, setValue] = useLocalStorageState('use-local-storage-state-demo2', {
    defaultValue: defaultArray,
  })
</script>
