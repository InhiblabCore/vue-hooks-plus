import { sleep } from '@/utils/sleep'
import { mount } from '@vue/test-utils'
import Demo from '../docs/ready/demo/demo.vue'

describe('useRequest/Ready', () => {
  const wrapper = mount(Demo)

  const currentName = wrapper.findAll('div').at(0)
  const currentName1 = wrapper.findAll('div').at(1)

  const btn = wrapper.find('vhp-button')

  const prevName = currentName1?.text()

  it('should init ready is false', () => {
    {
      expect(currentName?.text()).toBe('ready: false')
      expect(currentName1?.text()).toBe(prevName)
    }
  })

  it('should work with satisfy the condition; meet the condition', async () => {
    {
      await btn.trigger('click')
      expect(currentName?.text()).toBe('ready: true')
      await sleep(1001)
      expect(currentName1?.text() === prevName).toBeFalsy()

      const prevName1 = currentName1?.text()

      await btn.trigger('click')
      expect(currentName?.text()).toBe('ready: false')
      await sleep(1001)
      expect(currentName1?.text() === prevName1).toBeTruthy()
    }
  })
})
