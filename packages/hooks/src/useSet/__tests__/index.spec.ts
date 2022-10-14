import useSet from '..'

describe('useSet', () => {
  it('should init set and utils', () => {
    const [set, utils] = useSet([1, 2])

    expect(set.value).toEqual(new Set([1, 2]))
    expect(utils).toStrictEqual({
      add: expect.any(Function),
      remove: expect.any(Function),
      reset: expect.any(Function),
      clear: expect.any(Function),
      has: expect.any(Function),
    })
  })

  it('should init empty set if no initial set provided', () => {
    const [set] = useSet()

    expect(set.value).toEqual(new Set())
  })

  it('should have an initially provided key', () => {
    const [, utils] = useSet([1, 2])
    expect(utils.has(1)).toBeTruthy()
    expect(utils.has(3)).toBeFalsy()
  })

  it('should have an added key', () => {
    const [, utils] = useSet([1, 2])
    utils.add(3)

    expect(utils.has(3)).toBeTruthy()
  })

  it('should get false for non-existing key', () => {
    const [, utils] = useSet([1, 2])

    expect(utils.has(3)).toBeFalsy()
  })

  it('should add a new key', () => {
    const [set, utils] = useSet([1, 2])
    utils.add(3)

    expect(set.value).toEqual(new Set([1, 2, 3]))
  })

  it('should work if setting existing key', () => {
    const [set, utils] = useSet(['oldKey'])
    utils.add('oldKey')

    expect(set.value).toEqual(new Set(['oldKey']))
  })

  it('should remove existing key', () => {
    const [set, utils] = useSet([1, 2])
    utils.remove(2)

    expect(set.value).toEqual(new Set([1]))
  })

  it('should do nothing if removing non-existing key', () => {
    const [set, utils] = useSet(['a', 'b'])
    utils.remove('nonExisting')

    expect(set.value).toEqual(new Set(['a', 'b']))
  })

  it('should reset to initial set provided', () => {
    const [set, utils] = useSet([1])
    utils.add(2)
    expect(set.value).toEqual(new Set([1, 2]))
    utils.reset()

    expect(set.value).toEqual(new Set([1]))
  })
})
