import vue from "@vitejs/plugin-vue";
import fs from "fs";
import { resolve } from "path";
import { defineConfig, Plugin } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

const vhpESMBundleFile = resolve(__dirname, "../hooks/dist/js/index.es.js");
// const antdvESMBundleFile = resolve(__dirname, "../hooks/dist/js/index.es.js");

function copyVHPPlugin(): Plugin {
  return {
    name: "copy-varlet",
    buildStart() {
      fs.copyFileSync(vhpESMBundleFile, resolve("public/index.es.js"));
      fs.copyFileSync(vhpESMBundleFile, resolve("src/assets/index.es.js"));
    },
  };
}

export default defineConfig(async () => {
  return {
    base: "./",
    plugins: [
      vue(),
      copyVHPPlugin(),
      Components({
        // ui库解析器，也可以自定义
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    build: {
      outDir: "site",
    },
  };
});
