// yarn build 用到的vite配置

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import Components from "unplugin-vue-components/vite";
// import legacy from "@vitejs/plugin-legacy";
// import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// import styleImport, { AndDesignVueResolve } from "vite-plugin-style-import";

import { resolve } from "path";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  optimizeDeps: {
    include: [],
    exclude: [],
  },
  plugins: [vue(), vueJsx()],
  build: {
    minify: true,
    lib: {
      entry: resolve("./packages/hooks/src/index.ts"),
      name: "vue3-hooks-plus",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
};
