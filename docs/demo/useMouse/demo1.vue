<template>
  <div
    ref="domRef"
    :style="{
      width: '200px',
      height: '200px',
      backgroundColor: 'gray',
      opacity: 0.85,
      color: 'white',
      lineHeight: '200px',
      textAlign: 'center',
    }"
  >
    element
  </div>
  <div>
    <p>Mouse In Element - x: {{ mouse.elementX }}, y: {{ mouse.elementY }}</p>
    <p> Element Position - x: {{ mouse.elementPosX }}, y: {{ mouse.elementPosY }} </p>
    <p>
      Element Dimensions - width: {{ mouse.elementW }}, height:
      {{ mouse.elementH }}
    </p>
  </div>

  <h3>UseMouse Component</h3>
  <UseMouse>
    <template #default="{ elementX, elementY,elementPosX,elementPosY,elementW,elementH }">
      <p>Mouse In Element - x: {{ elementX }}, y: {{ elementY }}</p>
      <p> Element Position - x: {{ elementPosX }}, y: {{ elementPosY }} </p>
      <p>
        Element Dimensions - width: {{ elementW }}, height:
        {{ elementH }}
      </p>
    </template>
    <template #target>
      <div
        ref="domRef"
        :style="{
          width: '200px',
          height: '200px',
          backgroundColor: 'gray',
          opacity: 0.85,
          color: 'white',
          lineHeight: '200px',
          textAlign: 'center',
        }"
      >
        element
      </div>
    </template>
  </UseMouse>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useMouse, UseMouse } from 'vue-hooks-plus'
  const domRef = ref(null)
  const mouse = useMouse(domRef)
</script>
