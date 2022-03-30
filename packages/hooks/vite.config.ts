import { defineConfig } from "vite";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue3-hooks-plus",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        return `js/index.${format}.js`;
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
