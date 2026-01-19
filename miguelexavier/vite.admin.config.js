import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: 'resources/admin',
    base: '/admin-assets/',
    build: {
        outDir: '../../public/admin-assets',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: 'resources/admin/main.jsx'
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
            }
        }
    }
});
