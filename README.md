# Miguel & Xavier Advocacia

Site institucional moderno para o escritório de advocacia Miguel & Xavier, desenvolvido com React e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **Vite** - Build tool rápida e moderna
- **Framer Motion** - Animações suaves e profissionais
- **Lucide React** - Ícones vetoriais
- **Axios** - Cliente HTTP para integração com API

## 📁 Estrutura de Pastas

```
miguelexavier/
├── front/          # Aplicação React (front-end)
│   ├── src/
│   ├── public/
│   └── ...
└── back/           # API Laravel (back-end)
    ├── app/
    ├── database/
    └── ...
```

## 🚀 Deploy

### Desenvolvimento Local

Veja instruções detalhadas em:
- [Front-end README](front/README.md)
- [Back-end README](back/README.md)

### Produção (Locaweb)

**Guia Completo:** [DEPLOY-LOCAWEB.md](DEPLOY-LOCAWEB.md)  
**Guia Rápido:** [DEPLOY-QUICK.md](DEPLOY-QUICK.md)

**Resumo:**
```bash
# 1. Build do front-end
cd front
npm run build

# 2. Upload via FTP
# front/dist/* → public_html/
# back/* → public_html/api/

# 3. Configurar no servidor
ssh servidor
cd public_html/api
composer install --no-dev
php artisan key:generate
php artisan migrate --force
```

## 🎨 Características

- ✅ Design moderno e responsivo (mobile-first)
- ✅ Animações suaves com Framer Motion
- ✅ Ícones profissionais com Lucide React
- ✅ Scroll suave entre seções
- ✅ Botão flutuante do WhatsApp
- ✅ Formulário de contato validado
- ✅ Preparado para integração com API
- ✅ Código 100% comentado em português

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/diogogomesmiguel/miguelexavier.git
cd miguelexavier
```

2. Instale as dependências do front-end:
```bash
cd front
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

## 📝 Customização

### Alterar Conteúdo

Todo o conteúdo (textos, imagens, cores) está centralizado em:
```
front/src/services/mockData.js
```

### Configurar WhatsApp

Edite o número do WhatsApp em:
```javascript
// front/src/components/WhatsAppButton.jsx
const phoneNumber = '5511999999999'; // Altere aqui
```

### Alterar Cores

As cores do tema estão em `mockData.js`:
```javascript
export const mockTheme = {
  primary: '#1a365d',    // Azul escuro
  secondary: '#c49b63',  // Dourado
  // ...
}
```

## 🚀 Build para Produção

```bash
cd front
npm run build
```

Os arquivos otimizados estarão em `front/dist/`

## 📚 Documentação

- [Front-end README](front/README.md) - Documentação completa do front-end
- [API Spec](back/api-spec.md) - Especificação da API futura
- [Back-end README](back/README.md) - Guia para desenvolvimento da API

## 🤝 Contribuindo

Este é um projeto privado do escritório Miguel & Xavier Advocacia.

## 📄 Licença

Todos os direitos reservados © 2026 Miguel & Xavier Advocacia
