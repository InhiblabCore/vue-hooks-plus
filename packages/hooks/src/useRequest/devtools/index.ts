import { setupDevtools } from './devtools'

export default {
  install(app: any) {
    if (process.env.NODE_ENV === 'development') {
      setupDevtools(app)
    }
  }
}
