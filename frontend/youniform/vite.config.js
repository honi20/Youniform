import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@": path.resolve(__dirname, "src"),
      util: "util",
    },
  },
  define: {
    global: "window",
    "process.env": {},
  },
  server: {
    proxy: {
      "/v1/search": {
        target: "https://openapi.naver.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/search/, "/v1/search"),
        secure: true,
      },
      "/s3-bucket": {
        target: "https://youniforms3.s3.ap-northeast-2.amazonaws.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/s3-bucket/, ""),
      },
    },
  },
});
