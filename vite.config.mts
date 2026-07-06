import { defineConfig } from 'vitest/config'
import { type PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import vercel from 'vite-plugin-vercel'
import istanbul from 'vite-plugin-istanbul'

import path from 'path'

export default defineConfig(({ mode }) => {
    const isCypressRun = process.env.CYPRESS_RUN === 'true' || mode === 'cypress'
    const cypressApiUrl = process.env.CYPRESS_API_URL ?? process.env.VITE_API_URL ?? 'http://localhost:8080'
    const plugins: PluginOption[] = [tsconfigPaths()]

    if (isCypressRun) {
        plugins.push(istanbul({
            cypress: true,
            requireEnv: false
        }))
    } else {
        plugins.push(vercel())
    }

    return {
        build: {
            sourcemap: !isCypressRun,
            rollupOptions: {
                onwarn(warning, warn) {
                    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                        return
                    }
                    if(warning.loc?.file?.includes('node_modules/@mui/')) {
                        return
                    }
                    warn(warning)
                }
            }
        },
        logLevel: isCypressRun ? 'silent' : 'info',
        base: '/',
        define: isCypressRun
            ? {
                'import.meta.env.VITE_API_URL': JSON.stringify(cypressApiUrl),
                'process.env.NODE_ENV': JSON.stringify('development')
            }
            : undefined,
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
        plugins,
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
                reporter: ['text', 'json', 'lcov'],
                include: ['src/**/*'],
                reportsDirectory: './coverage-unit',
                exclude: [
                    'src/**/*.{handlers.ts, .module.scss}'
                ],
            }
        },
    }
})
