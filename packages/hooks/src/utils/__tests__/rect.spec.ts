import { getScrollTop, getScrollHeight, getClientHeight } from '../rect'

describe('rect utils', () => {
  describe('getScrollTop', () => {
    it('returns element scrollTop for a regular element', () => {
      const el = document.createElement('div')
      Object.defineProperty(el, 'scrollTop', { configurable: true, value: 42 })
      expect(getScrollTop(el)).toBe(42)
    })

    it('returns document-level scrollTop for document', () => {
      const result = getScrollTop(document)
      expect(typeof result).toBe('number')
    })

    it('returns document-level scrollTop for document.documentElement', () => {
      const result = getScrollTop(document.documentElement)
      expect(typeof result).toBe('number')
    })

    it('returns document-level scrollTop for document.body', () => {
      const result = getScrollTop(document.body)
      expect(typeof result).toBe('number')
    })
  })

  describe('getScrollHeight', () => {
    it('returns element scrollHeight when truthy', () => {
      const el = document.createElement('div')
      Object.defineProperty(el, 'scrollHeight', { configurable: true, value: 500 })
      expect(getScrollHeight(el)).toBe(500)
    })
  })

  describe('getClientHeight', () => {
    it('returns element clientHeight when truthy', () => {
      const el = document.createElement('div')
      Object.defineProperty(el, 'clientHeight', { configurable: true, value: 300 })
      expect(getClientHeight(el)).toBe(300)
    })
  })
})
