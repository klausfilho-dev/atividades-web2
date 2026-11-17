import dataSource from './data-source';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import { Projeto } from './projetos/entities/projeto.entity';

async function seed() {
  await dataSource.initialize();

  try {
    const tarefaRepo = dataSource.getRepository(Tarefa);
    const projetoRepo = dataSource.getRepository(Projeto);

    // O seed reinicializa os dados dessas duas tabelas.
    await tarefaRepo.clear();
    await projetoRepo.clear();

    await tarefaRepo.save([
      {
        titulo: 'Estudar ORM',
        descricao: 'TypeORM + PostgreSQL',
        concluida: false,
      },
      {
        titulo: 'Preparar a aula de hoje',
        concluida: true,
      },
    ]);

    await projetoRepo.save([
      {
        nome: 'Projeto Faculdade',
        descricao: 'Projeto inicial para testar a API',
        cor: 'azul',
      },
      {
        nome: 'Projeto Pessoal',
        descricao: 'Organização de atividades pessoais',
        cor: 'verde',
      },
    ]);

    console.log('Seed concluído!');
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((erro) => {
  console.error('Erro ao executar o seed:', erro);
  process.exit(1);
});
