import { sleep } from '@/utils/sleep'
import { mount } from '@vue/test-utils'
import Demo from '../docs/refreshDeps/demo/demo.vue'

describe('useRequest/RefreshDeps', () => {
  const wrapper = mount(Demo)
  const idText = wrapper.findAll('p').at(0)
  const storeidText = wrapper.findAll('p').at(1)

  const changeIdBtntoOne = wrapper.findAll('vhp-button').at(0)
  const changeIdBtntoTwo = wrapper.findAll('vhp-button').at(1)

  const changeStoreIdBtntoOne = wrapper.findAll('vhp-button').at(0)
  const changeStoreIdBtntoTwo = wrapper.findAll('vhp-button').at(1)

  const dataText = wrapper.find('span')

  let prevDataText = ''

  it('should init', () => {
    expect(idText?.text()).toBe('id:1')
    expect(storeidText?.text()).toBe('storeID:1')
  })

  it('change id,id dependency unchanged will not request', async () => {
    await sleep(1000)
    prevDataText = dataText.text()
    await changeIdBtntoOne?.trigger('click')
    expect(dataText.text()).toBe(prevDataText)
  })

  it('change id', async () => {
    await changeIdBtntoTwo?.trigger('click')
    await sleep(1000)
    expect(dataText.text() === prevDataText).toBeFalsy()
    prevDataText = dataText.text()

    await changeIdBtntoOne?.trigger('click')
    await sleep(1000)
    expect(dataText.text() === prevDataText).toBeFalsy()
  })

  it('change store id,store id dependency unchanged will not request', async () => {
    await sleep(1000)
    prevDataText = dataText.text()
    await changeStoreIdBtntoOne?.trigger('click')
    expect(dataText.text()).toBe(prevDataText)
  })

  it('change store id', async () => {
    await changeStoreIdBtntoTwo?.trigger('click')
    await sleep(1000)
    expect(dataText.text() === prevDataText).toBeFalsy()
    prevDataText = dataText.text()

    await changeStoreIdBtntoOne?.trigger('click')
    await sleep(1000)
    expect(dataText.text() === prevDataText).toBeFalsy()
  })
})
