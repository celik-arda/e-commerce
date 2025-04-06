// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite'
// import dns from 'dns'
// import react from '@vitejs/plugin-react'

// dns.setDefaultResultOrder('verbatim')

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // host: '[::1]',
//     host:'127.0.0.1',
//     port: 4444
//   }
// })

import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';

// DNS ayarını localhost için verbatim olarak zorla (mevcut ayarını koruyoruz)
dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Mevcut host ayarını korudum
    port: 4444,        // Mevcut port ayarını korudum
    watch: {
      usePolling: true,  // WSL2'de dosya değişikliklerini algılamak için polling ekledim
      interval: 100,     // Her 100 ms'de bir tarama (performans için optimize edilmiş)
    },
  },
});