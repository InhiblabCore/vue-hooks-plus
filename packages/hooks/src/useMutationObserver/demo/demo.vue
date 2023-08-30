<template>
  <div>
    <div ref="valueRef"> attributes is change：{{ isChanged ? 'yes' : 'no' }} </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs, reactive, nextTick } from 'vue'
  import { useMutationObserver } from 'vue-hooks-plus'

  const valueRef = ref()
  const isChanged = ref(false)

  useMutationObserver(
    valueRef,
    mutations => {
      const mutation = mutations[0]

      mutation ? (isChanged.value = true) : (isChanged.value = false)
    },
    {
      attributes: true,
    },
  )

  nextTick().then(() => {
    setTimeout(() => {
      if (valueRef.value) {
        valueRef.value.style.color = 'red'
      }
    }, 2000)
  })
</script>
