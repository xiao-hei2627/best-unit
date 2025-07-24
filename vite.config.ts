import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { viteProxy } from "./src/api/proxy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: viteProxy,
  },
  build: {
    outDir: "dist", //自定义构建输出目录target:'es2020'
    lib: {
      entry: "src/main.ts", //入口文件路径
      formats: ["es", "cjs"],
    },
  },
});
