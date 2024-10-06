import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components'),
      '@css': path.resolve(__dirname, './src/css'),
      '@pages': path.resolve(__dirname, './src/Pages'),
      '@contex': path.resolve(__dirname, './src/context'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@public': path.resolve(__dirname, './public'),
      '@img': path.resolve(__dirname, './src/img'),
      
    },
  },
  server: {
    /* host para ver react desde el celular*/
    host: '0.0.0.0',
    port: 5173,
    hot: true, // Asegúrate de que HMR esté habilitado
    
 
  }
})
