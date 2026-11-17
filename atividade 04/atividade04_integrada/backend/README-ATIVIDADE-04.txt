ATIVIDADE 04 — AUTENTICAÇÃO JWT + COOKIE HTTPONLY

O QUE FOI IMPLEMENTADO
- Cadastro de usuário em POST /api/auth/register.
- Senhas protegidas com hash bcrypt (10 rounds); a senha original não é salva.
- Login em POST /api/auth/login, com JWT enviado em cookie httpOnly chamado access_token.
- Logout em POST /api/auth/logout, removendo o cookie.
- Consulta do usuário autenticado em GET /api/auth/me.
- Estratégia JWT que lê o token do cookie e valida assinatura e expiração.
- Proteção de TODAS as rotas de /api/tarefas e /api/projetos com JwtAuthGuard.
- Validação dos dados recebidos usando o ValidationPipe já existente.
- CORS habilitado para http://localhost:5173 com credentials: true.
- Migration inicial que cria tarefas, projetos e usuarios. Ela usa IF NOT EXISTS
  para não recriar tarefas/projetos que já existam no banco.

ESTRUTURA NOVA
src/users/       Entidade User, UsersService e UsersModule
src/auth/        AuthDto, AuthService, AuthController, JwtStrategy, JwtAuthGuard e AuthModule
src/migrations/  Migration das tabelas tarefas, projetos e usuarios

COMO EXECUTAR
1. Abra o terminal na pasta backend (a mesma pasta deste README).
2. Instale as dependências:
   npm install
3. Na pasta que contém docker-compose.yml, inicie o PostgreSQL:
   docker compose up -d db
4. Execute as migrations:
   npm run migration:run
5. Inicie o backend:
   npm run start:dev
6. A API ficará disponível em http://localhost:3000/api.

CONFIGURAÇÃO
O backend usa por padrão os dados do docker-compose: host localhost, porta 5432,
usuário postgres, senha postgres e banco todo. O arquivo .env.example documenta
as variáveis. Se desejar usar variáveis próprias, copie-o para .env e configure-as
no ambiente antes de iniciar a aplicação (o arquivo .env é carregado automaticamente pelo dotenv).
JWT_SECRET pode ser definido no ambiente. O valor padrão 'segredo-da-aula' é
apenas para desenvolvimento/atividade, nunca para produção.

ENDPOINTS DE AUTENTICAÇÃO
POST /api/auth/register  body: { "email": "aluno@exemplo.com", "senha": "123456" }
POST /api/auth/login     body: { "email": "aluno@exemplo.com", "senha": "123456" }
POST /api/auth/logout
GET  /api/auth/me        exige cookie access_token válido

ROTAS PROTEGIDAS
Todas as rotas /api/tarefas e /api/projetos exigem login e cookie access_token válido.
Sem cookie ou com token inválido/expirado, a API responde 401 Unauthorized.

TESTE NO POSTMAN
1. POST http://localhost:3000/api/auth/register
   Body > raw > JSON: {"email":"aluno@exemplo.com","senha":"123456"}
2. POST http://localhost:3000/api/auth/login
   Body > raw > JSON: {"email":"aluno@exemplo.com","senha":"123456"}
   O Postman deve armazenar o cookie access_token automaticamente.
3. GET http://localhost:3000/api/auth/me
   Deve retornar userId e email.
4. GET http://localhost:3000/api/tarefas e GET http://localhost:3000/api/projetos
   Devem funcionar depois do login.
5. Apague os cookies no gerenciador do Postman e repita as chamadas acima:
   /me, /tarefas e /projetos devem retornar 401.
6. POST http://localhost:3000/api/auth/logout
   O cookie deve ser removido; chamadas protegidas seguintes retornam 401.
7. Teste também login com senha incorreta (401), cadastro com e-mail inválido (400)
   e cadastro repetido (409).

INTEGRAÇÃO COM O FRONTEND
O ZIP recebido contém o backend e o docker-compose, mas não contém a pasta/código
frontend. Para o navegador manter o cookie, as chamadas do frontend precisam usar
credentials: 'include' (fetch) ou withCredentials: true (Axios). A interface deve
chamar /api/auth/register, /api/auth/login e /api/auth/logout; para verificar a
sessão, chamar /api/auth/me. A configuração do proxy do frontend também deve
encaminhar /api para http://localhost:3000. A integração no código React depende
dos arquivos do frontend, que não vieram neste ZIP.
