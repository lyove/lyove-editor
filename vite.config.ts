import { defineConfig, loadEnv } from "vite";
import path from "path";
import packageJson from "./package.json";

const { resolve } = path;

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default defineConfig(({ mode }) => {
  const envDir = './env';
  const envPrefix = ["VITE", "APP"];

  // Env var
  const { APP_NAME, APP_BASE_URL } = loadEnv(mode, envDir, envPrefix);

  // Build files name
  const packageName = packageJson.name;
  const buildFileName = {
    es: `${packageName}.mjs`,
    cjs: `${packageName}.cjs`,
    umd: `${packageName}.umd.js`,
    iife: `${packageName}.iife.js`,
  };

  return {
    envDir,
    envPrefix,
    base: APP_BASE_URL,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    server: {
      port: 3000,
      https: false,
      open: true
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/app.ts"),
        name: APP_NAME,
        formats: ["es", "cjs", "umd", "iife"],
        fileName: (format) => buildFileName[format],
      },
      rollupOptions: {
        output: { assetFileNames: `${packageName}.[ext]` },
      },
      emptyOutDir: true,
      assetsDir: "assets",
    },
  };
});
