import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ke-globe/',
  server: { port: 3000 },
  resolve: {
    dedupe: ['three']
  },
  optimizeDeps: {
    include: ['three']
  }
})