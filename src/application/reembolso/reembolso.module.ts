import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reembolso } from '../../entity/reembolso/reembolso.entity';
import { ReembolsoService } from './reembolso.service';
import { ReembolsoController } from '../../controllers/reembolso.controller';
import { UsuariosModule } from '../user/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reembolso]),
    UsuariosModule 
  ],
  controllers: [ReembolsoController],
  providers: [ReembolsoService],
})
export class ReembolsoModule {}