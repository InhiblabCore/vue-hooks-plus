import { mount } from '@vue/test-utils'
import Demo from '../docs/basic/demo/demo.vue'

describe('useRequest/Basic', () => {
  const wrapper = mount(Demo)

  const currentName = wrapper.findAll('div').at(0)
  const currentName1 = wrapper.findAll('div').at(1)

  it('should init work is loading', () => {
    {
      expect(currentName?.text()).toBe('name：loading')
      expect(currentName1?.text()).toBe('name1：loading')
    }
  })

  it('should auto run params is null', () => {
    {
      const currentAutoRunParams = wrapper.findAll('span').at(0)
      expect(currentAutoRunParams?.text()).toBe('[]')
    }
  })

  it('should manual params work', () => {
    {
      const currentManualParams = wrapper.findAll('span').at(1)
      expect(currentManualParams?.text()).toBe('[{"desc":"nice"}]')
    }
  })
})
