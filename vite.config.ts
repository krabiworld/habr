import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import preact from "@preact/preset-vite"

export default defineConfig(() => {
  return {
    plugins: [
      preact(),
      VitePWA({
        srcDir: 'src',
        filename: 'service-worker.ts',
        injectRegister: false,
        manifest: false,
        workbox: {
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 3,
          globIgnores: ['_worker.js'],
        },
      }),
    ],
    build: {
      sourcemap: false,
    },
    resolve: {
      alias: {
        src: fileURLToPath(new URL('./src', import.meta.url)),
        public: fileURLToPath(new URL('./public', import.meta.url)),
      },
    },
  }
})
