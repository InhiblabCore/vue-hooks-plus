<template>
  <div>
    <div>
      <vhp-button @click="changeGlobal">
        Global Event
      </vhp-button>
      <vhp-button @click="changeA" style="margin-left: 16px;">Sub-event A communication</vhp-button>
    </div>
    <div>
      <global-demo />
      <demo-a :event="eventA" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import GlobalDemo from './GlobalDemo.vue'
  import DemoA from './DemoA.vue'

  import { useEventEmitter } from 'vue-hooks-plus'

  const eventGlobal = useEventEmitter({ global: true })
  const eventA = useEventEmitter()

  const changeGlobal = () => {
    eventGlobal.emit('change')
  }

  const changeA = () => {
    // globalCount.value += 1
    eventA.emit('change')
  }
</script>
