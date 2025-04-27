

import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';

// For Linux-WSL2 stability, keep DNS-processing config // 
dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react()],
  
  css: {
    modules: {
      localsConvention: 'camelCase', //make css modules letters camelCase //
    },

  },

  server: {
    // regular configs to run project in the browser  //
    host: '127.0.0.1',
    port: 4444,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
