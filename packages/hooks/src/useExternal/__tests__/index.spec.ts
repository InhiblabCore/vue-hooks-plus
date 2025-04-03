import { mount } from '@vue/test-utils'
import useExternal from '..'
import Demo from './Test.vue'

describe('useExternal', () => {
  const wrapper = mount(Demo)

  it('should load axios js and fetch API', async () => {
    const demoText = wrapper.find('.status')
    expect(demoText.text()).toBe('Status: loading')

    const status = useExternal('https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js', {
      js: {
        async: true,
      },
    })
    // await sleep(2000)
    expect(status.value).toBeTruthy()
  })

  it('should load css', () => {
    const status = useExternal('https://ahooks.js.org/useExternal/bootstrap-badge.css')
    expect(status.value).toBeTruthy()
  })
})
