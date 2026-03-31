import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ViteConfigInput = {
  mode: String,
  command: String,
}

// https://vite.dev/config/
export default (args) => {
  const generateScopedName = args.mode === "production"
  ? "[local]_[hash:base64:6]" : "[local]_[hash:base64:2]";

  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setup.js',
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName
      }
    }
})}
