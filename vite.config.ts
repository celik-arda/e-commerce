import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';
import os from 'os';

// For Linux-WSL2 stability, keep DNS-processing config
dns.setDefaultResultOrder('verbatim');

const isWindows = os.platform() === 'win32';

export default defineConfig({
  plugins: [react()],
  
  css: {
    modules: {
      localsConvention: 'camelCase', // make CSS module class names camelCase
    },
  },

  // for more stability of hot-reload in ubuntu-wsl2
  server: {
    host: '0.0.0.0',
    port: 4444,
    watch: {
      usePolling: true,
      interval: 300,
      binaryInterval: 500,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 100,
      },
    },
  },

});
