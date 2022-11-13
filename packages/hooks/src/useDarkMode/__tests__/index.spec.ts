import { mount } from '@vue/test-utils'
import Test from '../demo/Test.vue'

describe('useDarkMode', () => {
  const wrapper = mount(Test)

  const text = wrapper.find('p')

  const darkBtn = wrapper.findAll('button').at(0)
  const lightBtn = wrapper.findAll('button').at(1)
  const systemBtn = wrapper.findAll('button').at(2)

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
