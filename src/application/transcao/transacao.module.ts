import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from '../../entity/transacao/transacao.entity';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from '../../controllers/transacao.controller';
import { VendaModule } from '../venda/venda.module';
import { UsuariosModule } from '../user/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transacao]),
    VendaModule,   
    UsuariosModule  
  ],
  controllers: [TransacaoController],
  providers: [TransacaoService],
})
export class TransacaoModule {}