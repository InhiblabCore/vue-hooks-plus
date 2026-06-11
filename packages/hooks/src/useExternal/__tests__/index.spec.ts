// @vitest-environment-options {"settings":{"disableCSSFileLoading":true,"disableJavaScriptFileLoading":true}}
// ^ prevents happy-dom from attempting real HTTP fetches for created <script>/<link> elements
import { nextTick } from 'vue'
import useExternal from '..'
import renderHook from 'test-utils/renderHook'

const fire = (selector: string, type: 'load' | 'error') => {
  const el = document.querySelector(selector)
  if (!el) throw new Error(`fire(): no element matches "${selector}"`)
  el.dispatchEvent(new Event(type))
}

describe('useExternal', () => {
  it('loads js: loading -> ready on load event', () => {
    const [status] = renderHook(() => useExternal('/mock-a.js'))
    expect(status.value).toBe('loading')
    const script = document.querySelector('script[src="/mock-a.js"]')!
    expect(script).toBeTruthy()
    expect(script.getAttribute('data-status')).toBe('loading')
    fire('script[src="/mock-a.js"]', 'load')
    expect(status.value).toBe('ready')
    expect(script.getAttribute('data-status')).toBe('ready')
  })

  it('sets error status on error event', () => {
    const [status] = renderHook(() => useExternal('/mock-err.js'))
    fire('script[src="/mock-err.js"]', 'error')
    expect(status.value).toBe('error')
  })

  it('loads css link and becomes ready', () => {
    const [status] = renderHook(() => useExternal('/mock.css'))
    expect(document.querySelector('link[href="/mock.css"]')).toBeTruthy()
    fire('link[href="/mock.css"]', 'load')
    expect(status.value).toBe('ready')
  })

  it('is unset without path', () => {
    const [status] = renderHook(() => useExternal())
    expect(status.value).toBe('unset')
  })

  it('warns when type cannot be inferred', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderHook(() => useExternal('/no-extension'))
    expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('Cannot infer'))
    errSpy.mockRestore()
  })

  it('supports explicit type option', () => {
    renderHook(() => useExternal('/styles-noext', { type: 'css' }))
    expect(document.querySelector('link[href="/styles-noext"]')).toBeTruthy()
  })

  it('reuses element for same path and removes it after last unmount', async () => {
    const [, app1] = renderHook(() => useExternal('/mock-shared.js'))
    const [, app2] = renderHook(() => useExternal('/mock-shared.js'))
    expect(document.querySelectorAll('script[src="/mock-shared.js"]').length).toBe(1)
    app1.unmount()
    await nextTick()
    expect(document.querySelector('script[src="/mock-shared.js"]')).toBeTruthy()
    app2.unmount()
    await nextTick()
    expect(document.querySelector('script[src="/mock-shared.js"]')).toBeNull()
  })
})
