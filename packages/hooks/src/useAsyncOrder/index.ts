import { useTimeout } from '../index'

export type Resolve = (value: any) => void
export type InterruptibleRejectType = (error: any) => void

export type AsyncOrder = {
  task: ((resolve?: Resolve, reject?: InterruptibleRejectType, index?: number) => void)[]
  option?: {
    /**
     *  Delay execution
     */
    delay?: number

    /**
     * Preparation phase callback
     * @returns void
     */
    onReady?: () => void

    /**
     * Successful callback
     * @param result any
     * @returns void
     */
    onSuccess?: (result: unknown) => void

    /**
     * Error callback
     * @param err unknown
     * @returns void
     */
    onError?: (err: unknown) => void
  }
}

export default function useAsyncOrder({ task, option }: AsyncOrder) {
  const { delay = 0, onError, onReady, onSuccess } = option ?? {}

  if (!(task instanceof Array)) {
    throw new Error('task must be Array')
  }
  const interruptibleError = (reason?: any) => {
    onError?.(reason)
  }

  const interruptibleReject = (resolve: Resolve): InterruptibleRejectType => {
    return (error: any) => {
      interruptibleError(error)
      resolve?.({ error })
    }
  }
  const runTask = () => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    Array(...task.keys())?.reduce((promise, index) => {
      const promise_ = promise.then((res: any) => {
        if (!res?.error) {
          onSuccess?.(res)
        }
        return new Promise(resolve => {
          task?.[index]?.(resolve, interruptibleReject(resolve), index)
        })
      })
      return promise_
    }, Promise.resolve())
  }

  useTimeout(() => {
    onReady?.()
    runTask()
  }, delay)
}
