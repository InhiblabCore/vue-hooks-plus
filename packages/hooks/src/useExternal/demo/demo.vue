<template>
  <div style="overflow: scroll;min-height: 200px;">
    <div>Status: {{ status }}</div>
    <div class="city">Result: {{ `${city ?? ''}星期一天气` }}</div>
    <div>
      <div v-for="(item, index) in data" :key="index">
        <div>{{ item.date }}: {{ item.wea }} （{{ item.tem }}）</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { watchEffect, ref } from 'vue'

  import { useExternal } from 'vue-hooks-plus'

  const status = useExternal('https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js', {
    js: {
      async: true,
    },
  })

  const data = ref()
  const city = ref()

  watchEffect(() => {
    if (status.value === 'ready') {
      // @ts-ignore
      axios
        .get(
          'https://yiketianqi.com/api?unescape=1&version=v1&appid=85841439&appsecret=EKCDLT4I&city=广州',
        )
        .then((res: any) => {
          city.value = res?.data?.city ?? ''
          data.value =
            (res?.data?.data as any[])?.map(item => ({
              date: item.date,
              wea: item.wea,
              tem: item.tem,
            })) ?? []
        })
    }
  })
</script>

<style scoped lang="less"></style>
