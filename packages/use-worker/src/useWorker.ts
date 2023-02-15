/* eslint-disable no-unused-vars */
import { computed, ref, watchEffect } from 'vue'
import useDeepCompareEffect from './hook/useDeepCompareWithTarget'
import createWorkerBlobUrl from './lib/createWorkerBlobUrl'
import WORKER_STATUS from './lib/status'

type WorkerController = {
  status: WORKER_STATUS
  // eslint-disable-next-line @typescript-eslint/ban-types
  kill: Function
}

export enum TRANSFERABLE_TYPE {
  AUTO = 'auto',
  NONE = 'none',
}

type Options = {
  timeout?: number
  remoteDependencies?: string[]
  autoTerminate?: boolean
  transferable?: TRANSFERABLE_TYPE
  // localDependencies?: () => unknown[];
}

const PROMISE_RESOLVE = 'resolve'
const PROMISE_REJECT = 'reject'
const DEFAULT_OPTIONS: Options = {
  timeout: undefined,
  remoteDependencies: [],
  autoTerminate: true,
  transferable: TRANSFERABLE_TYPE.AUTO,
  // localDependencies: () => [],
}

/**
 *
 * @param {Function} fn the function to run with web worker
 * @param {Object} options useWorker option params
 */
export const useWorker = <T extends (...fnArgs: any[]) => any>(
  fn: T,
  options: Options = DEFAULT_OPTIONS,
) => {
  // setWorkerStatus
  const workerStatus = ref<WORKER_STATUS>(WORKER_STATUS.PENDING)
  const worker = ref<Worker & { _url?: string }>()
  const isRunning = ref(false)
  const promise = ref<{
    [PROMISE_REJECT]?: (result: ReturnType<T> | ErrorEvent) => void
    [PROMISE_RESOLVE]?: (result: ReturnType<T>) => void
  }>({})
  const timeoutId = ref<number>()

  const killWorker = () => {
    if (worker.value?._url) {
      worker.value.terminate()
      URL.revokeObjectURL(worker.value._url)
      promise.value = {}
      worker.value = undefined
      window.clearTimeout(timeoutId.value)
    }
  }

  const onWorkerEnd = computed(() => (status: WORKER_STATUS) => {
    const terminate =
      options.autoTerminate != null ? options.autoTerminate : DEFAULT_OPTIONS.autoTerminate

    if (terminate) {
      killWorker()
    }
    workerStatus.value = status
  })

  const generateWorker = useDeepCompareEffect(() => {
    const {
      remoteDependencies = DEFAULT_OPTIONS.remoteDependencies,
      timeout = DEFAULT_OPTIONS.timeout,
      transferable = DEFAULT_OPTIONS.transferable,
      // localDependencies = DEFAULT_OPTIONS.localDependencies,
    } = options

    const blobUrl = createWorkerBlobUrl(
      fn,
      remoteDependencies!,
      transferable! /*, localDependencies!*/,
    )
    const newWorker: Worker & { _url?: string } = new Worker(blobUrl)
    newWorker._url = blobUrl

    newWorker.onmessage = (e: MessageEvent) => {
      const [status, result] = e.data as [WORKER_STATUS, ReturnType<T>]
      switch (status) {
        case WORKER_STATUS.SUCCESS:
          promise.value[PROMISE_RESOLVE]?.(result)
          onWorkerEnd.value(WORKER_STATUS.SUCCESS)
          break
        default:
          promise.value[PROMISE_REJECT]?.(result)
          onWorkerEnd.value(WORKER_STATUS.ERROR)
          break
      }
    }

    newWorker.onerror = (e: ErrorEvent) => {
      promise.value[PROMISE_REJECT]?.(e)
      onWorkerEnd.value(WORKER_STATUS.ERROR)
    }

    if (timeout) {
      timeoutId.value = window.setTimeout(() => {
        killWorker()
        workerStatus.value = WORKER_STATUS.TIMEOUT_EXPIRED
      }, timeout)
    }
    return newWorker
  }, [fn, options, killWorker])

  const callWorker = (...workerArgs: Parameters<T>) => {
    const { transferable = DEFAULT_OPTIONS.transferable } = options
    return new Promise<ReturnType<T>>((resolve, reject) => {
      promise.value = {
        [PROMISE_RESOLVE]: resolve,
        [PROMISE_REJECT]: reject,
      }
      const transferList: any[] =
        transferable === TRANSFERABLE_TYPE.AUTO
          ? workerArgs.filter(
              (val: any) =>
                ('ArrayBuffer' in window && val instanceof ArrayBuffer) ||
                ('MessagePort' in window && val instanceof MessagePort) ||
                ('ImageBitmap' in window && val instanceof ImageBitmap) ||
                // @ts-ignore
                ('OffscreenCanvas' in window && val instanceof OffscreenCanvas),
            )
          : []
      worker.value?.postMessage([[...workerArgs]], transferList)
      workerStatus.value = WORKER_STATUS.RUNNING
    })
  }

  const workerHook = (...fnArgs: Parameters<T>) => {
    const terminate =
      options.autoTerminate != null ? options.autoTerminate : DEFAULT_OPTIONS.autoTerminate
    if (isRunning.value) {
      /* eslint-disable-next-line no-console */
      console.error(
        '[useWorker] You can only run one instance of the worker at a time, if you want to run more than one in parallel, create another instance with the hook useWorker().',
      )
      return Promise.reject()
    }
    if (terminate || !worker.value) {
      worker.value = generateWorker.value()
    }
    return callWorker(...fnArgs)
  }

  const killWorkerController = computed(() => () => {
    killWorker()
    workerStatus.value = WORKER_STATUS.KILLED
  })

  const workerController = {
    status: workerStatus,
    kill: killWorkerController,
  }

  watchEffect(() => {
    isRunning.value = workerStatus.value === WORKER_STATUS.RUNNING
  })

  return ([workerHook, workerController] as unknown) as [typeof workerHook, WorkerController]
}
