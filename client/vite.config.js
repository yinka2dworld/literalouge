import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    historyApiFallback: true,  
  }
});

