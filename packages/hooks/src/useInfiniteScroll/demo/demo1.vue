<template>
  <div>
    <p v-if="loading" />
    <div
      v-for="item in data?.list"
      :key="item"
      style="padding: 12px;border: 1px solid #f5f5f5;text-align: center;"
    >
      {{ item }}行</div
    >
    <div style="margin-top: 8px;">
      <vhp-button v-if="hasMore" type="button" @click="() => loadMore()" :disabled="loadingMore">
        {{ loadingMore ? 'Loading more...' : 'Click to load more' }}
      </vhp-button>
      <p v-else> <span v-if="!hasMore">No more data</span> </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useInfiniteScroll } from '../../index'

  interface Result {
    list: string[]
    total: number
  }

  const PAGE_SIZE = 4

  const resultData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']

  function getLoadMoreList(page: number, pageSize: number): Promise<Result> {
    const start = (page - 1) * pageSize
    const end = page * pageSize
    const list = resultData.slice(start, end)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          list,
          total: resultData.length,
        })
      }, 1000)
    })
  }

  const { data, loading, loadMore, loadingMore } = useInfiniteScroll(d => {
    const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
    return getLoadMoreList(page, PAGE_SIZE)
  })

  const hasMore = computed(() => data.value && data.value?.list.length < data.value.total)
</script>
