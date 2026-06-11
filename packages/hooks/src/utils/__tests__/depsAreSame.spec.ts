import depsAreSame from '../depsAreSame'

describe('depsAreSame', () => {
  it('returns true for same reference', () => {
    const arr = [1, 2, 3]
    expect(depsAreSame(arr, arr)).toBe(true)
  })

  it('returns true for arrays with same values', () => {
    const obj = {}
    expect(depsAreSame([1, 'a', obj], [1, 'a', obj])).toBe(true)
  })

  it('returns false when a value differs', () => {
    expect(depsAreSame([1, 2], [1, 3])).toBe(false)
  })

  it('returns false when NaN is compared with non-NaN', () => {
    expect(depsAreSame([NaN], [1])).toBe(false)
  })

  it('returns true for NaN compared with NaN (Object.is semantics)', () => {
    expect(depsAreSame([NaN], [NaN])).toBe(true)
  })
})
