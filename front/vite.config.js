import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração do Vite para o projeto React
// https://vitejs.dev/config/
export default defineConfig({
  // Plugin do React para suporte a JSX e Fast Refresh
  plugins: [react()],
  
  // Configurações do servidor de desenvolvimento
  server: {
    port: 3000, // Porta onde o servidor vai rodar (http://localhost:3000)
    open: true  // Abre o navegador automaticamente ao iniciar
  }
})
