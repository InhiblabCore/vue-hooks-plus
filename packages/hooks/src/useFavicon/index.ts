import { watchEffect, computed, Ref, isRef } from 'vue'

const ImgTypeMap = {
	SVG: 'image/svg+xml',
	ICO: 'image/x-icon',
	GIF: 'image/gif',
	PNG: 'image/png',
}

type ImgTypes = keyof typeof ImgTypeMap

export default function useFavicon(href: string | Ref<string>) {
	const _href = computed(() => (isRef(href) ? href.value : href))
	watchEffect(() => {
		if (!_href.value) return

		const cutUrl = _href.value?.split('.')
		const imgSuffix = cutUrl[cutUrl.length - 1].toLocaleUpperCase() as ImgTypes

		const link: HTMLLinkElement =
			document.querySelector("link[rel*='icon']") ||
			document.createElement('link')

		link.type = ImgTypeMap[imgSuffix]
		link.href = _href.value
		link.rel = 'shortcut icon'

		document.getElementsByTagName('head')[0].appendChild(link)
	})
}
