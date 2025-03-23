import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'
import path from 'path'

export default defineConfig({
    env: {
        codeCoverage: {
            exclude: 'cypress/**/*.*'
        }
    },
    e2e: {
      video: false,
      excludeSpecPattern: ['**/.vercel/**'],
      viewportWidth: 1920,
      viewportHeight: 1080,
      env: {
          VITE_API_URL: 'http://localhost:8080'
      },
      setupNodeEvents(on, config) {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          require('@cypress/code-coverage/task')(on, config)
          on(
              'file:preprocessor',
              vitePreprocessor({
                  configFile: path.resolve(__dirname, './vite.config.mts'),
                  mode: 'development',
              }),
          )
          return config
      },
  }
})
