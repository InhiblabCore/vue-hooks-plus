import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useFetchs from '..'

async function getUsername(params: { desc: string }): Promise<string> {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve(`vue-hooks-plus ${params.desc}`)
      },
      params.desc === '大牛' ? 4000 : 2000,
    )
  })
}

describe('useFetchs', () => {
  it('should work', async () => {
    const arr = ['牛', '小牛', '中牛', '大牛']
    const [{ fetchRun, fetchs }] = renderHook(() =>
      useFetchs(
        getUsername,
        { manual: true },
        {
          fetchKey: params => {
            return params.desc
          },
        },
      ),
    )

    renderHook(() => fetchRun({ desc: arr[0] }))
    renderHook(() => fetchRun({ desc: arr[1] }))
    renderHook(() => fetchRun({ desc: arr[2] }))
    renderHook(() => fetchRun({ desc: arr[3] }))

    await sleep(100)
    expect(fetchs.value[arr[0]].loading).toBeTruthy()
    expect(fetchs.value[arr[1]].loading).toBeTruthy()
    expect(fetchs.value[arr[2]].loading).toBeTruthy()
    expect(fetchs.value[arr[3]].loading).toBeTruthy()

    await sleep(2000)
    expect(fetchs.value[arr[0]].data).toBe('vue-hooks-plus 牛')
    expect(fetchs.value[arr[1]].data).toBe('vue-hooks-plus 小牛')
    expect(fetchs.value[arr[2]].data).toBe('vue-hooks-plus 中牛')
    expect(fetchs.value[arr[3]].loading).toBeTruthy()

    await sleep(2000)
    await sleep(200)
    expect(fetchs.value[arr[3]].data).toBe('vue-hooks-plus 大牛')
  })
})
