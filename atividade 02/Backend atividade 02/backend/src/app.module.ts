import { Module } from '@nestjs/common';
import { TarefasModule } from './tarefas/tarefas.module';
import { ProjetosModule } from './projetos/projetos.module';

@Module({
  imports: [TarefasModule, ProjetosModule],
})
export class AppModule {}
