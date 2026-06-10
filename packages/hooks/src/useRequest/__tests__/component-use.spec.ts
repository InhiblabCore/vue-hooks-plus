import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import createUseRequestComponent from '../component-use/UseRequest'
import { sleep } from 'test-utils/sleep'

const UseRequest = createUseRequestComponent()

describe('<UseRequest> component', () => {
  it('renders loading slot then default slot with data', async () => {
    const service = () => new Promise<string>(res => setTimeout(() => res('hello'), 20))
    const wrapper = mount(UseRequest as any, {
      props: { service },
      slots: {
        loading: () => h('span', { class: 'loading' }, 'loading...'),
        default: (scope: any) => h('span', { class: 'data' }, String(scope.data?.value ?? '')),
      },
    })
    expect(wrapper.find('.loading').exists()).toBe(true)
    await sleep(60)
    await nextTick()
    expect(wrapper.find('.data').text()).toBe('hello')
    wrapper.unmount()
  })

  it('renders error slot on failure', async () => {
    // Suppress unhandled rejection noise from Fetch.ts (no onError handler)
    const originalConsoleError = console.error
    console.error = () => {}

    const service = () => Promise.reject(new Error('boom'))
    const wrapper = mount(UseRequest as any, {
      props: { service },
      slots: {
        // error slot receives { error: <Error instance> } (unwrapped value, not a Ref)
        error: (scope: any) => h('span', { class: 'err' }, scope.error?.message ?? ''),
        default: () => h('span', 'ok'),
      },
    })
    await sleep(30)
    await nextTick()
    expect(wrapper.find('.err').text()).toBe('boom')
    wrapper.unmount()
    console.error = originalConsoleError
  })

  it('manual prop prevents auto run', async () => {
    let calls = 0
    const service = () => Promise.resolve(++calls)
    const wrapper = mount(UseRequest as any, {
      props: { service, manual: true },
      slots: { default: () => h('i') },
    })
    await sleep(30)
    expect(calls).toBe(0)
    wrapper.unmount()
  })

  it('refreshDeps prop change triggers refresh', async () => {
    let calls = 0
    const service = () => Promise.resolve(`v${++calls}`)
    const wrapper = mount(UseRequest as any, {
      props: { service, refreshDeps: [0] },
      slots: { default: (s: any) => h('i', String(s.data?.value ?? '')) },
    })
    await sleep(30)
    expect(calls).toBe(1)
    await wrapper.setProps({ refreshDeps: [1] })
    await sleep(30)
    expect(calls).toBe(2)
    wrapper.unmount()
  })

  it('applies formatResult', async () => {
    const service = () => Promise.resolve(2)
    const wrapper = mount(UseRequest as any, {
      props: { service, formatResult: (n: number) => n * 10 },
      slots: { default: (s: any) => h('i', String(s.data?.value ?? '')) },
    })
    await sleep(30)
    await nextTick()
    expect(wrapper.find('i').text()).toBe('20')
    wrapper.unmount()
  })
})
