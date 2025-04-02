<template>
  <div>
    <p :style="darkMode ? theme.dark : theme.light">
      {{ darkMode ? 'dark' : 'light' }}
    </p>
    <div>
      <vhp-button @click="() => setDarkMode(true)">Dark</vhp-button>
      <vhp-button style="margin-left: 16px;" @click="() => setDarkMode(false)">
        Light
      </vhp-button>
      <vhp-button style="margin-left: 16px;" @click="() => setDarkMode(undefined)">
        Follow System
      </vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDarkMode } from 'vue-hooks-plus'

  const [darkMode, setDarkMode] = useDarkMode()

  const theme = {
    dark: {
      backgroundColor: '#000',
      color: 'white',
      paddingLeft: '4px',
    },
    light: {
      backgroundColor: '#fff',
      color: 'black',
      paddingLeft: '4px',
    },
  }
</script>
