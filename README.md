# Sistema SOA para Análise de Tendência de Nomes no Brasil

Este projeto implementa um sistema orientado a serviços (SOA) para análise de tendências de nomes próprios no Brasil, utilizando dados da API do IBGE.

## Arquitetura SOA

O sistema foi desenvolvido seguindo os princípios da Arquitetura Orientada a Serviços (SOA):

1. **Serviços Independentes**:
   - Name Analysis Service: Responsável pela análise de tendências de nomes
   - Location Service: Gerencia consultas baseadas em localidade
   - API Gateway: Coordena a comunicação entre serviços

2. **Desacoplamento**:
   - Cada serviço opera de forma independente
   - Comunicação via REST APIs
   - Interface de usuário separada da lógica de negócios

3. **Reutilização**:
   - Componentes compartilhados entre serviços
   - Bibliotecas comuns para visualização de dados
   - Serviços modulares e extensíveis

## Tecnologias Utilizadas

### Backend
- NestJS (Node.js)
- TypeScript
- REST APIs
- Swagger para documentação

### Frontend
- React
- TypeScript
- Material-UI
- Chart.js para visualizações

## Funcionalidades

1. **Evolução do Ranking de um Nome**
   - Visualização gráfica da evolução de um nome específico
   - Seleção de intervalo de décadas
   - Gráfico interativo

2. **Evolução do Ranking em Localidade**
   - Seleção de UF ou município
   - Exibição dos 3 nomes mais frequentes
   - Apresentação em tabela

3. **Comparação de Nomes**
   - Comparação de dois nomes ao longo do tempo
   - Visualização gráfica da evolução
   - Dados desde 1930

## Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

4. Inicie os serviços:
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start
```

O sistema estará disponível em:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Documentação API: http://localhost:4000/api

## Estrutura do Projeto

```
├── backend/
│   ├── src/
│   │   ├── name-analysis/
│   │   ├── location/
│   │   └── gateway/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── pages/
│   └── package.json
└── README.md
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 