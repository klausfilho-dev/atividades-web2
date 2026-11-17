import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

// Na atualização, todos os campos do cadastro passam a ser opcionais.
export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
