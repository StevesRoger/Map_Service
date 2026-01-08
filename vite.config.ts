import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "react-hook-form@7.55.0": "react-hook-form",
      "figma:asset/bd468ca62ca507ea5959b3744b85b3be18f68a24.png": path.resolve(
        __dirname,
        "./src/assets/bd468ca62ca507ea5959b3744b85b3be18f68a24.png"
      ),
      "figma:asset/a9065e552bc3c9fa34735d604394f06d7713a9fd.png": path.resolve(
        __dirname,
        "./src/assets/a9065e552bc3c9fa34735d604394f06d7713a9fd.png"
      ),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "https://dev-map-api.roktenh.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("Received Response:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
