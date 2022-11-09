import { sleep } from '@/utils/sleep'
import { mount } from '@vue/test-utils'
import Demo from '../docs/retry/demo/demo.vue'

describe('useRequest/Retry', () => {
  const wrapper = mount(Demo)

  const retryText = wrapper.find('span')

  it('should init 0', () => {
    expect(retryText.text()).toBe('0')
  })

  it('should auto work', async () => {
    await sleep(1000)
    expect(retryText.text()).toBe('1')
    await sleep(3100)
    expect(retryText.text()).toBe('2')
  })
})
