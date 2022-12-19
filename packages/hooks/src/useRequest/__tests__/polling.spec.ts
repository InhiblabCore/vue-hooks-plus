import { sleep } from 'test-utils/sleep'
import renderHook from 'test-utils/renderHook'
import useRequest from '../useRequest'

let data: string
function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      data = String(Date.now())
      resolve(String(Date.now()))
    }, 1000)
  })
}

describe('polling', () => {
  const [result] = renderHook(() =>
    useRequest(() => getUsername(), {
      manual: true,
      pollingInterval: 2000,
      pollingWhenHidden: false,
    }),
  )
  it('should loading is true', () => {
    expect(result.loading.value).toBeFalsy()
  })

  it('should data is undefined', () => {
    expect(result.data?.value).toBeUndefined()
  })

  it('should request', async () => {
    result.run()
    expect(result.loading.value).toBeTruthy()
    expect(result.data?.value).toBeUndefined()
    await sleep(1000)
    expect(result.data?.value).toBe(data)
    expect(result.loading.value).toBeFalsy()
  })

  it('should polling', async () => {
    const [pollingResult] = renderHook(() =>
      useRequest(() => getUsername(), {
        manual: true,
        pollingInterval: 2000,
        pollingWhenHidden: false,
      }),
    )
    let prev = ''
    pollingResult.run()
    expect(pollingResult.loading.value).toBeTruthy()
    expect(pollingResult.data?.value).toBeUndefined()
    await sleep(1200)
    expect(pollingResult.data?.value).toBe(data)
    prev = data
    await sleep(1000)
    expect(prev).toBe(data)
    await sleep(1000)
    expect(prev === data).toBeFalsy()
  })
})
