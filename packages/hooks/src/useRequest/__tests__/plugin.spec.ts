import { sleep } from 'test-utils/sleep'
import renderHook from 'test-utils/renderHook'

import { UseRequestPlugin } from '../types'
import useRequest from '../useRequest'

function getUsername(): Promise<{ name: string; age: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'vue-hooks-plus',
        age: 18,
      })
    }, 1000)
  })
}

const useFormatterPlugin: UseRequestPlugin<
  {
    name: string
    age: number
  },
  [],
  {
    formatter?: (params?: { name: string; age: number }) => any
  }
> = (fetchInstance, { formatter }) => {
  return {
    onSuccess: () => {
      fetchInstance.setData(formatter?.(fetchInstance.state.data), 'data')
    },
  }
}

describe('useRequest/Plugin', () => {
  const [{ data, loading }] = renderHook(() =>
    useRequest(
      () => getUsername(),
      {
        formatter: (data: any) => {
          return {
            name: `${data.name} - plugins update`,
            age: 20,
          }
        },
      },
      [useFormatterPlugin],
    ),
  )

  it('useRequest should work', () => {
    expect(loading.value).toBeTruthy()
    expect(data?.value).toBeUndefined()
  })

  it('useRequest custom plugin should work', async () => {
    await sleep(1000)
    expect(data.value?.name).toBe('vue-hooks-plus - plugins update')
    expect(data.value?.age).toBe(20)
  })
})
