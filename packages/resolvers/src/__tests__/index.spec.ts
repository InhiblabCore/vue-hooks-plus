vi.mock('local-pkg', () => ({
  resolveModule: vi.fn(() => '/fake/vue-hooks-plus/meta-data.json'),
}))
vi.mock('node:fs', () => ({
  default: {
    readFileSync: vi.fn(() => JSON.stringify({ function: ['useBoolean', 'useToggle'] })),
  },
  readFileSync: vi.fn(() => JSON.stringify({ function: ['useBoolean', 'useToggle'] })),
}))

import {
  VueHooksPlusResolver,
  VueHooksPlusUseImmerResolver,
  VueHooksPlusUseWorkerResolver,
  VueHooksPlusUseUrlStateResolver,
} from '..'

describe('VueHooksPlusResolver', () => {
  it('should resolve known hook names from meta-data', () => {
    const resolver = VueHooksPlusResolver()
    expect(resolver('useBoolean')).toEqual({ name: 'useBoolean', from: 'vue-hooks-plus' })
  })

  it('should return undefined for unknown names', () => {
    const resolver = VueHooksPlusResolver()
    expect(resolver('useUnknownThing')).toBeUndefined()
  })

  it('should respect prefix option', () => {
    const resolver = VueHooksPlusResolver({ prefix: 'Vh' })
    expect(resolver('VhuseToggle')).toEqual({ name: 'useToggle', from: 'vue-hooks-plus' })
    expect(resolver('useToggle')).toBeUndefined()
  })
})

describe('sub resolvers', () => {
  it('resolves useImmer', () => {
    const resolver = VueHooksPlusUseImmerResolver()
    expect(resolver('useImmer')).toEqual({ name: 'useImmer', from: '@vue-hooks-plus/use-immer' })
    expect(resolver('useNope')).toBeUndefined()
  })

  it('resolves useWorker', () => {
    const resolver = VueHooksPlusUseWorkerResolver()
    expect(resolver('useWorker')).toEqual({ name: 'useWorker', from: '@vue-hooks-plus/use-worker' })
    expect(resolver('useNope')).toBeUndefined()
  })

  // NOTE: useUrlStateResolver.ts has a source bug — hooks array contains 'useUrlState ' (trailing space),
  // so resolver('useUrlState') returns undefined. Testing actual source behavior here.
  // WHEN FIXED: change this test to:
  //   expect(resolver('useUrlState')).toEqual({ name: 'useUrlState', from: '@vue-hooks-plus/use-url-state' })
  //   expect(resolver('useUrlState ')).toBeUndefined()
  // and remove the trailing-space assertions below.
  it('resolves useUrlState (source has trailing space bug — exact match required)', () => {
    const resolver = VueHooksPlusUseUrlStateResolver()
    // The source registers 'useUrlState ' (with trailing space), so clean 'useUrlState' won't match
    expect(resolver('useUrlState')).toBeUndefined()
    // The string with trailing space does match
    expect(resolver('useUrlState ')).toEqual({
      name: 'useUrlState ',
      from: '@vue-hooks-plus/use-url-state',
    })
  })
})
