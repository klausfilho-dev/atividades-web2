import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Cria as tabelas usadas pelo backend da atividade 03 e a tabela de usuários
 * exigida pela atividade 04. IF NOT EXISTS também permite aplicar a migration
 * em um banco onde tarefas e projetos já tenham sido criadas anteriormente.
 */
export class CreateInitialTables1740000000000 implements MigrationInterface {
  name = 'CreateInitialTables1740000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tarefas" (
        "id" SERIAL NOT NULL,
        "titulo" character varying NOT NULL,
        "descricao" text,
        "concluida" boolean NOT NULL DEFAULT false,
        CONSTRAINT "PK_tarefas_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "projetos" (
        "id" SERIAL NOT NULL,
        "nome" character varying(60) NOT NULL,
        "descricao" character varying(200),
        "cor" character varying(20) NOT NULL,
        CONSTRAINT "PK_projetos_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "usuarios" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "senha" character varying NOT NULL,
        CONSTRAINT "UQ_usuarios_email" UNIQUE ("email"),
        CONSTRAINT "PK_usuarios_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "usuarios"');
    await queryRunner.query('DROP TABLE IF EXISTS "projetos"');
    await queryRunner.query('DROP TABLE IF EXISTS "tarefas"');
  }
}
