import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  nome: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  descricao?: string;

  @Column({ length: 20 })
  cor: string;
}
