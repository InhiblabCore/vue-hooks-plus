import { defineConfig } from 'vite'
import { buildConfig, buildFullTypesConfig } from './scripts/build'
import config from './scripts/config'

export default defineConfig(({ mode }) => {
  if (mode === 'fullTypes') {
    return buildFullTypesConfig
  }
  return {
    ...config,
    buildConfig,
  }
})
