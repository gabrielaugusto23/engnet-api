import { PartialType } from '@nestjs/swagger';
import { CreateReembolsoDto } from './create-reembolso.dto';

export class UpdateReembolsoDto extends PartialType(CreateReembolsoDto) {}