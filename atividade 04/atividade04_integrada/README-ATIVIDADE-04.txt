ATIVIDADE 04 — INTEGRAÇÃO DOS FORMULÁRIOS DE LOGIN E CADASTRO

A integração segue o roteiro da Aula 07 (23-10): JWT armazenado em cookie httpOnly.

ESTRUTURA
- backend/: API NestJS com autenticação JWT, usuários, migrations e rotas protegidas.
- frontend/: aplicação React com Login, Cadastro, proteção de rota e tarefas.
- docker-compose.yml: inicia PostgreSQL e frontend.

COMO EXECUTAR
1. Na raiz do projeto, inicie o banco e o frontend:
   docker compose up -d db
   docker compose up --build frontend

2. Em outro terminal, entre na pasta do backend:
   cd backend
   npm install
   npm run migration:run
   npm run start:dev

3. Acesse:
   http://localhost:5173

INTEGRAÇÃO
- Cadastro: POST /api/auth/register
- Login: POST /api/auth/login
- Logout: POST /api/auth/logout
- Verificação da sessão: GET /api/auth/me
- O arquivo frontend/src/api.js usa credentials: "include" em todas as chamadas.
- O backend define access_token como cookie httpOnly.
- O Nginx encaminha /api para o backend em localhost:3000 via host.docker.internal.
- RequireAuth consulta /api/auth/me e redireciona para /login quando não há sessão.
- Após cadastrar, o frontend realiza login automaticamente e abre a tela de tarefas.

TESTES
1. Abra http://localhost:5173.
2. Cadastre um e-mail válido e uma senha com pelo menos 6 caracteres.
3. Confirme que a tela de tarefas é aberta.
4. Atualize a página: a sessão deve continuar ativa.
5. Clique em Sair: o sistema deve voltar para /login.
6. Tente abrir a rota / sem estar logado: deve redirecionar para /login.

Observação: o cookie é httpOnly; portanto, não deve ser lido pelo JavaScript do frontend.
