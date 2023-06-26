import { setupDevtools } from './devtools'
import devToolsStore from './store'

export default {
  install(app: any) {
    if (process.env.NODE_ENV === 'development') {
      setupDevtools(app, devToolsStore)
    }
  }
}
