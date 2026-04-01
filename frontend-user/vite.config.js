import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    mode !== 'test' && Components({
      resolvers: [VantResolver()]
    })
  ].filter(Boolean),
  server: {
    port: 3000
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.mock.js',
        '**/*.d.ts'
      ]
    },
    exclude: ['node_modules', 'dist'],
    setupFiles: ['./src/test/setup.js']
  }
}))
