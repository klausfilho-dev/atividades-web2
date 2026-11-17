ATIVIDADE 03 — NESTJS + POSTGRESQL + TYPEORM

ESTRUTURA
Este backend mantém o CRUD de Tarefas e acrescenta o CRUD de Projetos.
Os dois módulos usam Repository do TypeORM e persistem no PostgreSQL.

PASSO A PASSO
1. Abra um terminal dentro desta pasta backend.
2. Execute: npm install
3. Confira se o Docker Desktop está aberto.
4. Na pasta que contém o docker-compose.yml original, execute:
   docker compose up -d db
   (O compose original está um nível acima, em aula_02-10. Copie-o para a pasta atividade 03
   ou execute o comando apontando para o arquivo com -f.)
5. Gere a migration inicial:
   npm run migration:generate -- src/migrations/CreateTarefasEProjetos
6. Execute a migration:
   npm run migration:run
7. Opcionalmente, carregue os dados iniciais:
   npm run seed
   ATENÇÃO: o seed limpa as tabelas tarefas e projetos antes de inserir os exemplos.
8. Inicie a API:
   npm run start:dev

ENDPOINTS
Tarefas: /api/tarefas
Projetos: /api/projetos

IMPORTANTE SOBRE O DOCKER
O docker-compose.yml do projeto original fica em aula_02-10/docker-compose.yml.
Para iniciar o banco sem copiar o arquivo, estando na pasta raiz do ZIP:
docker compose -f aula_02-10/docker-compose.yml up -d db

CONFIGURAÇÃO DO BANCO
src/data-source.ts está alinhado ao serviço db do compose:
host localhost, porta 5432, usuário postgres, senha postgres, banco todo.
