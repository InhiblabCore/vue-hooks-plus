<template>
  <h3>function updater</h3>
  <ul>
    <li
      v-for="({ title, done }, index) in items"
      :class="{ done }"
      :key="title"
      @click="toggleItem(index)"
    >
      {{ title }}
    </li>
  </ul>
  <h3> no function updater</h3>
  <div>
    <vhp-button @click="setTitle">Set index 0 title</vhp-button>
    <vhp-button @click="reset" style="margin-left:8px">Reset</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { useImmer } from '@vue-hooks-plus/use-immer'

  const init = [
    {
      title: 'Learn Vue',
      done: true,
    },
    {
      title: 'Use Vue with Immer',
      done: false,
    },
  ]
  const [items, updateItems] = useImmer(init)

  function toggleItem(index: number) {
    updateItems(items => {
      items[index].done = !items[index].done
    })
  }

  const setTitle = () => {
    updateItems([
      {
        title: 'Learn Vue 1',
        done: false,
      },
    ])
  }

  const reset = () => {
    updateItems(init)
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>
