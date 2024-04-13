<script lang="ts" setup>
  import { computed } from 'vue'

  const sfcBaseUrl = 'https://sfc.vuejs.org/'

  const props = defineProps<{
    content: string
    importMap: Record<string, string>
  }>()

  const buttonStyleInine = `\n<style>
body{
    padding: 12px;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 8px;
    box-shadow: 1px 3px 4px rgba(188, 189, 190, 0.3);
    border: 1px solid rgba(235, 235, 235, 0.38);
    background-color: #010e19;
    color: white;
}  
button{
    border: 1px solid #42d392;
    color:rgba(255, 255, 255, .87);
    background-color: #33a06f;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 5px;
    min-width: 60px;
    height: 36px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s, box-shadow 0.4s,
    opacity 0.4s;
}
button:hover {
    border-color: #35eb9a;
    background-color: #42b883;
  }

button::after {
    position: absolute;
    content: '';
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    box-shadow: 0 0 0 6px #42b883;
    transition: 0.4s;
  }
button:active::after {
    box-shadow: none;
    opacity: 1;
    transition: 0s;
  }
</style>`

  const sfcPlaygroundUrl = computed(() => {
    const sfcJson = {
      'App.vue': props.content?.replace(/vhp-/g, '') + buttonStyleInine,
    } as Record<string, string>
    if (props.importMap) {
      try {
        sfcJson['import-map.json'] = JSON.stringify({
          imports: {
            'vue-hooks-plus': 'https://cdn.jsdelivr.net/npm/vue-hooks-plus/dist/js/index.es.js',
            ...props.importMap,
          },
        })
      } catch {
        // @ts-ignore
      }
    }

    return `${sfcBaseUrl}#${btoa(unescape(encodeURIComponent(JSON.stringify(sfcJson))))}`
  })
</script>

<template>
  <a :href="sfcPlaygroundUrl" style="display: flex; align-items: center" target="_blank">
    <div style="width: 16px; margin-left: 6px">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1024 1024"
        xml:space="preserve"
      >
        <g>
          <path
            d="M1004.57 319.408l-468-312c-15.974-9.83-33.022-9.92-49.142 0l-468 312C7.428 327.406 0 341.694 0 355.978v311.998c0 14.286 7.428 28.572 19.43 36.572l468 312.044c15.974 9.83 33.022 9.92 49.142 0l468-312.044c12-7.998 19.43-22.286 19.43-36.572V355.978c-0.002-14.284-7.43-28.572-19.432-36.57zM556 126.262l344.572 229.716-153.714 102.858L556 331.406V126.262z m-88 0v205.144l-190.858 127.43-153.714-102.858L468 126.262zM88 438.264l110.286 73.714L88 585.692v-147.428z m380 459.43L123.428 667.978l153.714-102.858L468 692.55v205.144z m44-281.716l-155.43-104 155.43-104 155.43 104-155.43 104z m44 281.716V692.55l190.858-127.43 153.714 102.858L556 897.694z m380-312.002l-110.286-73.714L936 438.264v147.428z"
            p-id="2793"
            fill="#555"
          />
        </g>
      </svg>
    </div>
  </a>
</template>
