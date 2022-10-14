import { mount } from '@vue/test-utils'
import { sleep } from '@/utils/sleep'

import Demo from '../demo/demo.vue'

describe('useFetchs', () => {
  it('should work', async () => {
    const wrapper = mount(Demo)

    const showText0 = wrapper.findAll('.item').at(0)
    const showText1 = wrapper.findAll('.item').at(1)
    const showText2 = wrapper.findAll('.item').at(2)
    const showText3 = wrapper.findAll('.item').at(3)

    expect(showText0?.text()).toBe('loading')
    expect(showText1?.text()).toBe('loading')
    expect(showText2?.text()).toBe('loading')
    expect(showText3?.text()).toBe('loading')

    await sleep(2000)
    expect(showText0?.text()).toBe('vue-hooks-plus 牛')
    expect(showText1?.text()).toBe('vue-hooks-plus 小牛')
    expect(showText2?.text()).toBe('vue-hooks-plus 中牛')
    expect(showText3?.text()).toBe('loading')

    await sleep(2000)
    expect(showText3?.text()).toBe('vue-hooks-plus 大牛')
  })
})
