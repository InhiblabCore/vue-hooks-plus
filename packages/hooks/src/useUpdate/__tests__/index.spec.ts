import { mount } from '@vue/test-utils'
import { ref } from 'vue'

import Demo from '../demo/demo.vue'

describe('useUpdate', () => {
  const wrapper = mount(Demo)

  const showText = wrapper.find('.text')
  const btn = wrapper.find('.btn')

  const prevRef = ref(showText.text())

  it('should work', async () => {
    await btn.trigger('click')
    expect(showText.text() === prevRef.value).toBeFalsy()
  })
})
