import {defineConfig} from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'core-values-cipher',
      fileName: 'index'
    }
  }
})