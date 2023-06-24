import { setupDevtools } from './devtools'
import * as cache from '../utils/cache'

export default {
  install(app: any) {
    if (process.env.NODE_ENV === 'development') {
      setupDevtools(app, cache)
    }
  }
}
