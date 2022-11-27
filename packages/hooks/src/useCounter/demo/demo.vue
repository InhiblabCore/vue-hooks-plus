<template>
  <div>
    <p>{{ current }} [max: 10; min: 1;]</p>
    <div class="contain">
      <vhp-button type="vhp-button" @click="inc()">
        inc()
      </vhp-button>
      <vhp-button type="vhp-button" @click="dec()" style="margin-right: 8px">
        dec()
      </vhp-button>
      <vhp-button type="vhp-button" @click="set(3)" style="margin-right: 8px">
        set(3)
      </vhp-button>
      <vhp-button type="vhp-button" @click="reset()" style="margin-right: 8px">
        reset()
      </vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useCounter } from 'vue-hooks-plus'
  const [current, { inc, dec, set, reset }] = useCounter(20, { min: 1, max: 10 })
</script>
