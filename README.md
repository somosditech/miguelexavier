# Miguel & Xavier Advocacia

Este repositório contém a solução digital completa para o escritório **Miguel & Xavier Advocacia**. O projeto mudou de uma arquitetura separada (front/back) para um sistema unificado robusto, combinando a segurança e estabilidade do **Laravel** no backend com a interatividade do **React** no frontend.

## 🚀 Visão Geral da Arquitetura

O projeto está centralizado na pasta `miguelexavier/` e opera como uma aplicação monolítica moderna:

- **Backend (API)**: Laravel 10+. Gerencia banco de dados, autenticação, uploads e regras de negócio.
- **Frontend Público**: Uma SPA (Single Page Application) em React, renderizada dentro de uma view Laravel. Focada em SEO, performance e design premium.
- **Painel Administrativo**: Uma SPA React separada (`/p_admin`), protegida por autenticação, permitindo gerenciamento total do conteúdo do site (textos, imagens, equipe, serviços, rodapé).

## �️ Tecnologias

### Backend
- **Laravel**: Framework PHP robusto.
- **MySQL**: Banco de dados relacional.
- **Sanctum**: Autenticação via API/Tokens.

### Frontend (Público & Admin)
- **React 18**: Biblioteca de UI.
- **Vite**: Build tool de alta performance (configurações separadas para admin e público).
- **Framer Motion**: Animações fluidas.
- **Lucide React**: Ícones modernos.
- **React Router**: Navegação interna (agora usada com Modals para páginas legais).

## 📁 Estrutura de Diretórios

```
miguelexavier/
├── app/                    # Lógica do Backend (Controllers, Models)
├── database/               # Migrations e Seeds
├── public/                 # Assets compilados e uploads (storage link)
├── resources/
│   ├── admin/              # Código fonte do Painel Administrativo (React)
│   ├── public-site/        # Código fonte do Site Público (React)
│   └── views/              # Blade templates (pontos de entrada)
├── routes/                 # Rotas da API e Web
├── vite.admin.config.js    # Configuração de build do Admin
├── vite.public.config.js   # Configuração de build do Site Público
└── ...
```

## ⚡ Guia de Instalação e Execução

### Pré-requisitos
- PHP 8.1+
- Composer
- Node.js & NPM
- Servidor MySQL

### 1. Configuração do Backend
Entre na pasta do projeto:
```bash
cd miguelexavier
```

Instale as dependências do PHP:
```bash
composer install
```

Configure o ambiente:
```bash
cp .env.example .env
# Edite o .env com suas credenciais de banco de dados (DB_DATABASE, DB_USERNAME, etc)
php artisan key:generate
```

Prepare o banco de dados:
```bash
php artisan migrate --seed
# Isso criará as tabelas e o usuário administrador padrão
```

Configure o armazenamento (Importante para imagens):
```bash
php artisan storage:link
```

### 2. Configuração do Frontend
Instale as dependências (Node):
```bash
npm install
```

Compile os assets (Gera os arquivos finais em public/):
```bash
npm run build
# Ou individualmente:
# npm run site:build
# npm run admin:build
```

### 3. Executando o Projeto
Inicie o servidor local do Laravel:
```bash
php artisan serve
```
O site estará disponível em: `http://127.0.0.1:8000`

## 🖥️ Funcionalidades Principais

### Site Público
- **Design Premium**: Identidade visual dourada e vinho, fontes serifadas (Trajan).
- **Modais Legais**: "Política de Privacidade" e "Termos de Uso" abrem em modais elegantes sem recarregar a página.
- **Responsivo**: Totalmente adaptado para mobile e desktop.
- **Uploads Dinâmicos**: Imagens da equipe, serviços e banners carregados via painel.

### Painel Administrativo (`/p_admin`)
- **Login Seguro**: Área restrita para administradores.
- **Gerenciamento de Conteúdo**:
  - **Equipe**: Adicionar/Editar advogados com fotos e redes sociais.
  - **Serviços**: Gerenciar áreas de atuação.
  - **Depoimentos**: Moderar avaliações de clientes.
  - **Rodapé**: Editar links sociais e textos legais (Editor rico).
  - **Tema**: Ajustar cores globais do site.

## 📝 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `php artisan serve` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila Admin e Site Público para produção |
| `npm run site:dev` | Inicia servidor Vite apenas para o site público (HMR) |
| `npm run admin:dev` | Inicia servidor Vite apenas para o admin (HMR) |
| `php artisan migrate:fresh --seed` | Reseta o banco de dados com dados iniciais |

## 📄 Licença

Desenvolvido exclusivamente para **Miguel & Xavier Advocacia**. Todos os direitos reservados.
