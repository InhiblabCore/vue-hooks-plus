<template>
  <div>
    <vhp-button @click="() => addCount()">add</vhp-button>
    <vhp-button style="margin-left: 16px;" @click="() => subCount()">sub</vhp-button>
    <vhp-button style="margin-left: 16px;" @click="() => addPage()">add-page</vhp-button>
    <vhp-button style="margin-left: 16px;" @click="() => subPage()">sub-page</vhp-button>
    <vhp-button style="margin-left: 16px;" @click="() => clear()">
      clear
    </vhp-button>
    <br>
    <div>count: {{ state.count }}</div>
    <div>page: {{ state.page }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { useUrlState } from 'vue-hooks-plus'

  const defaultState = { count: 0, page: 1 }
  const state = useUrlState(defaultState, {
    localStorageKey: 'localStorageKey',
  })
  const addCount = () => state.value.count++
  const subCount = () => state.value.count--
  const addPage = () => state.value.page++
  const subPage = () => state.value.page--
  const clear = () => (state.value = Object.assign({}, defaultState))
</script>

<style scoped lang="less"></style>
