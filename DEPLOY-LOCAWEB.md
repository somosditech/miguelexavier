# Deploy na Locaweb - Miguel & Xavier Advocacia

## 📋 Pré-requisitos

- [ ] Conta na Locaweb contratada
- [ ] Acesso ao painel de controle
- [ ] Domínio configurado (ex: miguelxavier.adv.br)
- [ ] Cliente FTP instalado (FileZilla recomendado)

---

## 🗂️ Estrutura no Servidor

```
public_html/
├── .htaccess                    # Redirecionamento
├── index.html                   # Front-end React (build)
├── assets/                      # CSS, JS, imagens do React
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
│
└── api/                         # Back-end Laravel
    ├── public/                  # Ponto de entrada da API
    │   └── index.php
    ├── app/
    ├── bootstrap/
    ├── config/
    ├── database/
    ├── routes/
    ├── storage/
    ├── vendor/
    ├── .env                     # Configurações (criar no servidor)
    └── ...
```

---

## 🚀 Passo a Passo - Deploy

### PARTE 1: Preparar Front-end

#### 1.1. Build do React

```bash
# No seu computador, dentro da pasta front/
cd c:\Users\giovane.salvi\Desktop\miguelexavier\front

# Instalar dependências (se ainda não instalou)
npm install

# Criar build de produção
npm run build
```

Isso criará a pasta `dist/` com os arquivos otimizados.

#### 1.2. Configurar URL da API

Antes do build, edite o arquivo `.env` na pasta `front/`:

```env
# front/.env
VITE_API_URL=https://seudominio.com.br/api
```

**Importante:** Substitua `seudominio.com.br` pelo seu domínio real.

---

### PARTE 2: Preparar Back-end

#### 2.1. Instalar Dependências Localmente

```bash
# No seu computador, dentro da pasta back/
cd c:\Users\giovane.salvi\Desktop\miguelexavier\back

# Instalar dependências do Composer
composer install --optimize-autoloader --no-dev
```

**Nota:** Se não tiver Composer instalado, pule esta etapa. Você pode rodar no servidor via SSH.

#### 2.2. Criar arquivo .env para produção

Copie o `.env.example` e renomeie para `.env.production`:

```bash
copy .env.example .env.production
```

Edite `.env.production` com as configurações do servidor:

```env
APP_NAME="Miguel & Xavier API"
APP_ENV=production
APP_KEY=                              # Será gerado no servidor
APP_DEBUG=false
APP_URL=https://seudominio.com.br/api

# Database (fornecido pela Locaweb)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=seu_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=                           # Será gerado no servidor
JWT_TTL=60

# Frontend URL (para CORS)
FRONTEND_URL=https://seudominio.com.br

# Mail (configurar depois)
MAIL_MAILER=smtp
MAIL_HOST=smtp.seudominio.com.br
MAIL_PORT=587
MAIL_USERNAME=contato@seudominio.com.br
MAIL_PASSWORD=sua_senha_email
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contato@seudominio.com.br
MAIL_FROM_NAME="Miguel & Xavier"
```

---

### PARTE 3: Upload via FTP

#### 3.1. Conectar ao FTP

**Dados de acesso** (fornecidos pela Locaweb):
- Host: ftp.seudominio.com.br
- Usuário: seu_usuario
- Senha: sua_senha
- Porta: 21

**No FileZilla:**
1. Arquivo → Gerenciador de Sites
2. Novo Site
3. Preencher dados
4. Conectar

#### 3.2. Upload do Front-end

```
Local: c:\Users\giovane.salvi\Desktop\miguelexavier\front\dist\*
Remoto: /public_html/

Arquivos a enviar:
✅ index.html
✅ pasta assets/
✅ pasta fonts/ (se houver)
✅ favicon.ico
```

**Tempo estimado:** 2-5 minutos

#### 3.3. Upload do Back-end

```
Local: c:\Users\giovane.salvi\Desktop\miguelexavier\back\*
Remoto: /public_html/api/

Pastas/arquivos a enviar:
✅ app/
✅ bootstrap/
✅ config/
✅ database/
✅ public/
✅ resources/
✅ routes/
✅ storage/
✅ vendor/ (se instalou localmente)
✅ .env.production (renomear para .env no servidor)
✅ artisan
✅ composer.json
✅ composer.lock

❌ NÃO enviar:
- node_modules/
- .git/
- tests/
- .env.example
```

**Tempo estimado:** 10-20 minutos (depende da conexão)

