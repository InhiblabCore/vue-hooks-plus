<script setup lang="ts">
  import { computed, ref } from 'vue'
  import copySvg from './Icons/copy.vue'
  import codeSvg from './Icons/code.vue'
  import SfcPlayground from './SfcPlayground.vue'
  import { useCopyCode } from './useCopyCode'

  const props = withDefaults(
    defineProps<{
      /**
       * @zh 源码字符串(需经过encodeURIComponent处理)
       */
      code: string
      highlightedCode: string
      title?: string
      desc?: string
      lang?: string
      defaultExpand?: boolean
      importMap?: Record<string, string>
    }>(),
    {
      lang: 'vue',
      defaultExpand: false,
      importMap: () => ({}),
    },
  )

  const decodedCode = computed(() => decodeURIComponent(props.code))

  const { showTip, copyCode } = useCopyCode(decodedCode.value)

  const decodedHighlightedCode = computed(() => decodeURIComponent(props.highlightedCode))

  const expand = ref(props.defaultExpand)
  const toggleExpand = () => (expand.value = !expand.value)
</script>

<template>
  <ClientOnly>
    <article v-bind="$attrs" class="vitepress-demo">
      <div class="demo-slot vp-raw">
        <slot></slot>
      </div>

      <div class="demo-title-desc" v-show="title || desc">
        <span class="demo-title">{{ title }}</span>
        <span class="demo-desc">{{ desc }}</span>
      </div>

      <div class="demo-actions">
        <div class="demo-platforms">
          <SfcPlayground :content="decodedCode" :importMap="importMap" />
        </div>
        <div class="demo-buttons">
          <div class="demo-actions-copy">
            <span v-show="showTip" class="demo-actions-tip">复制成功!</span>
            <copySvg v-show="!showTip" @click="copyCode" title="复制" />
          </div>
          <codeSvg class="demo-actions-expand" @click="toggleExpand()" title="展开" />
        </div>
      </div>
      <div
        v-show="expand"
        v-html="decodedHighlightedCode"
        :class="`language-${lang} extra-class`"
      ></div></article
    ></ClientOnly>
</template>

<style src="./demo.less"></style>
