import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import dayjs from 'dayjs';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';
const BUILD_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss');

export default defineConfig({
  plugins: [basicSsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    DEV_SERVER: JSON.stringify(isDev),
    BUILD_TIME: JSON.stringify(BUILD_TIME),
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
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/system': {
        target: 'https://kevisual.xiongxiao.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/system/, '/system'),
      },
    },
  },
});
