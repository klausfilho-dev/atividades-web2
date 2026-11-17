# Atividade em Casa — CRUD de Projetos (NestJS)

Este projeto contém o backend da aula anterior (CRUD de Tarefas) e a implementação solicitada na Atividade em Casa: CRUD de Projetos.

## Executar

1. Abra esta pasta no VS Code.
2. No terminal, execute `npm install`.
3. Execute `npm run start:dev`.
4. A API ficará disponível em `http://localhost:3000/api`.

O CRUD desta atividade utiliza dados em memória. Os projetos cadastrados são perdidos quando o servidor é reiniciado.

## Rotas de Projetos

| Método | Rota | Resultado esperado |
|---|---|---|
| GET | `/api/projetos` | Lista projetos (200) |
| GET | `/api/projetos/1` | Busca projeto (200) |
| POST | `/api/projetos` | Cria projeto (201) |
| PUT | `/api/projetos/1` | Atualiza projeto (200) |
| DELETE | `/api/projetos/1` | Exclui projeto (204) |

## Testes no Postman

### Criar projeto — 201
POST `http://localhost:3000/api/projetos`

```json
{
  "nome": "Faculdade",
  "cor": "azul"
}
```

### Testar nome curto — 400
POST `http://localhost:3000/api/projetos`

```json
{
  "nome": "ab",
  "cor": "azul"
}
```

### Testar cor inválida — 400
POST `http://localhost:3000/api/projetos`

```json
{
  "nome": "Trabalho",
  "cor": "rosa"
}
```

### Testar campo não permitido — 400
POST `http://localhost:3000/api/projetos`

```json
{
  "nome": "Faculdade",
  "cor": "azul",
  "xpto": 1
}
```

### Projeto inexistente — 404
GET `http://localhost:3000/api/projetos/999`

### Atualizar projeto — 200
PUT `http://localhost:3000/api/projetos/1`

```json
{
  "nome": "Faculdade 2026"
}
```

### Excluir projeto — 204
DELETE `http://localhost:3000/api/projetos/1`

## Arquivos criados nesta atividade

- `src/projetos/projetos.module.ts`
- `src/projetos/projetos.controller.ts`
- `src/projetos/projetos.service.ts`
- `src/projetos/entities/projeto.entity.ts`
- `src/projetos/dto/create-projeto.dto.ts`
- `src/projetos/dto/update-projeto.dto.ts`

Também foi atualizado `src/app.module.ts` para registrar `ProjetosModule`. A configuração global de validação já existente em `src/main.ts` foi mantida.
