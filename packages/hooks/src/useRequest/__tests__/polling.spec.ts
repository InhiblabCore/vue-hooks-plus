import { sleep } from '@/utils/sleep'
import { mount } from '@vue/test-utils'
import Demo from '../docs/polling/demo/demo.vue'

describe('polling', () => {
  const wrapper = mount(Demo)

  const pollingText = wrapper.find('span')

  const pollingStartBtn = wrapper.findAll('vhp-button')[0]
  const pollingUpdateBtn = wrapper.findAll('vhp-button')[1]

  it('should loading is false', () => {
    expect(pollingText.text()).toBe('')
  })

  it('should request', async () => {
    await pollingStartBtn.trigger('click')
    await sleep(1000)
    expect(pollingText.text() === 'loading').toBeFalsy()
  })

  it('should polling', async () => {
    await pollingStartBtn.trigger('click')
    await sleep(900)
    expect(pollingText.text()).toBe('loading')
    await sleep(1000)
    expect(pollingText.text() === 'loading').toBeFalsy()

    await pollingUpdateBtn.trigger('click')
    await pollingUpdateBtn.trigger('click')
    await sleep(1000)
    expect(pollingText.text() === 'loading').toBeTruthy()
    await pollingUpdateBtn.trigger('click')
    await pollingUpdateBtn.trigger('click')
    await pollingUpdateBtn.trigger('click')
    await sleep(1500)
    expect(pollingText.text() === 'loading').toBeFalsy()
  })
})
