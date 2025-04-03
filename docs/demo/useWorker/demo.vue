<template>
  <p
  >Current Time: <b>{{ computedTime }}</b></p
  >
  <!-- <p>Result: {{ JSON.stringify(result) }}</p> -->
  <div>
    <vhp-button @click="runSort()">Run Sort</vhp-button>
    <vhp-button @click="runWorkerSort()" style="margin-left: 8px;">Run Worker Sort</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { useInterval } from 'vue-hooks-plus'
  import { ref } from 'vue'
  import { useWorker } from '@vue-hooks-plus/use-worker'

  const numbers = [...Array(5000000)].map(e => ~~(Math.random() * 1000000))
  const sortNumbers = (nums: any[]) => nums.sort((a, b) => a - b)

  const result = ref<any[]>([])

  const computedTime = ref(new Date().getTime())
  useInterval(() => {
    computedTime.value = new Date().getTime()
  }, 10)

  const [sortWorker] = useWorker(sortNumbers)
  const runWorkerSort = async () => {
    // non-blocking UI
    result.value = await sortWorker(numbers)
    console.log(result.value)
  }

  const runSort = async () => {
    result.value = sortNumbers(numbers)
    console.log(result.value)
  }
</script>

<style scoped lang="less"></style>
