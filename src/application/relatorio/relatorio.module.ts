import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relatorio } from '../../entity/relatorio/relatorio.entity';
import { RelatorioService } from './relatorio.service';
import { RelatorioController } from '../../controllers/relatorio.controller';

@Module({
  // Aqui registra a entidade  
  imports: [TypeOrmModule.forFeature([Relatorio])], 
  controllers: [RelatorioController],
  providers: [RelatorioService],
})
export class RelatorioModule {}