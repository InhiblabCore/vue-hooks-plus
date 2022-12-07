<template>
  <div>{{ JSON.stringify(state) }}</div>
  <div class="contain">
    <vhp-button @click="initAge()">
      Add age
    </vhp-button>

    <vhp-button @click="updateAge()">
      Update age
    </vhp-button>

    <vhp-button @click="addTag()">
      Add tag
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { useSetState } from 'vue-hooks-plus'

  const [state, setState] = useSetState({ name: 'vue-hooks-plus' })

  const initAge = () => {
    setState({
      age: 1,
    })
  }

  const addTag = () => {
    setState({
      ...state.value,
      age: 3,
      tag: 'nice',
    })
  }

  const updateAge = () => {
    setState({
      age: 2,
    })
  }
</script>

<style scoped lang="less">
  .contain {
    button {
      margin-right: 8px;
    }
  }
</style>
