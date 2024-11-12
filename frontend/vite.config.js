import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

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
      '@public': path.resolve(__dirname, './public'),  // Alias a la carpeta public
      '@img': path.resolve(__dirname, './src/img'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
  define: {
    global: {}, // Agrega esta línea para definir `global`
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hot: true,
    historyApiFallback: true, // Esto es importante para manejar las rutas del lado del cliente
  },
  base: '/',  // Cambia esto si tu app se encuentra en un subdirectorio
  build: {
    outDir: 'dist',  // Cambia la salida de los archivos compilados si es necesario
  },
});
