import { AppDataSource } from '../config/data-source';
import { TipoDespesa } from '../../../entity/tipo-despesa/tipo-despesa.entity';
import { UserEntity } from '../../../entity/user/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  try {
    console.log('Inicializando conexão para Seeding...');
    await AppDataSource.initialize();

    // --- SEED TIPOS DE DESPESA ---
    const tipoDespesaRepo = AppDataSource.getRepository(TipoDespesa);
    
    const tipos = [
      { nome: 'Alimentação', descricao: 'Gastos com refeições durante o trabalho.' },
      { nome: 'Transporte', descricao: 'Uber, Táxi, Combustível.' },
      { nome: 'Hospedagem', descricao: 'Hotéis e estadias.' },
      { nome: 'Equipamentos', descricao: 'Mouses, teclados, cabos.' },
    ];

    for (const tipo of tipos) {
      // Aqui eu verifico se já existe para não duplicar
      const exists = await tipoDespesaRepo.findOneBy({ nome: tipo.nome });
      if (!exists) {
        await tipoDespesaRepo.save(tipo);
        console.log(`Tipo Despesa criado: ${tipo.nome}`);
      }
    }

    // --- SEED USUÁRIO (ADMIN) ---
    const userRepo = AppDataSource.getRepository(UserEntity);
    const adminEmail = 'admin@engnet.com.br';
    
    const adminExists = await userRepo.findOneBy({ email: adminEmail });
    
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('123456', 10);
      
      const admin = userRepo.create({
        nome: 'Admin EngNet',
        email: adminEmail,
        senha: passwordHash,
        ativo: true,
        // role: UserRole.ADMIN
      });
      
      await userRepo.save(admin);
      console.log('Usuário Admin criado: admin@engnet.com.br / 123456');
    } else {
      console.log('Usuário Admin já existe.');
    }

    console.log('Seeding finalizado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao rodar seeds:', error);
    process.exit(1);
  }
}

bootstrap();