import { App, createApp, defineComponent } from 'vue'

export default function renderHook<R = any>(renderFC: () => R): [R, App<Element>] {
  let result
  const app = createApp(
    defineComponent({
      setup() {
        result = renderFC()
        return () => {}
      },
    }),
  )
  app.mount(document.createElement('div'))
  // @ts-ignore
  return [result as R, app]
}
