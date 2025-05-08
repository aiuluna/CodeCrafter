import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

const pathSrc = path.resolve(__dirname, "src")

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${pathSrc}/`,
      "@": pathSrc,
    },
  },
  server: {
    port: 3006,
    host: true,
    open: "/"
  },
  build: {
    // 确保生成的资源使用相对路径
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes("node_modules")) {
            if (
              id.includes("@vue/repl") ||
              id.includes("@lefit/aries-ui") ||
              id.includes("@lefit/aries-ui-icon")
            ) {
              return "vendor"
            }
          }
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        pure_funcs: [],
      },
    },
  },
  plugins: [
    vue(),
  ],
  optimizeDeps: {
    include: [
      '@vue/repl',
      'path-browserify',
      '@lefit/aries-ui',
      '@lefit/aries-ui-icon'
    ]
  }
})
