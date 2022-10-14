import { ref } from 'vue'
import useFavicon from '..'

const DEFAULT_FAVICON_URL = 'https://nelsonyong.github.io/hooks-doc/favicon.ico'
const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico'

describe('useFavicon', () => {
  const url = ref<string | undefined>(DEFAULT_FAVICON_URL)
  useFavicon(url)
  it('default be DEFAULT_FAVICON_URL', () => {
    expect(url.value).toBe(DEFAULT_FAVICON_URL)
  })

  it('should work', () => {
    url.value = GOOGLE_FAVICON_URL
    expect(url.value).toBe(GOOGLE_FAVICON_URL)
  })

  it('support undefined', () => {
    url.value = undefined
    expect(url.value).toBeUndefined
  })
})
