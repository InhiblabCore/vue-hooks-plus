import { reactive } from 'vue'
import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useWhyDidYouUpdate from '..'

describe('useWhyDidYouUpdate', () => {
  it('should log changed props only when values change', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const props = reactive({ count: 1 })

    renderHook(() => useWhyDidYouUpdate('Comp', props))
    props.count = 2
    await sleep(0)

    expect(log).toHaveBeenCalledWith('[why-did-you-update]', 'Comp', {
      count: { from: 1, to: 2 },
    })

    log.mockRestore()
  })
})
