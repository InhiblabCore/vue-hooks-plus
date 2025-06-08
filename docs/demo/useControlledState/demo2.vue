<template>
  <div>
    <vhp-button
      style="margin-right: 10px"
      :style="{ backgroundColor: color1 }"
      @click="
        () => {
          setColor1(randomColor())
        }
      "
      >Controlled unvalid value</vhp-button
    >

    <vhp-button
      :style="{ backgroundColor: color }"
      @click="
        () => {
          setColor(randomColor())
        }
      "
      >Controlled color</vhp-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useControlledState } from 'vue-hooks-plus'

  const value = ref<string | undefined>('red')

  const value2 = ref<string | undefined>('red')

  const [color1, setColor1] = useControlledState(value2, undefined)
  const [color, setColor] = useControlledState(value, undefined, v => {
    value.value = v
  })
  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
</script>
