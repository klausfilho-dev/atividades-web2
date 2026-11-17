import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjetoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  @MaxLength(60, { message: 'O nome deve ter no máximo 60 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  @MaxLength(200, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  descricao?: string;

  @IsString({ message: 'A cor deve ser um texto.' })
  @IsNotEmpty({ message: 'A cor é obrigatória.' })
  @IsIn(['vermelho', 'verde', 'azul', 'amarelo', 'roxo'], {
    message: 'A cor deve ser vermelho, verde, azul, amarelo ou roxo.',
  })
  cor: string;
}
