import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';             
dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    
    // important : vite's interference on scss was removed, vscode extension goning to handle scss operations for stability  //

  },
  server: {
    host: '127.0.0.1', // selected host domain
    port: 4444,        // selected port
    watch: {
      usePolling: true,  // WSL watching-listenning folders
      interval: 100,     // scan per every 100ms
    },
  },
});
