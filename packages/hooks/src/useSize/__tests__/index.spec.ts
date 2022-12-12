import renderHook from 'test-utils/renderHook'
import useSize from '../index'

let callback: (arg0: { target: { clientWidth: number; clientHeight: number } }[]) => void
// vitest.mock('resize-observer-polyfill', () => {
//   return vitest.fn().mockImplementation(cb => {
//     callback = cb
//     return {
//       observe: () => {},
//       disconnect: () => {},
//     }
//   })
// })

describe('useSize', () => {
  it('should not work when target is null', () => {
    renderHook(() => useSize(null))
  })
})
