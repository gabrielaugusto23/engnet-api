import { PartialType } from '@nestjs/swagger';
import { CreateVendaDto } from './create-venda.dto';

export class UpdateVendaDto extends PartialType(CreateVendaDto) {}