import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import vercel from 'vite-plugin-vercel'
import istanbul from 'vite-plugin-istanbul'

// if something fails: https://dev.to/henriquejensen/migrating-from-create-react-app-to-vite-a-quick-and-easy-guide-5e72
export default defineConfig({
    base: '/',
    plugins: [
        tsconfigPaths(),
        vercel(),
        istanbul({
            cypress: true,
            requireEnv: false
        })
    ],
    server: {
      port: 3000
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        reporters: ['verbose'],
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*'],
            reportsDirectory: './coverage-unit',
            exclude: [
                'sec/**/*.{handlers.ts, .module.scss}'
            ],
        }
    },
})