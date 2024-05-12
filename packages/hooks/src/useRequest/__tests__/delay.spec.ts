import { sleep } from 'test-utils/sleep'
import useRequest from '../useRequest'

function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`vue-hooks-plus useRequest A ${new Date().getTime()}`)
    }, 1)
  })
}


describe('useRequest/LoadingDelay', () => {
  it(' should data work ', async () => {
    const { loading, run: runData } = useRequest(() => getUsername())
    const { loading: loading1, run: runData1 } = useRequest(() => getUsername(), {
      loadingDelay: 300,
    })
    runData()
    runData1()
    await sleep(10)
    expect(loading.value).toBe(false)
    expect(loading1.value).toBe(true)


  })
})