---

### PARTE 4: Configuração no Servidor

#### 4.1. Acessar via SSH (se disponível)

```bash
ssh seu_usuario@seudominio.com.br
```

Se a Locaweb não oferecer SSH, use o Terminal do painel de controle.

#### 4.2. Gerar chaves do Laravel

```bash
cd public_html/api

# Gerar APP_KEY
php artisan key:generate

# Gerar JWT_SECRET
php artisan jwt:secret
```

#### 4.3. Rodar Migrations

```bash
cd public_html/api

# Criar tabelas
php artisan migrate --force

# Popular com dados
php artisan db:seed --force
```

#### 4.4. Criar link do storage

```bash
cd public_html/api
php artisan storage:link
```

#### 4.5. Configurar permissões

```bash
chmod -R 775 storage bootstrap/cache
```

---

### PARTE 5: Configurar .htaccess

#### 5.1. Front-end (.htaccess na raiz)

Criar arquivo `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Redirecionar HTTP para HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # Se a requisição for para /api, não fazer nada
    RewriteCond %{REQUEST_URI} ^/api
    RewriteRule ^ - [L]

    # Para o React Router - redirecionar tudo para index.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [L]
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache de arquivos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>
```

#### 5.2. Back-end (.htaccess em api/public)

Criar arquivo `public_html/api/public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

---

## ✅ Checklist Final

### Antes de ir ao ar:

- [ ] Build do front-end criado (`npm run build`)
- [ ] URL da API configurada no front-end
- [ ] Dependências do back-end instaladas
- [ ] Arquivo `.env` configurado no servidor
- [ ] Migrations rodadas
- [ ] Storage link criado
- [ ] Permissões configuradas (775)
- [ ] .htaccess criados (front e back)
- [ ] SSL/HTTPS ativado no painel Locaweb
- [ ] Testar API: `https://seudominio.com.br/api/content`
- [ ] Testar front-end: `https://seudominio.com.br`

---

## 🧪 Testes

### 1. Testar API

```bash
# No navegador ou Postman
GET https://seudominio.com.br/api/content

# Deve retornar JSON com success: true
```

### 2. Testar Front-end

```
https://seudominio.com.br

# Deve carregar o site
# Verificar console do navegador (F12) para erros
```

### 3. Testar Formulário de Contato

```
Preencher formulário → Enviar
Verificar se salva no banco
```

---

## 🐛 Troubleshooting

### Erro 500 no back-end

```bash
# Ver logs
tail -f storage/logs/laravel.log

# Verificar permissões
chmod -R 775 storage bootstrap/cache
```

### Front-end não carrega

```
1. Verificar .htaccess na raiz
2. Verificar se index.html existe
3. Verificar console do navegador (F12)
```

### API não responde

```
1. Verificar .env (DB_*, APP_KEY, JWT_SECRET)
2. Verificar .htaccess em api/public/
3. Testar: https://seudominio.com.br/api/public/index.php
```

### CORS Error

```
Verificar FRONTEND_URL no .env do back-end
Deve ser: https://seudominio.com.br (sem barra no final)
```

---

## 📞 Suporte Locaweb

- **Telefone:** 0800 000 0000
- **Chat:** painel.locaweb.com.br
- **Email:** suporte@locaweb.com.br

**Perguntas comuns para o suporte:**
- Como acessar via SSH?
- Como configurar banco de dados MySQL?
- Como ativar SSL/HTTPS?
- Qual versão do PHP está disponível?

---

## 🔄 Atualizações Futuras

### Para atualizar o site:

**Front-end:**
```bash
cd front/
npm run build
# Upload dist/ via FTP (sobrescrever)
```

**Back-end:**
```bash
# Upload arquivos modificados via FTP
# Se mudou banco:
ssh servidor
cd public_html/api
php artisan migrate --force
```

---

## 💰 Custos Estimados

- **Locaweb Hospedagem:** R$ 30-50/mês
- **Domínio .adv.br:** R$ 40/ano
- **SSL:** Grátis (Let's Encrypt via Locaweb)

**Total:** ~R$ 40/mês

---

## 📝 Próximos Passos

1. ✅ Contratar Locaweb
2. ✅ Configurar domínio
3. ✅ Seguir este guia
4. ✅ Site no ar!

**Tempo estimado total:** 2-3 horas (primeira vez)

---

Dúvidas? Consulte a documentação da Locaweb ou entre em contato com o suporte deles!
