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
                    // Agrupa todos os ícones do lucide-react em um único arquivo
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
