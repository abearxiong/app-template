import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
// import react from '@vitejs/plugin-react';
import dayjs from 'dayjs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
import pkgs from './package.json' with { type: 'json' };

const isDev = process.env.NODE_ENV === 'development';
const isWebDev = process.env.WEB_DEV === 'true';
const BUILD_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss');
const basename = pkgs.basename;
let plugins = [tailwindcss(),];

if (!isWebDev) {
  // 在bolt的web开发环境下不需要ssl
  plugins.push(basicSsl());
}


export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: isDev ? '/' : basename,
  define: {
    DEV_SERVER: JSON.stringify(isDev),
    BUILD_TIME: JSON.stringify(BUILD_TIME),
    BASE_NAME: JSON.stringify(basename),
  },
  optimizeDeps: {
    exclude: ['react'], // 排除 react 和 react-dom 以避免打包
  },
  // esbuild: {
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment',
  // },
  server: {
    port: 6025,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://kevisual.xiongxiao.me',
        changeOrigin: true,
      },
      '/system/lib': {
        target: 'https://kevisual.xiongxiao.me',
        changeOrigin: true,
      },
    },
  },
});
