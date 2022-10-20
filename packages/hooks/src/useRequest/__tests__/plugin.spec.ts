import { sleep } from '@/utils/sleep'
import { mount } from '@vue/test-utils'
import Demo from '../docs/pluginDoc/demo/demo.vue'

describe('useRequest/Plugin', () => {
  const wrapper = mount(Demo)

  const name = wrapper.findAll('div').at(0)
  const age = wrapper.findAll('div').at(1)

  it('useRequest should work', () => {
    expect(name?.text()).toBe('loading')
    expect(age?.text()).toBe('loading')
  })

  it('useRequest custom plugin should work', async () => {
    await sleep(1000)
    expect(name?.text()).toBe('vue-hooks-plus - plugins update')
    expect(age?.text()).toBe('20')
  })
})
