import { sleep } from 'test-utils/sleep'
import { ref } from 'vue'
import useAsyncOrder from '..'

function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('第一个数据')
    }, 200)
  })
}

function getUsername2(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('第二个数据')
    }, 300)
  })
}

function getUsername3(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('第三个数据')
    }, 200)
  })
}

describe('useAsyncOrder', async () => {
  it('should work', async () => {
    const error = ref<number>(0)
    const list = ref<string[]>([])
    useAsyncOrder({
      task: [
        resolve => {
          getUsername().then(res => {
            resolve?.(res)
          })
        },
        resolve => {
          getUsername2().then(res => {
            resolve?.(res)
          })
        },
        (_, reject) => {
          getUsername2().then(() => {
            reject?.({ err: 'error' })
          })
        },
        (_, reject) => {
          getUsername3().then(() => {
            reject?.({ error: 'error' })
          })
        },
      ],
      option: {
        onError: err => {
          error.value += 1
        },
        onSuccess: res => {
          list.value.push(res)
        },
      },
    })

    await sleep(200)
    expect(list.value.length).toEqual(1)

    await sleep(300)
    expect(list.value.length).toEqual(2)

    await sleep(305)
    expect(error.value).toEqual(1)

    await sleep(200)
    expect(error.value).toEqual(2)
  })
})
