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
    const [message, setMessage] = useCookieState('useCookieStateString', {
      defaultValue: undefined,
    })
    expect(message.value).toEqual(undefined)

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
})
