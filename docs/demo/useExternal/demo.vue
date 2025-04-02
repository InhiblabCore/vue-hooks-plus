<template>
  <div style="overflow: scroll;min-height: 200px;">
    <div class="status">Status: {{ status }}</div>
    <img :src="data" alt="">
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

  watchEffect(() => {
    if (status.value === 'ready') {
      // @ts-ignore
      axios
        .get(
          'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo.png',
          {
            responseType: 'arraybuffer',
          },
        )
        .then((response: any) => {
          return (
            'data:image/png;base64,' +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
            )
          )
        })
        .then((res: any) => {
          data.value = res
        })
    }
  })
</script>
