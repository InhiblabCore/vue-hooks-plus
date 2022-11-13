import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import useFavicon from '..'
import Test from '../demo/Test.vue'

const DEFAULT_FAVICON_URL =
  'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo.svg'
const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico'

describe('useFavicon', () => {
  const url = ref<string | undefined>(DEFAULT_FAVICON_URL)
  useFavicon(url)
  it('default be DEFAULT_FAVICON_URL', () => {
    expect(url.value).toBe(DEFAULT_FAVICON_URL)
  })

  it('should work', async () => {
    url.value = GOOGLE_FAVICON_URL
    expect(url.value).toBe(GOOGLE_FAVICON_URL)

    const wrapper = mount(Test)

    const currentFaviconURL = wrapper.find('span')

    const toggleToGoogleBtn = wrapper.find('.button1')
    const toggleToAHooksBtn = wrapper.find('.button2')

    expect(currentFaviconURL.text()).toBe(DEFAULT_FAVICON_URL)

    await toggleToGoogleBtn?.trigger('click')
    expect(currentFaviconURL.text()).toBe(GOOGLE_FAVICON_URL)

    await toggleToAHooksBtn?.trigger('click')
    expect(currentFaviconURL.text()).toBe(DEFAULT_FAVICON_URL)
  })

  it('support undefined', () => {
    url.value = undefined
    expect(url.value).toBeUndefined
  })
})
