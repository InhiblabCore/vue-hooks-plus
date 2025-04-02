<template>
  <div>
    <p>{{ current }} [max: 10; min: 1;]</p>
    <div class="contain">
      <vhp-button type="vhp-button" @click="inc()">
        Inc()
      </vhp-button>
      <vhp-button type="vhp-button" @click="dec()" style="margin-left: 8px">
        Dec()
      </vhp-button>
      <vhp-button type="vhp-button" @click="set(3)" style="margin-left: 8px">
        Set(3)
      </vhp-button>
      <vhp-button type="vhp-button" @click="reset()" style="margin-left: 8px">
        Reset()
      </vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useCounter } from 'vue-hooks-plus'
  const [current, { inc, dec, set, reset }] = useCounter(20, { min: 1, max: 10 })
</script>
