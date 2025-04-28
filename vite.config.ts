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

  server: {
    host: '127.0.0.1',
    port: 4444,
    watch: {
      usePolling: isWindows, // Enable polling only on Windows
      interval: isWindows ? 300 : 100, // Slightly slower polling interval on Windows
    },
  },
});
