import remoteDepsParser from '../lib/remoteDepsParser'
import createWorkerBlobUrl from '../lib/createWorkerBlobUrl'
import jobRunner from '../lib/jobRunner'
import { TRANSFERABLE_TYPE } from '..'

describe('remoteDepsParser', () => {
  it('returns empty string for no deps', () => {
    expect(remoteDepsParser([])).toBe('')
  })
  it('builds importScripts statement', () => {
    expect(remoteDepsParser(['http://a.js', 'http://b.js'])).toBe(
      "importScripts('http://a.js','http://b.js')",
    )
  })
})

describe('createWorkerBlobUrl', () => {
  it('creates a blob url embedding fn, deps and transferable flag', async () => {
    const blobs: Blob[] = []
    const orig = { create: URL.createObjectURL, revoke: URL.revokeObjectURL }
    URL.createObjectURL = vi.fn((b: Blob) => {
      blobs.push(b)
      return 'blob:mock-url'
    })
    try {
      const fn = (a: number, b: number) => a + b
      const url = createWorkerBlobUrl(fn, ['http://dep.js'], TRANSFERABLE_TYPE.AUTO)
      expect(url).toBe('blob:mock-url')
      const code = await blobs[0].text()
      expect(code).toContain("importScripts('http://dep.js')")
      expect(code).toContain('a + b')
      expect(code).toContain("transferable: 'auto'")
    } finally {
      URL.createObjectURL = orig.create
      URL.revokeObjectURL = orig.revoke
    }
  })
})

describe('jobRunner', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('posts SUCCESS with fn result', async () => {
    const postMessage = vi.fn()
    vi.stubGlobal('postMessage', postMessage)
    const handler = jobRunner({ fn: (a: number, b: number) => a + b, transferable: TRANSFERABLE_TYPE.NONE })
    await handler({ data: [[2, 3]] } as MessageEvent)
    expect(postMessage).toHaveBeenCalledWith(['SUCCESS', 5], [])
  })

  it('posts ERROR when fn rejects (async error path)', async () => {
    // NOTE: jobRunner uses Promise.resolve(fn(...args)).catch(...), which only
    // catches async rejections. A synchronous throw from fn() escapes before
    // Promise.resolve can wrap it — that is a source limitation, not tested here.
    const postMessage = vi.fn()
    vi.stubGlobal('postMessage', postMessage)
    const boom = new Error('boom')
    const handler = jobRunner({ fn: () => Promise.reject(boom), transferable: TRANSFERABLE_TYPE.NONE })
    await handler({ data: [[]] } as MessageEvent)
    expect(postMessage).toHaveBeenCalledWith(['ERROR', boom])
  })
})
