import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useRequest from '../useRequest'

function getUsername(params: { desc: string }): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`vue-hooks-plus ${params.desc}`)
    }, 200)
  })
}

describe('useRequest/Basic', () => {
  it('should auto work', async () => {
    const [hook] = renderHook(() =>
      useRequest(getUsername, {
        defaultParams: [
          {
            desc: 'nice',
          },
        ],
      }),
    )
    await sleep(200)
    expect(hook.data?.value).toBe('vue-hooks-plus nice')
  })

  it('should manual run', async () => {
    const [hook] = renderHook(() =>
      useRequest(getUsername, {
        manual: true,
        defaultParams: [
          {
            desc: 'nice',
          },
        ],
      }),
    )

    await sleep(200)
    expect(hook.data?.value).toBeUndefined()
    hook.run({ desc: 'nice1' })
    await sleep(200)
    expect(hook.data?.value).toBe('vue-hooks-plus nice1')
  })

  it('should params work', async () => {
    const [hook] = renderHook(() =>
      useRequest(getUsername, {
        defaultParams: [
          {
            desc: 'nice',
          },
        ],
      }),
    )
    await sleep(200)
    expect(hook.params.value[0]?.desc).toBe('nice')
    hook.run({ desc: 'nice1' })
    await sleep(200)
    expect(hook.params.value[0]?.desc).toBe('nice1')
  })
})
