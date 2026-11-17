import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  // Armazena somente o hash bcrypt, nunca a senha em texto puro.
  @Column()
  senha: string;
}
