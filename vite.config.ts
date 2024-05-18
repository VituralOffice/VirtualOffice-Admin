import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [svgr(), react()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }],
    },
    server: {
      host: true,
      port: 3001,
      cors: false,
    },
  });
};
