import { nextTick, ref } from 'vue'
import renderHook from 'test-utils/renderHook'
import usePreview from '..'

describe('usePreview', () => {
  it('should render markdown into the bound container and cleanup stale html', async () => {
    const md = ref('# Title')
    const [hook, app] = renderHook(() => usePreview(md))
    const el = document.createElement('div')
    hook.container.value = el

    await nextTick()
    expect(el.innerHTML).toContain('<h1>Title</h1>')

    md.value = ''
    await nextTick()
    expect(el.innerHTML).toBe('')

    app.unmount()
  })
})
