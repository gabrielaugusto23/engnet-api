import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../../entity/client/client.entity';
import { ClientService } from './client.service';
import { ClientController } from '../../controllers/client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService], 
})
export class ClientModule {}