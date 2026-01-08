# Especificação da API - Miguel & Xavier

Documentação dos endpoints que devem ser implementados no back-end.

## Base URL

```
https://api.miguelxavier.adv.br/api
```

## Autenticação

Para endpoints administrativos (futuros), usar JWT:
```
Authorization: Bearer {token}
```

---

## 📊 Endpoints de Conteúdo

### GET /theme

Retorna as cores do tema do site.

**Response:**
```json
{
  "primary": "#1a365d",
  "secondary": "#c49b63",
  "accent": "#2c5282",
  "background": "#ffffff",
  "backgroundDark": "#0f1419",
  "textPrimary": "#1a202c",
  "textSecondary": "#4a5568",
  "textLight": "#ffffff",
  "success": "#38a169",
  "error": "#e53e3e",
  "warning": "#dd6b20"
}
```

---

### GET /content/header

Retorna conteúdo do cabeçalho.

**Response:**
```json
{
  "logo": {
    "text": "Miguel & Xavier",
    "subtitle": "Advocacia"
  },
  "navigation": [
    { "id": "inicio", "label": "Início", "href": "#hero" },
    { "id": "sobre", "label": "Sobre", "href": "#about" }
  ],
  "ctaButton": {
    "text": "Consulta Gratuita",
    "href": "#contact"
  }
}
```

---

### GET /content/hero

Retorna conteúdo da seção principal.

**Response:**
```json
{
  "title": "Excelência Jurídica ao Seu Alcance",
  "subtitle": "Mais de 20 anos de experiência...",
  "description": "Escritório de advocacia...",
  "ctaButtons": [
    { "text": "Fale com um Advogado", "href": "#contact", "primary": true }
  ],
  "backgroundImage": "https://..."
}
```

---

### GET /content/about

Retorna conteúdo da seção sobre.

**Response:**
```json
{
  "title": "Sobre o Escritório",
  "subtitle": "Tradição e Modernidade",
  "description": "O escritório Miguel & Xavier...",
  "highlights": [
    {
      "id": 1,
      "icon": "⚖️",
      "title": "+20 Anos",
      "description": "De experiência..."
    }
  ],
  "image": "https://..."
}
```

---

### GET /content/services

Retorna lista de serviços/áreas de atuação.

**Response:**
```json
{
  "title": "Áreas de Atuação",
  "subtitle": "Soluções Jurídicas Completas",
  "services": [
    {
      "id": 1,
      "icon": "👔",
      "title": "Direito Empresarial",
      "description": "Consultoria jurídica...",
      "features": ["Contratos", "Societário", "Compliance"]
    }
  ]
}
```

---

### GET /content/team

Retorna informações da equipe.

**Response:**
```json
{
  "title": "Nossa Equipe",
  "subtitle": "Profissionais Especializados",
  "members": [
    {
      "id": 1,
      "name": "Dr. Miguel Santos",
      "role": "Sócio Fundador",
      "specialization": "Direito Empresarial e Civil",
      "oab": "OAB/SP 123.456",
      "description": "Mais de 15 anos...",
      "image": "https://...",
      "social": {
        "linkedin": "https://...",
        "email": "miguel@miguelxavier.adv.br"
      }
    }
  ]
}
```

---

### GET /content/footer

Retorna conteúdo do rodapé.

**Response:**
```json
{
  "about": {
    "title": "Miguel & Xavier",
    "description": "Escritório de advocacia..."
  },
  "contact": {
    "title": "Contato",
    "address": "Av. Paulista, 1000...",
    "phone": "(11) 3000-0000",
    "email": "contato@miguelxavier.adv.br",
    "hours": "Seg - Sex: 9h às 18h"
  },
  "social": {
    "title": "Redes Sociais",
    "links": [
      { "platform": "LinkedIn", "url": "#", "icon": "linkedin" }
    ]
  },
  "legal": {
    "copyright": "© 2026 Miguel & Xavier...",
    "links": [
      { "text": "Política de Privacidade", "url": "#" }
    ]
  }
}
```

---

## 📧 Endpoints de Funcionalidades

### POST /contact

Recebe formulário de contato.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "subject": "Consulta sobre divórcio",
  "message": "Gostaria de agendar uma consulta..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Erro ao enviar mensagem.",
  "error": "Detalhes do erro..."
}
```

**Ações do servidor:**
1. Validar dados recebidos
2. Enviar email para o escritório
3. Salvar no banco de dados (opcional)
4. Retornar confirmação

---

### POST /ai/analyze

Processa análise de caso com IA.

**Request Body:**
```json
{
  "message": "Fui demitido sem justa causa e não recebi minhas verbas rescisórias..."
}
```

**Response:**
```json
{
  "response": "Sua questão parece estar relacionada ao Direito Trabalhista...",
  "timestamp": "2026-01-07T15:00:00Z"
}
```

**Ações do servidor:**
1. Receber mensagem do usuário
2. Enviar para API de IA (OpenAI, etc.)
3. Processar resposta
4. Retornar ao front-end

---

### GET /ai/config

Retorna configurações do chat IA.

**Response:**
```json
{
  "title": "Análise Preliminar com IA",
  "subtitle": "Descreva seu caso...",
  "placeholder": "Descreva brevemente sua situação jurídica...",
  "disclaimer": "Esta é uma análise preliminar automatizada..."
}
```

---

## 🔒 Validações

### Formulário de Contato
- `name`: obrigatório, mínimo 3 caracteres
- `email`: obrigatório, formato válido
- `phone`: opcional, formato válido se preenchido
- `subject`: opcional
- `message`: obrigatório, mínimo 10 caracteres

### Chat IA
- `message`: obrigatório, mínimo 10 caracteres, máximo 1000 caracteres

---

## 📝 Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autorizado
- `404` - Não encontrado
- `500` - Erro interno do servidor

---

## 🔄 CORS

Configurar CORS para aceitar requisições de:
- `http://localhost:3000` (desenvolvimento)
- `https://miguelxavier.adv.br` (produção)

---

## 📊 Rate Limiting

Implementar rate limiting para prevenir abuso:
- Formulário de contato: máximo 5 envios por hora por IP
- Chat IA: máximo 20 mensagens por hora por IP

---

## 🗄️ Banco de Dados

### Tabela: contacts
```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('new', 'read', 'replied') DEFAULT 'new'
);
```

### Tabela: ai_conversations
```sql
CREATE TABLE ai_conversations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45)
);
```

---

## 📧 Template de Email

Quando receber um formulário de contato, enviar email com:

**Assunto:** Novo contato do site - [Assunto]

**Corpo:**
```
Novo contato recebido através do site:

Nome: [nome]
Email: [email]
Telefone: [telefone]
Assunto: [assunto]

Mensagem:
[mensagem]

---
Recebido em: [data/hora]
```

---

## 🚀 Deploy

Sugestões de plataformas:
- **Heroku** - Fácil deploy
- **AWS** - Escalável
- **DigitalOcean** - Custo-benefício
- **Vercel** - Integração com Next.js (se usar)

---

## 📞 Suporte

Para dúvidas sobre esta especificação, consulte o desenvolvedor front-end.
