# Documentação de Segurança - Proteção Contra DDoS

## 🛡️ Proteções Implementadas

Este documento descreve todas as camadas de segurança implementadas para proteger a API e o formulário de contato contra ataques DDoS e spam.

---

## 1. Rate Limiting da API

### Limites Configurados

| Endpoint | Limite | Período | Descrição |
|----------|--------|---------|-----------|
| **Conteúdo Público** (`/api/content/*`) | 60 requisições | 1 minuto | Conteúdo do site (hero, about, services, etc) |
| **Autenticação** (`/api/auth/login`) | 5 tentativas | 1 minuto | Login e recuperação de senha |
| **Formulário de Contato** (`/api/contact`) | 3 envios | 60 minutos | Envio de mensagens |
| **Rotas Admin** (`/api/admin/*`) | 100 requisições | 1 minuto | Todas as rotas administrativas |

### Como Funciona

- **Identificação por IP**: Cada IP é rastreado individualmente
- **Headers de Resposta**: Retorna `X-RateLimit-Limit` e `X-RateLimit-Remaining`
- **Erro 429**: Quando o limite é excedido, retorna HTTP 429 (Too Many Requests)
- **Reset Automático**: Os contadores resetam automaticamente após o período

### Arquivo Implementado

- [`CustomThrottle.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/app/Http/Middleware/CustomThrottle.php) - Middleware de rate limiting

---

## 2. Proteção do Formulário de Contato

### Dupla Camada de Proteção

#### 2.1 Rate Limiting por IP
- **Limite**: 3 envios por hora por IP
- **Implementação**: Service class `ContactRateLimiter`
- **Storage**: Cache do Laravel (Redis/File)

#### 2.2 Honeypot
- **Campo invisível**: `website`
- **Detecção de bots**: Se preenchido, bloqueia silenciosamente
- **Log de tentativas**: Registra IPs suspeitos

### Arquivos Implementados

- [`ContactRateLimiter.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/app/Services/ContactRateLimiter.php) - Service de rate limiting
- [`HoneypotMiddleware.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/app/Http/Middleware/HoneypotMiddleware.php) - Middleware honeypot
- [`ContactController.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/app/Http/Controllers/ContactController.php) - Controller atualizado

### Como Adicionar Honeypot no Frontend

No seu formulário React, adicione um campo invisível:

```jsx
{/* Campo honeypot - invisível para usuários, visível para bots */}
<input
  type="text"
  name="website"
  value={formData.website || ''}
  onChange={(e) => setFormData({...formData, website: e.target.value})}
  style={{ display: 'none' }}
  tabIndex="-1"
  autoComplete="off"
/>
```

---

## 3. Headers de Segurança

### Headers Implementados

| Header | Valor | Proteção |
|--------|-------|----------|
| `X-Frame-Options` | `SAMEORIGIN` | Previne clickjacking |
| `X-Content-Type-Options` | `nosniff` | Previne MIME type sniffing |
| `X-XSS-Protection` | `1; mode=block` | Ativa proteção XSS do navegador |
| `Strict-Transport-Security` | `max-age=31536000` | Força HTTPS (produção) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controla informações de referrer |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Bloqueia APIs sensíveis |
| `Content-Security-Policy` | Ver arquivo | Previne XSS e injeção de código |

### Arquivo Implementado

- [`SecurityHeadersMiddleware.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/app/Http/Middleware/SecurityHeadersMiddleware.php) - Middleware de headers

---

## 4. Configuração

### Bootstrap da Aplicação

Os middlewares foram registrados em [`app.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/bootstrap/app.php):

```php
->withMiddleware(function (Middleware $middleware): void {
    // CORS
    $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
    
    // Segurança
    $middleware->append(\App\Http\Middleware\SecurityHeadersMiddleware::class);
    
    // Aliases
    $middleware->alias([
        'throttle.custom' => \App\Http\Middleware\CustomThrottle::class,
        'honeypot' => \App\Http\Middleware\HoneypotMiddleware::class,
    ]);
})
```

### Rotas da API

