import { mount } from '@vue/test-utils'
import useExternal from '..'
import Demo from '../demo/demo.vue'

describe('useExternal', () => {
  const wrapper = mount(Demo)

  it('should load axios js and fetch API', () => {
    const demoText = wrapper.find('.city')
    expect(demoText.text()).toBe('Result: 星期一天气')

    const status = useExternal('https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js', {
      js: {
        async: true,
      },
    })

    expect(status.value).toBeTruthy()
  })

  it('should load css', () => {
    const status = useExternal('https://ahooks.js.org/useExternal/bootstrap-badge.css')
    expect(status.value).toBeTruthy()
  })
})
