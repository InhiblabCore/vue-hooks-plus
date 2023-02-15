import { watchEffect, computed, Ref, unref } from 'vue-demi'

const UseFaviconImgTypeMap = {
  SVG: 'image/svg+xml',
  ICO: 'image/x-icon',
  GIF: 'image/gif',
  PNG: 'image/png',
}

type UseFaviconImgTypes = keyof typeof UseFaviconImgTypeMap

export default function useFavicon(href?: string | Ref<string | undefined>) {
  const _href = computed(() => unref(href))
  watchEffect(() => {
    if (!_href.value) return

    const cutUrl = _href.value?.split('.')
    const imgSuffix = cutUrl[cutUrl.length - 1].toLocaleUpperCase() as UseFaviconImgTypes

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") || document.createElement('link')

    link.type = UseFaviconImgTypeMap[imgSuffix]
    link.href = _href.value
    link.rel = 'shortcut icon'

    document.getElementsByTagName('head')[0].appendChild(link)
  })
}
