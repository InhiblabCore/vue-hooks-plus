<template>
  <div id="demo-editor" ref="domRef">
    <div class="terminal">
      <slot />
      <div>
        <pre ref="block" class="language-vue extra-class"></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TypeIt from 'typeit'
  import { El } from 'typeit/dist/types'
  import { ref, onMounted, watch } from 'vue'

  import useInViewport from '../../../../src/useInViewport'

  const domRef = ref(null)
  const isMount = ref(false)
  const isFirst = ref(true)
  const [inViewport] = useInViewport(domRef)

  const block = ref<El>()

  watch([inViewport, isMount], curr => {
    if (curr?.[0] && curr?.[1] && isFirst.value === true) {
      isFirst.value = false
      if (block.value)
        new TypeIt(block.value, {
          speed: 50,
          startDelay: 900,
          // afterStep: () => {
          //   console.log(JSON.parse(JSON.stringify(block.value!.innerText.replace('|', ''))))
          // },
        })
          .type('<br><h1 style="opacity: 0.5;">欢迎使用 VueHooks Plus!</h1><br /><br />', {
            delay: 100,
          })
          .type(
            `<span class="label-code">&lt;script</span> setup lang="ts" <span class="label-code">&gt</span> <br /><br /><br />`,
          )
          .type(
            '&nbsp<span class="import-code">import</span> { <span class="module-code">useRequest</span> } from "<span class="export-code">vue-hooks-plus</span>" <br /> <br />',
            {
              delay: 100,
            },
          )
          .type(
            `&nbspconst { <span class="variable-code">data</span>  } = <span class="module-code">useRequest</span>(()=><span class="module-code">getData</span>(),{
    <span class="variable-code">...options</span>
 })`,
          )
          .type(`<br /><br /><br /><span class="label-code">&lt;script /&gt;</span>`)
          .type(
            `<br /><br /><span class="label-code">&lt;template&gt;</span><br /><br />&nbsp<span class="label-code">&lt;div&gt; <br /></span>&nbsp&nbsp&nbspdata值为：{{<span class="variable-code"> undefined </span>}} <br />&nbsp<span class="label-code">&lt;div /&gt; </span><br />`,
          )
          .type(`<br /><span class="label-code">&lt;template /&gt;</span>`)
          .move(-27)
          .delete(11, {
            delay: 400,
          })
          .type(`<span class="variable-code"> fetch API data 更新了！ </span>`, {
            delay: 400,
          })
          .go()
    }
  })

  onMounted(() => {
    isMount.value = true
  })
</script>

<style lang="less">
  #demo-editor {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .import-code {
    color: rgb(230, 71, 164);
  }

  .export-code {
    color: rgb(70, 166, 240);
  }

  .module-code {
    color: #fabe3b;
  }

  .variable-code {
    color: #38cd46;
  }

  .label-code {
    color: rgb(240, 60, 69);
  }

  .terminal {
    line-height: 16px;
    min-height: 480px;
    margin-top: 25px;
    padding: 30px;
    margin-left: 12px;
    margin-right: 12px;
    padding-left: 10px;
    border-radius: 7px;
    position: relative;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 30px 1px rgba(0, 0, 0, 0.15);
    width: 888px;
    max-width: 888px;
    margin-bottom: 32px;
  }
  .terminal::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 10px;
    width: 12px;
    height: 12px;
    background: #f95c5b;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #da3d42, 22px 0 0 0 #fabe3b, 22px 0 0 1px #ecb03e, 44px 0 0 0 #38cd46,
      44px 0 0 1px #2eae32;
  }

  @media (max-width: 768px) {
    .terminal {
      font-size: 12px;
      margin: 12px 12px;
    }
  }
  @media (max-width: 370px) {
    .terminal {
      font-size: 12px;
      margin: 12px 12px;
    }
  }
</style>
