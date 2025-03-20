import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'
import path from 'path'

export default defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      VITE_API_URL: 'http://localhost:8080'
    },
    setupNodeEvents(on, config) {
      on(
          'file:preprocessor',
          vitePreprocessor({
            configFile: path.resolve(__dirname, './vite.config.mts'),
            mode: 'development',
          }),
      )
    },
  },
})
