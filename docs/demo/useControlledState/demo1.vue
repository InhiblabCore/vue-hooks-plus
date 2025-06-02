<template>
  <div>
    <vhp-button
      :style="{ backgroundColor: color }"
      @click="
        () => {
          setColor(randomColor())
        }
      "
      >Uncontrolled color</vhp-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { useControlledState } from 'vue-hooks-plus'
  const [color, setColor] = useControlledState(undefined, 'red')
  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
</script>
