import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: {
    dedupe: ['three']
  },
  optimizeDeps: {
    include: ['three']
  }
})