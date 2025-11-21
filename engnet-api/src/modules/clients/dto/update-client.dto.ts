import {PartialType} from '@nestjs/swagger';
import {CriacaoClienteDto} from './create-client.dto';

export class UpdateClientDto extends PartialType(CriacaoClienteDto) {}