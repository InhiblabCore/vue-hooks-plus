import useToggle from '../../useToggle'
import { sleep } from 'test-utils/sleep'
import renderHook from 'test-utils/renderHook'
import useRequest from '../useRequest'

let data = ''
function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      data = String(Date.now())
      resolve(String(Date.now()))
    }, 1000)
  })
}

describe('useRequest/Ready', () => {
  const [ready, { toggle }] = useToggle(false)
  const [result] = renderHook(() =>
    useRequest(() => getUsername(), {
      ready,
    }),
  )
  it('should init ready is false', () => {
    expect(ready.value).toBeFalsy()
  })
  it('should no work', async () => {
    expect(result.data?.value).toBeUndefined()
    expect(result.loading.value).toBeFalsy()
    await sleep(1000)
    await sleep(200)
    expect(result.data?.value).toBeUndefined()
  })

  it('should work with satisfy the condition; meet the condition', async () => {
    toggle()
    expect(ready.value).toBeTruthy()
    await sleep(200)
    expect(result.loading.value).toBeTruthy()
    await sleep(1000)
    await sleep(200)
    expect(result.loading.value).toBeFalsy()
    expect(result.data?.value).toBe(data)
  })
})
