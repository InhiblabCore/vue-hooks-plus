<template>
  <div style="padding: 16px;">
    <span>{{ url }}</span>
    <div style="margin-top: 16px;">
      <button class="button1" @click="changeUrl('https://www.google.com/favicon.ico')">
        切换至 google favicon。
      </button>
      <button
        class="button2"
        style="margin-left: 8px;"
        @click="
          changeUrl(
            'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo.svg',
          )
        "
      >
        切换至vue-hooks-plus favicon。
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useFavicon } from 'vue-hooks-plus'
  const url = ref(
    'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo.svg',
  )

  const changeUrl = (_url: string) => {
    url.value = _url
  }

  useFavicon(url)
</script>
