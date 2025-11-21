import {Module} from '@nestjs/common';
import {ClientsService} from './clients.service';
import {ClientesController} from './clients.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Cliente} from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
  ],
  controllers: [ClientesController],
  providers: [ClientsService],
})
export class ClientsModule {}
