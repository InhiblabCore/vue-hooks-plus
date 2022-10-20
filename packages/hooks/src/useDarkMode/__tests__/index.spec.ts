import { mount } from '@vue/test-utils'
import Demo from '../demo/demo.vue'

describe('useDarkMode', () => {
  const wrapper = mount(Demo)

  const text = wrapper.find('p')

  const darkBtn = wrapper.findAll('vhp-button').at(0)
  const lightBtn = wrapper.findAll('vhp-button').at(1)
  const systemBtn = wrapper.findAll('vhp-button').at(2)

  const prevText = text.text()

  it('should work', () => {
    expect(text.text()).toBe(prevText)
  })

  it('should trigger systemBtn is prevText', async () => {
    await systemBtn?.trigger('click')
    expect(text.text()).toBe(prevText)
  })

  it('should trigger darkBtn is  dark', async () => {
    await darkBtn?.trigger('click')
    expect(text.text()).toBe('dark')
  })

  it('should trigger lightBtn is  light', async () => {
    await lightBtn?.trigger('click')
    expect(text.text()).toBe('light')
  })
})
