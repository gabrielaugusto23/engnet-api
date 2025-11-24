import { PartialType } from '@nestjs/swagger';
import { CreateTransacaoDto } from './create-transacao.dto';

export class UpdateTransacaoDto extends PartialType(CreateTransacaoDto) {}