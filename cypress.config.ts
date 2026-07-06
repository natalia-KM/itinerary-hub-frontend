import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'
import path from 'path'

const appOrigin = process.env.CYPRESS_BASE_URL ?? 'http://localhost:3000'
const apiOrigin = process.env.CYPRESS_API_URL ?? process.env.VITE_API_URL ?? 'http://localhost:8080'

export default defineConfig({
    env: {
        codeCoverage: {
            exclude: 'cypress/**/*.*'
        },
        VITE_API_URL: apiOrigin
    },
    e2e: {
      video: false,
      baseUrl: appOrigin,
      excludeSpecPattern: ['**/.vercel/**'],
      viewportWidth: 1920,
      viewportHeight: 1080,
      setupNodeEvents(on, config) {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          require('@cypress/code-coverage/task')(on, config)
          on(
              'file:preprocessor',
              vitePreprocessor({
                  configFile: path.resolve(__dirname, './vite.config.mts'),
                  mode: 'cypress',
              }),
          )
          return config
      },
  }
})
