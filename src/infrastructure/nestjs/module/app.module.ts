import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import databaseConfig from "../config/database.config";
import { AuthModule } from './auth.module';
import { UsuariosModule } from '../../../application/user/usuarios.module';
import {RelatorioModule} from "../../../application/relatorio/relatorio.module";
import { ClientModule } from '../../../application/client/client.module';
import { VendaModule } from '../../../application/venda/venda.module';
import { TransacaoModule } from 'src/application/transcao/transacao.module';
import { ReembolsoModule } from '../../../application/reembolso/reembolso.module';
import { UserEntity } from '../../../entity/user/user.entity';
import { Cliente } from '../../../entity/client/client.entity';
import { Reembolso } from '../../../entity/reembolso/reembolso.entity';
import { UserRole } from '../../../entity/user/user.enums';

// controler
import { AuthController } from '../../../controllers/auth.controllers';
import { ClientController } from '../../../controllers/client.controller';
import { UsuariosController } from '../../../controllers/usuarios.controller';

// service
import { AuthService } from '../../../application/auth/auth.service';
import { ClientService } from '../../../application/client/client.service';
import { UsuariosService } from '../../../application/user/usuarios.service';

@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    ClientModule,
    RelatorioModule,
    VendaModule,
    TransacaoModule,
    ReembolsoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'engnet_db',

      entities: [UserEntity, Cliente, Reembolso], 
      synchronize: true,
    }),
    
    TypeOrmModule.forFeature([UserEntity, Cliente, Reembolso]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'segredo_padrao',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController, ClientController, UsuariosController],
  providers: [AuthService, ClientService, UsuariosService],
})
export class AppModule implements OnModuleInit {
  constructor(private usuariosService: UsuariosService) {}

  async onModuleInit() {
    const email = 'joao@engnetconsultoria.com.br';
    console.log('Verificando seed...');
    
    try {
        const users = await this.usuariosService.obterTodos();
        const userExist = users.find(u => u.email === email);
    
        if (!userExist) {
          console.log('Criando usuário João Silva...');
          await this.usuariosService.criar({
            nome: 'João Silva',
            email: email,
            senha: '123456',
            role: UserRole.ADMIN,
            ativo: true,
            avatarUrl: null,
            telefone: '(11) 99999-9999',
          } as any);
          console.log('Usuário João criado com sucesso!');
        } else {
            console.log('Usuário João já existe.');
        }
    } catch (error) {
        console.error('Erro no seed:', error);
    }
  }
}