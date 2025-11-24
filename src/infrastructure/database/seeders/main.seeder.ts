import { AppDataSource } from '../config/data-source';
import { TipoDespesa } from '../../../entity/tipo-despesa/tipo-despesa.entity';
import { UserEntity } from '../../../entity/user/user.entity';
import { Relatorio } from '../../../entity/relatorio/relatorio.entity';
import { 
  CategoriaRelatorio, 
  PeriodoRelatorio, 
  StatusRelatorio, 
  TipoRelatorio 
} from '../../../entity/relatorio/relatorio.enums';
import { UserRole } from '../../../entity/user/user.enums'; 
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  try {
    console.log('Inicializando conexão para Seeding...');
    await AppDataSource.initialize();

    const tipoDespesaRepo = AppDataSource.getRepository(TipoDespesa);
    const tipos = [
      { nome: 'Alimentação', descricao: 'Gastos com refeições durante o trabalho.' },
      { nome: 'Transporte', descricao: 'Uber, Táxi, Combustível.' },
      { nome: 'Hospedagem', descricao: 'Hotéis e estadias.' },
      { nome: 'Equipamentos', descricao: 'Mouses, teclados, cabos.' },
    ];

    for (const tipo of tipos) {
      const exists = await tipoDespesaRepo.findOneBy({ nome: tipo.nome });
      if (!exists) {
        await tipoDespesaRepo.save(tipo);
        console.log(`[OK] Tipo Despesa criado: ${tipo.nome}`);
      }
    }

    const userRepo = AppDataSource.getRepository(UserEntity);
    
    // Usuário admin
    const adminEmail = 'admin@engnet.com.br';
    const adminExists = await userRepo.findOneBy({ email: adminEmail });
    
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('123456', 10);
      const admin = userRepo.create({
        nome: 'Admin EngNet',
        email: adminEmail,
        senha: passwordHash,
        ativo: true,
        role: UserRole.ADMIN, // Usuário com papel de Admin
      });
      await userRepo.save(admin);
      console.log(`[OK] Usuário ADMIN criado: ${adminEmail} (Senha: 123456)`);
    }

    // Usuário membro
    const memberEmail = 'membro@engnet.com.br';
    const memberExists = await userRepo.findOneBy({ email: memberEmail });

    if (!memberExists) {
      const passwordHash = await bcrypt.hash('123456', 10);
      const member = userRepo.create({
        nome: 'Membro Equipe',
        email: memberEmail,
        senha: passwordHash,
        ativo: true,
        role: UserRole.MEMBER, // Usuário com papel de Membro
      });
      await userRepo.save(member);
      console.log(`[OK] Usuário MEMBER criado: ${memberEmail} (Senha: 123456)`);
    }

    // Seed relatórios
    console.log('Gerando relatórios de exemplo...');
    const relatorioRepo = AppDataSource.getRepository(Relatorio);

    const relatoriosExemplo = [
      {
        nome: 'Fechamento Outubro 2025',
        categoria: CategoriaRelatorio.VENDAS,
        tipo: TipoRelatorio.VENDAS_MENSAIS,
        periodo: PeriodoRelatorio.MENSAL,
        status: StatusRelatorio.DISPONIVEL,
        dataHora: new Date('2025-10-31T23:59:00'),
        descricao: 'Relatório consolidado de todas as vendas regionais.',
        arquivoCsv: '/storage/relatorios/vendas_out_2025.csv'
      },
      {
        nome: 'Estoque Crítico - Q3',
        categoria: CategoriaRelatorio.ESTOQUE,
        tipo: TipoRelatorio.META_REALIZADO,
        periodo: PeriodoRelatorio.TRIMESTRAL,
        status: StatusRelatorio.PROCESSANDO, 
        dataHora: new Date(),
        descricao: 'Análise de itens com baixo giro e validade próxima.',
        arquivoCsv: null
      },
      {
        nome: 'Performance de Vendedores',
        categoria: CategoriaRelatorio.VENDAS,
        tipo: TipoRelatorio.PERFORMANCE_VENDAS,
        periodo: PeriodoRelatorio.SEMANAL,
        status: StatusRelatorio.ERRO, 
        dataHora: new Date('2025-11-20T10:00:00'),
        descricao: 'Falha na conexão com o BI durante a geração.',
        arquivoCsv: null
      }
    ];

    for (const rel of relatoriosExemplo) {
      const exists = await relatorioRepo.findOneBy({ nome: rel.nome });
      if (!exists) {
        const novoRelatorio = relatorioRepo.create(rel); 
        await relatorioRepo.save(novoRelatorio);
        console.log(`[OK] Relatório criado: ${rel.nome}`);
      }
    }

    console.log('Seeding finalizado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao rodar seeds:', error);
    process.exit(1);
  }
}

bootstrap();