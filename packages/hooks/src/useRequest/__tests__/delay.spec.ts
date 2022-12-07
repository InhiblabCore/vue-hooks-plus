import { sleep } from 'test-utils/sleep'
import { mount } from '@vue/test-utils'

import Demo from '../docs/loadingDelay/demo/demo.vue'

describe('useRequest/LoadingDelay', () => {
  it(' should data work ', async () => {
    const wrapper = mount(Demo)
    const text = wrapper.findAll('div').at(1)

    expect(text?.text()).toBe('Username：')
    await sleep(301)
    expect(text?.text()).toBe('Username：loading...')

    await sleep(1000)
    expect(text?.text()).toBe('Username：vue-hooks-plus useRequest A')
  })
})
