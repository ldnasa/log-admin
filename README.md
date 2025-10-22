# Project Logs - Sistema de Controle de Logs

Sistema web para gerenciamento e controle de logs de projetos.

## Stack Tecnológica

- **Frontend:** Next.js 14 + React + TypeScript
- **Backend:** .NET 8.0 Web API
- **Database:** SQL Server
- **Estilização:** Tailwind CSS

## Estrutura do Projeto
```
project-logs-web/
├── src/
│   ├── app/          # Rotas e páginas (Next.js App Router)
│   ├── components/   # Componentes React reutilizáveis
│   ├── services/     # Comunicação com API
│   ├── types/        # Tipos TypeScript
│   ├── lib/          # Utilitários e configurações
│   └── hooks/        # Custom React Hooks
├── public/           # Arquivos estáticos
└── README.md         # Este arquivo
```

## Como Rodar o Projeto

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente:
Crie um arquivo `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Rodar em desenvolvimento:
```bash
npm run dev
```

4. Acessar: http://localhost:3000

## Scripts Disponíveis

- `npm run dev` - Roda em modo desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Roda build de produção
- `npm run lint` - Verifica problemas no código

## Funcionalidades Planejadas

- [ ] Listagem de logs
- [ ] Filtros por projeto, nível, data
- [ ] Visualização detalhada de logs
- [ ] Autenticação de usuários
- [ ] Dashboard com métricas

## Desenvolvido por

Luiz Matheus da Silva - 2025