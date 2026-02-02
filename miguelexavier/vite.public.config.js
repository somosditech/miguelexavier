import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: 'resources/public-site',
    base: '/site-assets/',
    build: {
        outDir: '../../public/site-assets',
        emptyOutDir: true,
        manifest: true,
        sourcemap: true, // Habilita source maps para corrigir erro no PageSpeed
        rollupOptions: {
            input: 'resources/public-site/main.jsx',
            output: {
                manualChunks: {
                    // Separa bibliotecas do React
                    'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
                    // Separa bibliotecas de UI pesadas
                    'vendor-ui': ['framer-motion', 'recharts'],
                    // Agrupa ícones
                    'lucide': ['lucide-react']
                }
            }
        }
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true
            },
            '/storage': {
                target: 'http://localhost:8000',
                changeOrigin: true
            }
        }
    }
});
