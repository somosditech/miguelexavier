# Back-end - Miguel & Xavier

Esta pasta está preparada para o desenvolvimento futuro da API do site.

## 📋 Estrutura Planejada

Quando desenvolver a API, sugerimos a seguinte estrutura:

```
back/
├── src/
│   ├── controllers/     # Controladores (lógica de negócio)
│   ├── models/          # Modelos de dados
│   ├── routes/          # Rotas da API
│   ├── services/        # Serviços auxiliares
│   ├── middleware/      # Middlewares
│   └── config/          # Configurações
├── .env                 # Variáveis de ambiente
├── package.json         # Dependências
└── server.js            # Arquivo principal
```

## 🔌 Endpoints Necessários

O front-end espera os seguintes endpoints (veja detalhes em `api-spec.md`):

### Conteúdo do Site
- `GET /api/theme` - Retorna cores do tema
- `GET /api/content/header` - Retorna conteúdo do cabeçalho
- `GET /api/content/hero` - Retorna conteúdo da seção hero
- `GET /api/content/about` - Retorna conteúdo da seção sobre
- `GET /api/content/services` - Retorna serviços
- `GET /api/content/team` - Retorna equipe
- `GET /api/content/footer` - Retorna rodapé

### Funcionalidades
- `POST /api/contact` - Recebe formulário de contato
- `POST /api/ai/analyze` - Processa análise de caso com IA
- `GET /api/ai/config` - Retorna configurações do chat IA

## 🛠️ Tecnologias Sugeridas

- **Node.js** com **Express** - Framework web
- **MongoDB** ou **PostgreSQL** - Banco de dados
- **Mongoose** ou **Sequelize** - ORM
- **JWT** - Autenticação (para painel admin)
- **Nodemailer** - Envio de emails
- **OpenAI API** ou similar - Para o chat IA

## 📝 Próximos Passos

1. Escolher stack de tecnologias
2. Configurar banco de dados
3. Implementar endpoints de conteúdo
4. Implementar envio de emails (formulário de contato)
5. Integrar API de IA para análise de casos
6. Criar painel administrativo (opcional)
7. Implementar autenticação e autorização
8. Configurar CORS para aceitar requisições do front-end
9. Deploy da API

## 🔐 Segurança

Lembre-se de:
- Usar variáveis de ambiente para dados sensíveis
- Implementar rate limiting
- Validar todos os inputs
- Sanitizar dados antes de salvar no banco
- Usar HTTPS em produção
- Implementar CORS adequadamente

## 📧 Envio de Emails

Para o formulário de contato funcionar, você precisará:

1. Configurar um serviço de email (Gmail, SendGrid, etc.)
2. Implementar o endpoint `POST /api/contact`
3. Enviar email para o escritório com os dados do formulário
4. Retornar confirmação de sucesso

## 🤖 Integração com IA

Para o chat IA funcionar:

1. Escolher um provedor de IA (OpenAI, Google AI, etc.)
2. Implementar o endpoint `POST /api/ai/analyze`
3. Processar a mensagem do usuário
4. Retornar resposta da IA

Exemplo de resposta esperada:
```json
{
  "response": "Texto da resposta da IA...",
  "timestamp": "2026-01-07T15:00:00Z"
}
```

## 📞 Contato

Para dúvidas sobre a integração front-end/back-end, consulte a documentação do front-end em `../front/README.md`.
