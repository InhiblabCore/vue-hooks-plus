import useMap from '..'

describe('useMap', () => {
  it('should init map and utils', () => {
    const [map, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])
    expect(Array.from(map.value)).toEqual([
      ['foo', 'bar'],
      ['a', 1],
    ])
    expect(utils).toStrictEqual({
      get: expect.any(Function),
      set: expect.any(Function),
      setAll: expect.any(Function),
      remove: expect.any(Function),
      reset: expect.any(Function),
      clear: expect.any(Function),
      has: expect.any(Function),
    })
  })

  it('should init empty map if not initial object provided', () => {
    const [map] = useMap()
    expect([...map.value]).toEqual([])
  })

  it('should get corresponding value for initial provided key', () => {
    const [, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])

    expect(utils.get('a')).toBe(1)
  })

  it('should get corresponding value for existing provided key', () => {
    const [, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])

    utils.set('a', 666)
    expect(utils.get('a')).toBe(666)
  })

  it('should get undefined for non-existing provided key', () => {
    const [, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])

    expect(utils.get('nonExisting')).toBeUndefined()
  })

  it('should set new key-value pair', () => {
    const [map, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])
    utils.set('newKey', 99)

    expect([...map.value]).toEqual([
      ['foo', 'bar'],
      ['a', 1],
      ['newKey', 99],
    ])
  })

  it('should override current value if setting existing key', () => {
    const [map, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])

    utils.set('foo', 'qux')

    expect([...map.value]).toEqual([
      ['foo', 'qux'],
      ['a', 1],
    ])
  })

  it('should set new map', () => {
    const [map, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])

    utils.setAll([
      ['foo', 'foo'],
      ['a', 2],
    ])

    expect([...map.value]).toEqual([
      ['foo', 'foo'],
      ['a', 2],
    ])
  })

  it('remove should be work', () => {
    const [map, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])
    expect(map.value.size).toBe(2)
    utils.remove('foo')
    expect(map.value.size).toBe(1)
  })

  it('reset should be work', () => {
    const [map, utils] = useMap<string | number, any>([
      ['foo', 'bar'],
      ['a', 1],
    ])
    utils.set('text', 'new map')
    expect([...map.value]).toEqual([
      ['foo', 'bar'],
      ['a', 1],
      ['text', 'new map'],
    ])
    utils.reset()
    expect([...map.value]).toEqual([
      ['foo', 'bar'],
      ['a', 1],
    ])
  })
})
