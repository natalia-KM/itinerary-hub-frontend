import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
// if something fails: https://dev.to/henriquejensen/migrating-from-create-react-app-to-vite-a-quick-and-easy-guide-5e72
export default defineConfig({
    base: '/',
    plugins: [react()],
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
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*'],
            exclude: [],
        }
    },
})