import { ref, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import useFavicon from '..'

const DEFAULT_FAVICON_URL =
  'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo.svg'
const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico'

function getFaviconHref() {
  const link = document.head.querySelector('link[rel*="icon"]') as HTMLLinkElement | null
  return link?.href || ''
}

describe('useFavicon', () => {
  let originalFavicon: string | null = null

  beforeEach(() => {
    const link = document.head.querySelector('link[rel="icon"]') as HTMLLinkElement | null
    originalFavicon = link?.href || null
  })

  afterEach(() => {
    // 恢复原始 favicon
    let link = document.head.querySelector('link[rel="icon"]') as HTMLLinkElement | null
    if (!link && originalFavicon) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    if (link && originalFavicon) {
      link.href = originalFavicon
    } else if (link) {
      link.parentNode?.removeChild(link)
    }
  })

  it('should set favicon to the provided URL', async () => {
    const url = ref(DEFAULT_FAVICON_URL)
    mount(defineComponent({
      setup() {
        useFavicon(url)
        return () => null
      }
    }))
    await Promise.resolve().then()
    expect(getFaviconHref()).toBe(DEFAULT_FAVICON_URL)
  })

  it('should update favicon when URL changes', async () => {
    const url = ref(DEFAULT_FAVICON_URL)
    const wrapper = mount(defineComponent({
      setup() {
        useFavicon(url)
        return () => null
      }
    }))
    await Promise.resolve().then()
    expect(getFaviconHref()).toBe(DEFAULT_FAVICON_URL)
    url.value = GOOGLE_FAVICON_URL
    await wrapper.vm.$nextTick()
    await Promise.resolve().then()
    expect(getFaviconHref()).toBe(GOOGLE_FAVICON_URL)
  })

  it('should remove favicon when URL is undefined', async () => {
    const url = ref<string | undefined>(DEFAULT_FAVICON_URL)
    const wrapper = mount(defineComponent({
      setup() {
        useFavicon(url)
        return () => null
      }
    }))
    await Promise.resolve().then()
    expect(getFaviconHref()).toBe(DEFAULT_FAVICON_URL)
    url.value = undefined
    await wrapper.vm.$nextTick()
    await Promise.resolve().then()
    const link = document.head.querySelector('link[rel="icon"]')
    expect(link).toBeNull()
  })

  it('should restore previous favicon on unmount', async () => {
    const url = ref(GOOGLE_FAVICON_URL)
    const wrapper = mount(defineComponent({
      setup() {
        useFavicon(url)
        return () => null
      }
    }))
    await Promise.resolve().then()
    expect(getFaviconHref()).toBe(GOOGLE_FAVICON_URL)
    wrapper.unmount()
    await Promise.resolve().then()
    expect(getFaviconHref()).toBe(GOOGLE_FAVICON_URL)
  })
})
