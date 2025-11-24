import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from '../../entity/venda/venda.entity';
import { VendaService } from './venda.service';
import { VendaController } from '../../controllers/venda.controller';
import { ClientModule } from '../client/client.module';
import { UsuariosModule } from '../user/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venda]), 
    ClientModule,   
    UsuariosModule  
  ],
  controllers: [VendaController],
  providers: [VendaService],
  exports: [VendaService],
})
export class VendaModule {}