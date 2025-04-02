<template>
  <div>
    <div ref="divRef">
      current dom size：width:{{ size?.width }}px-----height:{{ size?.height }}px
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useSize } from 'vue-hooks-plus'

  const divRef = ref()
  const size = useSize(divRef)
</script>
