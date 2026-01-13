# Miguel & Xavier - Backend API

API RESTful desenvolvida com Laravel para gerenciar o conteúdo do site Miguel & Xavier Advocacia.

## 🚀 Tecnologias

- **Laravel 12.x** - Framework PHP
- **MySQL** - Banco de dados
- **JWT Auth** - Autenticação via tokens
- **Composer** - Gerenciador de dependências

## 📋 Requisitos

- PHP >= 8.2
- Composer
- MySQL >= 8.0
- Extensões PHP: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/diogogomesmiguel/miguelexavier.git
cd miguelexavier/back
```

### 2. Instale as dependências

```bash
composer install
```

### 3. Configure o ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Gere a chave da aplicação
php artisan key:generate

# Gere a chave JWT
php artisan jwt:secret
```

### 4. Configure o banco de dados

Edite o arquivo `.env` e configure suas credenciais MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=miguelxavier_db
DB_USERNAME=root
DB_PASSWORD=sua_senha
```

### 5. Crie o banco de dados

```sql
CREATE DATABASE miguelxavier_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Execute as migrations e seeders

```bash
# Criar tabelas
php artisan migrate

# Popular com dados de exemplo
php artisan db:seed
```

### 7. Configure o storage para upload de imagens

```bash
# Cria link simbólico de storage/app/public para public/storage
php artisan storage:link
```

### 8. Inicie o servidor

```bash
php artisan serve
```

A API estará disponível em: `http://localhost:8000`

## 📚 Estrutura do Banco de Dados

### Tabelas

- **users** - Usuários admin
- **theme** - Cores e tema do site
- **hero_section** - Seção principal (hero)
- **about_section** - Seção sobre o escritório
- **services** - Serviços jurídicos
- **team_members** - Membros da equipe
- **testimonials** - Depoimentos de clientes
- **footer_content** - Conteúdo do rodapé
- **contact_messages** - Mensagens do formulário de contato

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação.

### Credenciais padrão (após seeder)

```
Email: admin@miguelxavier.adv.br
Senha: password123
```

**⚠️ IMPORTANTE:** Altere essas credenciais em produção!

## 📡 Endpoints da API

### Públicos (sem autenticação)

#### Conteúdo do Site

```http
GET /api/content              # Retorna todo o conteúdo
GET /api/content/theme        # Retorna tema (cores)
GET /api/content/hero         # Retorna seção hero
GET /api/content/about        # Retorna seção about
GET /api/content/services     # Retorna serviços
GET /api/content/team         # Retorna equipe
GET /api/content/testimonials # Retorna depoimentos
GET /api/content/footer       # Retorna rodapé
```

#### Formulário de Contato

```http
POST /api/contact
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 99999-9999",
  "area_interesse": "Direito Civil",
  "subject": "Consulta",
  "message": "Gostaria de agendar uma consulta..."
}
```

### Autenticação

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@miguelxavier.adv.br",
  "password": "password123"
}

# Resposta
{
  "success": true,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@miguelxavier.adv.br"
  }
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

#### Refresh Token

```http
POST /api/auth/refresh
Authorization: Bearer {token}
```

#### Dados do Usuário

```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Admin (requer autenticação)

```http
# Todas as rotas admin requerem o header:
Authorization: Bearer {seu_token_jwt}
```

#### Upload de Imagens

```http
POST /api/admin/upload/image
Authorization: Bearer {token}
Content-Type: multipart/form-data

# Form Data:
image: [arquivo de imagem]
folder: "team" | "hero" | "about" | "general" (opcional)

# Resposta:
{
  "success": true,
  "message": "Imagem enviada com sucesso",
  "data": {
    "filename": "1234567890_abc123.jpg",
    "path": "images/team/1234567890_abc123.jpg",
    "url": "/storage/images/team/1234567890_abc123.jpg",
    "fullUrl": "http://localhost:8000/storage/images/team/1234567890_abc123.jpg"
  }
}
```

```http
DELETE /api/admin/upload/image
Authorization: Bearer {token}
Content-Type: application/json

{
  "path": "/storage/images/team/1234567890_abc123.jpg"
}
```

```http
GET /api/admin/upload/images?folder=team
Authorization: Bearer {token}

# Lista todas as imagens de uma pasta
```

#### Outras Rotas Admin

Rotas admin para edição de conteúdo (Theme, Hero, About, Services, Team, Testimonials, Footer, Contact Messages).

## 🧪 Testando a API

### Usando cURL

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@miguelxavier.adv.br","password":"password123"}'

# Buscar conteúdo
curl http://localhost:8000/api/content/theme

# Enviar mensagem de contato
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@test.com","message":"Mensagem de teste"}'
```

### Usando Postman

1. Importe a collection (se disponível)
2. Configure a variável `base_url` como `http://localhost:8000`
3. Faça login e copie o token
4. Use o token nas requisições protegidas

## 📧 Configuração de Email

Para enviar emails reais, configure o SMTP no `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu_email@gmail.com
MAIL_PASSWORD=sua_senha_app
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contato@miguelxavier.adv.br
MAIL_FROM_NAME="Miguel & Xavier"
```

**Gmail:** Use uma "Senha de App" em vez da senha normal.

## 🔄 CORS

O CORS está configurado para aceitar requisições do frontend.

Configure a URL do frontend no `.env`:

```env
FRONTEND_URL=http://localhost:3000
```

## 🛠️ Comandos Úteis

```bash
# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Ver rotas
php artisan route:list

# Resetar banco (CUIDADO: apaga tudo!)
php artisan migrate:fresh --seed

# Criar migration
php artisan make:migration create_table_name

# Criar model
php artisan make:model ModelName

# Criar controller
php artisan make:controller ControllerName

# Criar seeder
php artisan make:seeder SeederName
```

## 📁 Estrutura de Pastas

```
back/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── AuthController.php
│   │       ├── PublicContentController.php
│   │       └── ContactController.php
│   └── Models/
│       ├── User.php
│       ├── Theme.php
│       ├── Service.php
│       └── ...
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
├── config/
│   ├── auth.php
│   └── jwt.php
└── .env
```

## 🚀 Deploy

### Preparação

```bash
# Otimizar para produção
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Variáveis de Ambiente

No servidor de produção, configure:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.miguelxavier.adv.br
FRONTEND_URL=https://miguelxavier.adv.br
```

## 🐛 Troubleshooting

### Erro de permissão

```bash
chmod -R 775 storage bootstrap/cache
```

### JWT Secret não configurado

```bash
php artisan jwt:secret
```

### Erro de conexão com banco

- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Teste a conexão: `php artisan migrate:status`

## 📝 Licença

Propriedade de Miguel & Xavier Advocacia.

## 👥 Contato

- **Email:** contato@miguelxavier.adv.br
- **Website:** https://miguelxavier.adv.br

---

Desenvolvido com ❤️ para Miguel & Xavier Advocacia
