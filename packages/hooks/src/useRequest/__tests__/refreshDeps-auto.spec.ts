import { sleep } from 'test-utils/sleep'
import renderHook from 'test-utils/renderHook'
import { reactive, ref } from 'vue'
import useRequest from '../useRequest'

let text = ''
function getUsername({ id, storeId }: { id: number; storeId: number }): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      text = `${String(Date.now())}； \t 参数id: ${id} \t； 参数storeId: ${storeId}`
      resolve(`${String(Date.now())}； \t 参数id: ${id} \t； 参数storeId: ${storeId}`)
    }, 1000)
  })
}

describe('useRequest/RefreshDeps', () => {
  const id = ref(1)
  const store = reactive({
    id: 1,
  })
  const [{ data }] = renderHook(() =>
    useRequest(() => getUsername({ id: id.value, storeId: store.id }), {
      refreshDeps: true,
    }),
  )

  let prevDataText = ''

  it('should init', () => {
    expect(id.value).toBe(1)
    expect(store.id).toBe(1)
  })

  it('change id,id dependency unchanged will not request', async () => {
    await sleep(1000)
    await sleep(100)
    prevDataText = text
    expect(prevDataText === data?.value).toBeTruthy()
    id.value = 1
    await sleep(1000)
    expect(data?.value === prevDataText).toBeTruthy()
  })

  it('change id', async () => {
    id.value = 2
    await sleep(1000)
    await sleep(100)
    expect(data?.value === prevDataText).toBeFalsy()
    prevDataText = data?.value ?? ''

    id.value = 1
    await sleep(1000)
    await sleep(100)
    expect(data?.value === prevDataText).toBeFalsy()
  })

  it('change store id,store id dependency unchanged will not request', async () => {
    prevDataText = data?.value ?? ''
    store.id = 1
    await sleep(1000)
    await sleep(100)
    expect(data?.value === prevDataText).toBeTruthy()
  })

  it('change store id', async () => {
    prevDataText = data?.value ?? ''
    store.id = 2
    await sleep(1000)
    await sleep(100)
    expect(data?.value === prevDataText).toBeFalsy()
    prevDataText = data?.value ?? ''
    store.id = 1
    await sleep(1000)
    await sleep(100)
    expect(data?.value === prevDataText).toBeFalsy()
  })
})

// describe('useRequest/RefreshDeps-auto', () => {
//   const id = ref(1)
//   const store = reactive({
//     id: 1,
//   })
//   const [{ data }] = renderHook(() =>
//     useRequest(() => getUsername({ id: id.value, storeId: store.id }), {
//       refreshDeps: true,
//     }),
//   )

//   let prevDataText = ''

//   it('should init', () => {
//     expect(id.value).toBe(1)
//     expect(store.id).toBe(1)
//   })

//   it('change id,id dependency unchanged will not request', async () => {
//     await sleep(1000)
//     await sleep(100)
//     prevDataText = text1
//     expect(prevDataText === data?.value).toBeTruthy()
//     id.value = 1
//     await sleep(1000)
//     expect(data?.value === prevDataText).toBeTruthy()
//   })

//   it('change id', async () => {
//     id.value = 2
//     await sleep(1000)
//     await sleep(100)
//     expect(data?.value === prevDataText).toBeFalsy()
//     prevDataText = data?.value ?? ''

//     id.value = 1
//     await sleep(1000)
//     await sleep(100)
//     expect(data?.value === prevDataText).toBeFalsy()
//   })

//   it('change store id,store id dependency unchanged will not request', async () => {
//     prevDataText = data?.value ?? ''
//     store.id = 1
//     await sleep(1000)
//     await sleep(100)
//     expect(data?.value === prevDataText).toBeTruthy()
//   })

//   it('change store id', async () => {
//     prevDataText = data?.value ?? ''
//     store.id = 2
//     await sleep(1000)
//     await sleep(100)
//     expect(data?.value === prevDataText).toBeFalsy()
//     prevDataText = data?.value ?? ''
//     store.id = 1
//     await sleep(1000)
//     await sleep(100)
//     expect(data?.value === prevDataText).toBeFalsy()
//   })
// })
