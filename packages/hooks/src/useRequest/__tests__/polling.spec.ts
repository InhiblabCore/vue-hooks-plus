import { sleep } from '@/utils/sleep'
import { mount } from '@vue/test-utils'
import Demo from '../docs/polling/demo/demo.vue'

describe('polling', () => {
  const wrapper = mount(Demo)

  const pollingText = wrapper.find('span')

  it('should loading is true', () => {
    expect(pollingText.text()).toBe('loading')
  })

  it('should request', async () => {
    await sleep(1000)
    expect(pollingText.text() === 'loading').toBeFalsy()
  })

  it('should polling', async () => {
    await sleep(3000)
    expect(pollingText.text()).toBe('loading')
    await sleep(1000)
    expect(pollingText.text() === 'loading').toBeFalsy()
  })
})
