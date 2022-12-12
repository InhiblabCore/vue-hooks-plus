import { App, createApp, defineComponent } from 'vue'

export default function renderHook<R = any>(
  renderFC: () => R,
): [
  R,
  App<Element>,
  {
    act?: (fn: () => void) => void
  },
] {
  let result: any
  let act
  const app = createApp(
    defineComponent({
      setup() {
        result = renderFC()
        act = (fn: () => void) => {
          fn()
        }
        return () => {}
      },
    }),
  )
  app.mount(document.createElement('div'))
  return [result, app, { act }]
}
