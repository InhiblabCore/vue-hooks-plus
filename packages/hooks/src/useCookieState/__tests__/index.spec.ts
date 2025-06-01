import useCookieState from '..'

describe('useCookieState', () => {
  it('should passed work', async () => {
    const [message, setMessage] = useCookieState('useCookieStateString', { defaultValue: 'init' })

    expect(message.value).toBe('init')

    setMessage('test')
    expect(message.value).toBe('test')

    setMessage('testA')
    expect(message.value).toBe('testA')

    setMessage('testB')
    expect(message.value).toBe('testB')
  })

  it('should support undefined', async () => {
    const [message, setMessage] = useCookieState('test', {
      defaultValue: undefined,
    })
    expect(message.value).toBeUndefined()

    setMessage('false')
    expect(message.value).toEqual('false')
  })

  it('should support empty string', () => {
    const [message] = useCookieState('test-key-empty-string', {
      defaultValue: '',
    })
    expect(message.value).toEqual('')
  })

  it('should support function updater', () => {
    const COOKIE_KEY = 'test-func-updater'
    const [message] = useCookieState(COOKIE_KEY, {
      defaultValue: () => 'hello',
    })
    expect(message.value).toEqual('hello')
  })

  it('should remove cookie when set to undefined', () => {
    const COOKIE_KEY = 'test-remove-cookie'
    const [message, setMessage] = useCookieState(COOKIE_KEY, { defaultValue: 'to-be-removed' })
    expect(message.value).toBe('to-be-removed')
    setMessage(undefined)
    expect(message.value).toBeUndefined()
    // Should not find the cookie in document.cookie
    expect(document.cookie.includes(COOKIE_KEY)).toBe(false)
  })

  it('should persist value across multiple hook calls', () => {
    const COOKIE_KEY = 'test-persist'
    const [, setMessage1] = useCookieState(COOKIE_KEY, { defaultValue: 'first' })
    setMessage1('persisted')
    // Simulate re-mount
    const [message2] = useCookieState(COOKIE_KEY, { defaultValue: 'should-not-use' })
    expect(message2.value).toBe('persisted')
  })

  it('should support different data types (number, boolean, object, array)', () => {
    const COOKIE_KEY = 'test-types'
    const [message, setMessage] = useCookieState(COOKIE_KEY, { defaultValue: '0' })
    setMessage('123')
    expect(message.value).toBe('123')
    setMessage('true')
    expect(message.value).toBe('true')
    setMessage(JSON.stringify({ a: 1 }))
    expect(message.value).toBe('{"a":1}')
    setMessage(JSON.stringify([1, 2, 3]))
    expect(message.value).toBe('[1,2,3]')
  })

  it('should support cookie options (expires, path)', () => {
    const COOKIE_KEY = 'test-options'
    const [message, setMessage] = useCookieState(COOKIE_KEY, { defaultValue: 'opt', expires: 7, path: '/' })
    setMessage('with-options', { expires: 1, path: '/' })
    expect(message.value).toBe('with-options')
    // We cannot easily check cookie attributes in jsdom, but this ensures no error
  })

  it('should read value from cookie if it exists, ignoring defaultValue', () => {
    const COOKIE_KEY = 'test-existing-cookie'
    // Set cookie manually
    document.cookie = `${COOKIE_KEY}=existing-value`
    const [message] = useCookieState(COOKIE_KEY, { defaultValue: 'should-not-use' })
    expect(message.value).toBe('existing-value')
  })
})
