<template>
  <div>
    <p>
      {{ pressingTime }} ms
    </p>
    <div>
      <vhp-button ref="pressButton"> {{ isPressing ? 'Pressing' : 'Click' }}</vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLongPress } from 'vue-hooks-plus'
import { ref } from 'vue'

const pressButton = ref(null)
const { pressingTime , isPressing } = useLongPress(pressButton)

</script>
