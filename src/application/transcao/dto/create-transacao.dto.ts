import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsUUID, 
  IsDateString,
  Min
} from 'class-validator';
import { TipoTransacao, StatusTransacao } from '../../../entity/transacao/transacao.enums';

export class CreateTransacaoDto {
  @ApiProperty({ description: 'UUID da Venda associada', example: 'uuid-da-venda' })
  @IsNotEmpty()
  @IsUUID()
  vendaId: string;

  @ApiProperty({ enum: TipoTransacao, example: TipoTransacao.PIX })
  @IsEnum(TipoTransacao)
  tipo: TipoTransacao;

  @ApiProperty({ example: 1500.00, description: 'Valor da transação' })
  @IsNumber()
  @Min(0)
  valor: number;

  @ApiProperty({ description: 'UUID do Usuário que registrou', example: 'uuid-do-usuario' })
  @IsNotEmpty()
  @IsUUID()
  quemRealizouId: string;

  @ApiProperty({ 
    enum: StatusTransacao, 
    example: StatusTransacao.CONCLUIDA,
    required: false 
  })
  @IsOptional()
  @IsEnum(StatusTransacao)
  status?: StatusTransacao;

  @ApiProperty({ 
    example: '2025-11-24T14:00:00-03:00', 
    required: false,
    description: 'Data da transação. Se vazio, usa data atual.' 
  })
  @IsOptional()
  @IsDateString()
  dataHora?: string;

  @ApiProperty({ required: false, description: 'Detalhes adicionais' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ required: false, description: 'Link ou caminho do PDF' })
  @IsOptional()
  @IsString()
  documentoPdf?: string;
}