As proteções foram aplicadas em [`api.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/routes/api.php):

```php
// Conteúdo público (60 req/min)
Route::prefix('content')->middleware('throttle.custom:60,1')->group(function () {
    // ...
});

// Formulário de contato (3 envios/hora + honeypot)
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware(['honeypot', 'throttle.custom:3,60']);

// Login (5 tentativas/min)
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle.custom:5,1');

// Admin (100 req/min)
Route::middleware(['auth:api', 'throttle.custom:100,1'])->prefix('admin')->group(function () {
    // ...
});
```

---

## 5. Testando as Proteções

### Testar Rate Limiting da API

```bash
# Fazer múltiplas requisições rápidas
for ($i=1; $i -le 70; $i++) { 
    Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/content" 
}
```

Após 60 requisições, você deve receber erro 429.

### Testar Proteção do Formulário

```bash
# Enviar múltiplos formulários
for ($i=1; $i -le 5; $i++) {
    Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/contact" `
        -Method POST `
        -ContentType "application/json" `
        -Body '{"name":"Test","email":"test@test.com","message":"Test"}'
}
```

Após 3 envios, você deve receber erro 429.

### Testar Honeypot

Envie um formulário com o campo `website` preenchido:

```bash
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/contact" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{"name":"Bot","email":"bot@bot.com","message":"Spam","website":"http://spam.com"}'
```

Deve retornar sucesso, mas não salvar a mensagem.

---

## 6. Ajustando os Limites

Para ajustar os limites, edite os valores nos middlewares em [`api.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/routes/api.php):

```php
// Sintaxe: throttle.custom:LIMITE,MINUTOS
->middleware('throttle.custom:60,1')  // 60 requisições por 1 minuto
->middleware('throttle.custom:3,60')  // 3 requisições por 60 minutos
```

Para ajustar o limite do formulário de contato, edite [`ContactRateLimiter.php`](file:///c:/Users/diogo/Desktop/projetos/ProjetoDavid/miguelexavier/miguelexavier/app/Services/ContactRateLimiter.php):

```php
protected int $maxAttempts = 3;      // Número de envios permitidos
protected int $decayMinutes = 60;    // Período em minutos
```

---

## 7. Monitoramento

### Logs de Honeypot

Os bots detectados são registrados em `storage/logs/laravel.log`:

```
[2026-02-05 15:00:00] local.WARNING: Honeypot detectou bot {"ip":"192.168.1.1","user_agent":"Bot/1.0","honeypot_value":"http://spam.com"}
```

### Verificar Rate Limiting

Você pode verificar os headers de resposta:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
```

---

## 8. Proteções Adicionais Recomendadas

### Para Produção

1. **Cloudflare**: Adicione proteção DDoS no nível de DNS
2. **Fail2Ban**: Bloqueie IPs maliciosos automaticamente no servidor
3. **WAF (Web Application Firewall)**: Proteção adicional contra ataques
4. **Redis**: Use Redis para cache em vez de file cache (melhor performance)

### Configurar Redis (Opcional)

No `.env`:

```env
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

---

## 9. Arquivos Criados/Modificados

### Novos Arquivos

- ✅ `app/Http/Middleware/CustomThrottle.php`
- ✅ `app/Http/Middleware/HoneypotMiddleware.php`
- ✅ `app/Http/Middleware/SecurityHeadersMiddleware.php`
- ✅ `app/Services/ContactRateLimiter.php`

### Arquivos Modificados

- ✅ `bootstrap/app.php` - Registro dos middlewares
- ✅ `routes/api.php` - Aplicação dos middlewares nas rotas
- ✅ `app/Http/Controllers/ContactController.php` - Integração do rate limiter

---

## 10. Resumo

✅ **Rate Limiting da API**: 60 req/min para conteúdo público
✅ **Rate Limiting de Login**: 5 tentativas/min
✅ **Proteção do Formulário**: 3 envios/hora por IP
✅ **Honeypot**: Detecta e bloqueia bots silenciosamente
✅ **Headers de Segurança**: CSP, X-Frame-Options, HSTS, etc
✅ **Rate Limiting Admin**: 100 req/min

Todas as proteções estão ativas e funcionando! 🎉
