import useFormatResult from '..'

describe('useFormatResult', () => {
  it('should inject data ', () => {
    const name = useFormatResult({ name: 'vue-hooks-plus' }, data => {
      return data.name
    })

    expect(name.value).toBe('vue-hooks-plus')
  })
  it('should formatResult work', () => {
    const name = useFormatResult({ name: 'vue-hooks-plus' }, data => {
      return `${data.name} good`
    })
    expect(name.value).toBe('vue-hooks-plus good')
  })

  it('support undefined', () => {
    const name = useFormatResult({ name: 'vue-hooks-plus' }, () => {
      return undefined
    })
    expect(name.value).toBeUndefined()
  })

  it('support null', () => {
    const name = useFormatResult({ name: 'vue-hooks-plus' }, () => {
      return null
    })
    expect(name.value).toBeNull()
  })
})
