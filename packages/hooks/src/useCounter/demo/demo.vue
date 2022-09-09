<template>
  <div>
    <p>{{ current }} [max: 10; min: 1;]</p>
    <div class="contain">
      <vhp-button type="vhp-button" @click="inc()">
        inc()
      </vhp-button>
      <vhp-button type="vhp-button" @click="dec()">
        dec()
      </vhp-button>
      <vhp-button type="vhp-button" @click="set(3)">
        set(3)
      </vhp-button>
      <vhp-button type="vhp-button" @click="reset()">
        reset()
      </vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useCounter } from 'vue-hooks-plus'
  const [current, { inc, dec, set, reset }] = useCounter(20, { min: 1, max: 10 })
</script>

<style scoped lang="less">
  .contain {
    & > vhp-button {
      margin-right: 8px;
    }
  }
</style>
