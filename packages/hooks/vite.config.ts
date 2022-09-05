import { defineConfig } from 'vite'
import { buildConfig, buildFullTypesConfig } from './scripts/build'

export default defineConfig(({ mode }) => {
  if (mode === 'fullTypes') {
    return buildFullTypesConfig
  }
  return buildConfig
})
