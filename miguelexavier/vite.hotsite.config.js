import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: 'resources/hotsite',
    base: './',
    // Pasta pública local com os favicons específicos do hotsite
    publicDir: 'public',
    build: {
        outDir: '../../public/hotsite-assets',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: 'resources/hotsite/index.html',
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                }
            }
        }
    },
    server: {
        port: 5174,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true
            },
            '/storage': {
                target: 'http://localhost:8000',
                changeOrigin: true
            },
            '/fonts': {
                target: 'http://localhost:8000',
                changeOrigin: true
            }
        }
    }
});
