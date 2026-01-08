# Miguel & Xavier - Escritório de Advocacia

Site institucional moderno e responsivo para o escritório de advocacia Miguel & Xavier, desenvolvido em React com integração preparada para API futura.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **Axios** - Cliente HTTP para chamadas à API
- **CSS3** - Estilização com variáveis CSS e design responsivo

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (vem junto com o Node.js)

Para verificar se estão instalados, execute:
```bash
node --version
npm --version
```

## 🔧 Instalação

1. **Navegue até a pasta do projeto:**
```bash
cd front
```

2. **Instale as dependências:**
```bash
npm install
```

Isso irá instalar todas as bibliotecas necessárias listadas no `package.json`.

## ▶️ Como Executar

### Modo Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em: `http://localhost:3000`

O servidor tem **hot-reload**, ou seja, qualquer alteração que você fizer nos arquivos será refletida automaticamente no navegador.

### Modo Produção

Para criar a versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar a versão de produção localmente:

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
front/
├── public/              # Arquivos públicos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── Header.jsx   # Cabeçalho do site
│   │   ├── Hero.jsx     # Seção principal
│   │   ├── About.jsx    # Seção sobre
│   │   ├── Services.jsx # Seção serviços
│   │   ├── Team.jsx     # Seção equipe
│   │   ├── ContactForm.jsx # Formulário de contato
│   │   ├── AIChat.jsx   # Chat com IA
│   │   └── Footer.jsx   # Rodapé
│   ├── hooks/           # Hooks customizados
│   │   ├── useTheme.js  # Gerencia tema/cores
│   │   └── useContent.js # Gerencia conteúdo
│   ├── services/        # Serviços de API
│   │   ├── api.js       # Funções de API
│   │   └── mockData.js  # Dados mockados
│   ├── styles/          # Estilos globais
│   │   └── index.css    # CSS global
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Ponto de entrada
├── index.html           # HTML principal
├── package.json         # Dependências
└── vite.config.js       # Configuração do Vite
```

## 🎨 Customização

### Alterando Cores

As cores do site são gerenciadas dinamicamente. Por enquanto, estão definidas em `src/services/mockData.js`:

```javascript
export const mockTheme = {
  primary: '#1a365d',      // Azul escuro principal
  secondary: '#c49b63',    // Dourado
  accent: '#2c5282',       // Azul médio
  // ... outras cores
};
```

**Para alterar as cores:**
1. Abra `src/services/mockData.js`
2. Localize `mockTheme`
3. Altere os valores hexadecimais das cores
4. Salve o arquivo (o site atualizará automaticamente)

### Alterando Textos

Todos os textos estão em `src/services/mockData.js`. Cada seção tem seu próprio objeto:

- `mockHeader` - Textos do cabeçalho
- `mockHero` - Textos da seção principal
- `mockAbout` - Textos da seção sobre
- `mockServices` - Textos dos serviços
- `mockTeam` - Informações da equipe
- `mockFooter` - Textos do rodapé
- `mockAIChat` - Configurações do chat IA

**Para alterar textos:**
1. Abra `src/services/mockData.js`
2. Localize o objeto da seção que deseja alterar
3. Modifique os textos
4. Salve o arquivo

### Alterando Imagens

As imagens também estão definidas em `src/services/mockData.js`:

```javascript
backgroundImage: 'https://images.unsplash.com/...'
```

**Para usar suas próprias imagens:**
1. Coloque as imagens na pasta `public/images/`
2. Em `mockData.js`, altere a URL para: `/images/sua-imagem.jpg`
3. Salve o arquivo

### Adicionando Novos Serviços

Para adicionar um novo serviço à seção de áreas de atuação:

1. Abra `src/services/mockData.js`
2. Localize `mockServices.services`
3. Adicione um novo objeto ao array:

```javascript
{
  id: 7, // Próximo ID disponível
  icon: '📋', // Emoji ou ícone
  title: 'Nome do Serviço',
  description: 'Descrição do serviço...',
  features: ['Feature 1', 'Feature 2', 'Feature 3']
}
```

### Adicionando Membros da Equipe

Para adicionar um novo advogado:

1. Abra `src/services/mockData.js`
2. Localize `mockTeam.members`
3. Adicione um novo objeto ao array:

```javascript
{
  id: 5, // Próximo ID disponível
  name: 'Dr. Nome Sobrenome',
  role: 'Cargo',
  specialization: 'Especialização',
  oab: 'OAB/XX 000.000',
  description: 'Descrição...',
  image: '/images/foto-advogado.jpg',
  social: {
    linkedin: 'https://linkedin.com/...',
    email: 'email@miguelxavier.adv.br'
  }
}
```

## 🔌 Integração com API

Atualmente, o site usa dados mockados (simulados). Quando a API estiver pronta:

1. **Configure a URL base da API:**
   - Abra `src/services/api.js`
   - Descomente e configure a seção do axios:
   ```javascript
   const api = axios.create({
     baseURL: 'https://sua-api.com/api',
     timeout: 10000
   });
   ```

2. **Substitua as funções mockadas:**
   - Em cada função (`fetchTheme`, `fetchHeader`, etc.)
   - Comente a versão mockada
   - Descomente a versão real
   - Exemplo:
   ```javascript
   export const fetchTheme = async () => {
     // Comente ou remova a versão mockada
     // return new Promise((resolve) => {...});
     
     // Descomente a versão real
     const response = await api.get('/theme');
     return response.data;
   };
   ```

3. **Endpoints esperados pela API:**
   - `GET /api/theme` - Retorna cores do tema
   - `GET /api/content/header` - Retorna conteúdo do header
   - `GET /api/content/hero` - Retorna conteúdo do hero
   - `GET /api/content/about` - Retorna conteúdo do about
   - `GET /api/content/services` - Retorna serviços
   - `GET /api/content/team` - Retorna equipe
   - `GET /api/content/footer` - Retorna footer
   - `POST /api/contact` - Envia formulário de contato
   - `POST /api/ai/analyze` - Envia mensagem para IA

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

Os breakpoints estão definidos nos arquivos CSS de cada componente.

## 🐛 Solução de Problemas

### Erro ao instalar dependências

Se `npm install` falhar:
```bash
# Limpe o cache do npm
npm cache clean --force

# Tente novamente
npm install
```

### Porta 3000 já está em uso

Se a porta 3000 estiver ocupada, o Vite automaticamente tentará usar outra porta (3001, 3002, etc.).

Para forçar uma porta específica, edite `vite.config.js`:
```javascript
server: {
  port: 3001, // Sua porta desejada
  open: true
}
```

### Imagens não aparecem

Certifique-se de que:
1. As imagens estão na pasta `public/images/`
2. O caminho no código está correto: `/images/nome-da-imagem.jpg`
3. O servidor de desenvolvimento está rodando

## 📞 Suporte

Para dúvidas ou problemas:
- Email: contato@miguelxavier.adv.br
- Telefone: (11) 3000-0000

## 📄 Licença

© 2026 Miguel & Xavier Advocacia. Todos os direitos reservados.
