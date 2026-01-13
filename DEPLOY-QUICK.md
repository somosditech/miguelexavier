# Deploy Rápido - Miguel & Xavier

## 🚀 Build do Front-end

### Opção 1: Script Automático (Windows)

```bash
# Clique duas vezes no arquivo:
build-frontend.bat
```

### Opção 2: Manual

```bash
cd front
npm install
npm run build
```

Arquivos gerados em: `front/dist/`

---

## 📤 Upload via FTP

### Dados de Acesso (fornecidos pela Locaweb)

- **Host:** ftp.seudominio.com.br
- **Usuário:** seu_usuario
- **Senha:** sua_senha
- **Porta:** 21

### Front-end

```
Local:  front/dist/*
Remoto: /public_html/
```

### Back-end

```
Local:  back/*
Remoto: /public_html/api/
```

**Não enviar:**
- node_modules/
- .git/
- tests/
- vendor/ (será instalado no servidor)

---

## ⚙️ Configuração no Servidor

### Via SSH (se disponível)

```bash
# Conectar
ssh seu_usuario@seudominio.com.br

# Ir para pasta da API
cd public_html/api

# Instalar dependências
composer install --optimize-autoloader --no-dev

# Gerar chaves
php artisan key:generate
php artisan jwt:secret

# Rodar migrations
php artisan migrate --force
php artisan db:seed --force

# Link do storage
php artisan storage:link

# Permissões
chmod -R 775 storage bootstrap/cache
```

### Via Painel (se não tiver SSH)

1. Acesse o painel da Locaweb
2. Terminal / SSH
3. Execute os comandos acima

---

## ✅ Checklist Rápido

- [ ] Build do front (`npm run build`)
- [ ] Upload front para `/public_html/`
- [ ] Upload back para `/public_html/api/`
- [ ] Configurar `.env` no servidor
- [ ] Rodar `composer install`
- [ ] Rodar `php artisan key:generate`
- [ ] Rodar `php artisan jwt:secret`
- [ ] Rodar `php artisan migrate --force`
- [ ] Rodar `php artisan storage:link`
- [ ] Testar: https://seudominio.com.br

---

## 🧪 Testes

```bash
# API
https://seudominio.com.br/api/content

# Front-end
https://seudominio.com.br
```

---

Para mais detalhes, veja: **DEPLOY-LOCAWEB.md**
