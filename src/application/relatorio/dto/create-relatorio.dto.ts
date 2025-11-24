import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
import { CategoriaRelatorio, TipoRelatorio, PeriodoRelatorio, StatusRelatorio } from '../../../entity/relatorio/relatorio.enums';

export class CreateRelatorioDto {
  @ApiProperty({ example: 'Fechamento Outubro', description: 'Nome do relatório' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ enum: CategoriaRelatorio, example: CategoriaRelatorio.VENDAS })
  @IsEnum(CategoriaRelatorio)
  categoria: CategoriaRelatorio;

  @ApiProperty({ enum: TipoRelatorio, example: TipoRelatorio.VENDAS_MENSAIS })
  @IsEnum(TipoRelatorio)
  tipo: TipoRelatorio;

  @ApiProperty({ enum: PeriodoRelatorio, example: PeriodoRelatorio.MENSAL })
  @IsEnum(PeriodoRelatorio)
  periodo: PeriodoRelatorio;

  @ApiProperty({ enum: StatusRelatorio, example: StatusRelatorio.PROCESSANDO })
  @IsEnum(StatusRelatorio)
  status: StatusRelatorio;

  @ApiProperty({ required: false, description: 'Descrição detalhada' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  // Valida se está no formato ISO 8601
  @IsDateString() 
  dataHora?: string;

  @ApiProperty({ 
    required: false, 
    example: '/storage/relatorios/vendas.csv', 
    description: 'Caminho do arquivo gerado' 
  })
  @IsOptional()
  @IsString()
  arquivoCsv?: string;

}