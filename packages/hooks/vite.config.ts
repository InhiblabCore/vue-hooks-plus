import { defineConfig } from 'vite'
import { buildConfig } from './scripts/build'
// import config from './scripts/config'

export default defineConfig(() => {
  // if (mode === 'fullTypes') {
  //   return buildFullTypesConfig
  // }
  return buildConfig
})
