import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import vercel from 'vite-plugin-vercel'
import istanbul from 'vite-plugin-istanbul'

import path from "path";

// if something fails: https://dev.to/henriquejensen/migrating-from-create-react-app-to-vite-a-quick-and-easy-guide-5e72
export default defineConfig({
    build: {
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return
                }
                warn(warning)
            }
        }
    },
    base: '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
      preprocessorOptions: {
          scss: {
              additionalData: `@use "@/assets/styles/global.scss" as *;`
          }
      }
    },
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
                'src/**/*.{handlers.ts, .module.scss}'
            ],
        }
    },
})