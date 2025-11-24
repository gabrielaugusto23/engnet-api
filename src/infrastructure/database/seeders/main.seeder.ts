import { AppDataSource } from '../config/data-source';
import { UserEntity } from '../../../entity/user/user.entity';
import { Relatorio } from '../../../entity/relatorio/relatorio.entity';
import { Cliente } from '../../../entity/client/client.entity';
import { Venda } from '../../../entity/venda/venda.entity';
import { Transacao } from '../../../entity/transacao/transacao.entity';
import { Reembolso } from '../../../entity/reembolso/reembolso.entity';
import { CategoriaRelatorio, PeriodoRelatorio, StatusRelatorio, TipoRelatorio } from '../../../entity/relatorio/relatorio.enums';
import { CategoriaVenda, StatusVenda} from '../../../entity/venda/venda.enums';
import { TipoTransacao, StatusTransacao } from '../../../entity/transacao/transacao.enums';
import { CategoriaReembolso, StatusReembolso } from '../../../entity/reembolso/reembolso.enums';
import { UserRole } from '../../../entity/user/user.enums'; 
import { StatusCliente } from '../../../entity/client/client.enums'; 
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  try {
    console.log('Inicializando conexão para Seeding...');
    await AppDataSource.initialize();

    // Seed para usuários
    const userRepo = AppDataSource.getRepository(UserEntity);
    
    // Criando usuário admin caso ele não exista ainda
    const adminEmail = 'admin@engnet.com.br';
    let adminUser = await userRepo.findOneBy({ email: adminEmail });
    
    if (!adminUser) {
      const passwordHash = await bcrypt.hash('123456', 10);
      const novoAdmin = userRepo.create({
        nome: 'Augusto Rocha Real',
        email: adminEmail,
        senha: passwordHash,
        ativo: true,
        role: UserRole.ADMIN,
      });
      adminUser = await userRepo.save(novoAdmin); 
      console.log(`[OK] Usuário ADMIN criado: ${adminEmail}`);
    } else {
       console.log(`[SKIP] Usuário ADMIN já existe: ${adminEmail}`);
    }

    // Criando usuário membro caso ele não exista ainda
    const memberEmail = 'membro@engnet.com.br';
    let memberUser = await userRepo.findOneBy({ email: memberEmail });

    if (!memberUser) {
      const passwordHash = await bcrypt.hash('123456', 10);
      const member = userRepo.create({
        nome: 'Alberto Silva',
        email: memberEmail,
        senha: passwordHash,
        ativo: true,
        role: UserRole.MEMBER,
      });
      memberUser = await userRepo.save(member);
      console.log(`[OK] Usuário MEMBER criado: ${memberEmail}`);
    }else {
       console.log(`[SKIP] Usuário MEMBER já existe: ${memberEmail}`);
    }

    // Seed para clientes

    const clienteRepo = AppDataSource.getRepository(Cliente);
    console.log('Gerando clientes de exemplo...');
    const clientesDados = [
      {
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-1111',
        totalCompras: 15200.00,
        status: StatusCliente.VIP
      },
      {
        nome: 'Maria Santos',
        email: 'maria@email.com',
        telefone: '(11) 99999-2222',
        totalCompras: 8450.00,
        status: StatusCliente.ATIVO
      },
      {
        nome: 'Tech Solutions Ltda',
        email: 'contato@techsolutions.com.br',
        telefone: '(11) 99999-8888',
        totalCompras: 0.00,
        status: StatusCliente.NOVO
      }
    ];

    for (const cli of clientesDados) {
      const exists = await clienteRepo.findOneBy({ email: cli.email });
      if (!exists) {
        const novo = clienteRepo.create(cli);
        await clienteRepo.save(novo);
        console.log(`[OK] Cliente criado: ${cli.nome}`);
      }
    }

    const joao = await clienteRepo.findOneBy({ email: 'joao@email.com' });
    const maria = await clienteRepo.findOneBy({ email: 'maria@email.com' });
    const tech = await clienteRepo.findOneBy({ email: 'contato@techsolutions.com.br' });

    // Seed para vendas

    console.log('Gerando vendas de exemplo...');
    const vendaRepo = AppDataSource.getRepository(Venda);

    if (adminUser && memberUser && joao && maria && tech) {
      const vendasExemplo = [
        {
          descricao: 'Projeto de Consultoria TI',
          categoria: CategoriaVenda.CONSULTORIA,
          valor: 15200.00,
          status: StatusVenda.CONCLUIDA,
          dataHora: new Date('2025-11-10T10:00:00'),
          vendedor: adminUser, 
          cliente: joao  // Aqui entra o Cliente (João)
        },
        {
          descricao: 'Pacote de Licenças Office',
          categoria: CategoriaVenda.LICENCAS,
          valor: 5000.00,
          status: StatusVenda.CONCLUIDA,
          dataHora: new Date('2025-11-15T14:30:00'),
          vendedor: adminUser,
          cliente: maria
        },
        {
          descricao: 'Suporte Técnico Mensal',
          categoria: CategoriaVenda.SUPORTE,
          valor: 3450.00,
          status: StatusVenda.PENDENTE,
          dataHora: new Date(),
          vendedor: adminUser,
          cliente: maria
        },
        {
          descricao: 'Desenvolvimento Customizado - Portal',
          categoria: CategoriaVenda.CUSTOMIZADO,
          valor: 25000.00,
          status: StatusVenda.PROCESSANDO,
          dataHora: new Date('2025-11-24T09:00:00'),
          vendedor: memberUser,
          cliente: tech
        }
      ];

      for (const dadosVenda of vendasExemplo) {
        const exists = await vendaRepo.findOneBy({ descricao: dadosVenda.descricao });
        
        if (!exists) {
          const novaVenda = vendaRepo.create(dadosVenda);
          await vendaRepo.save(novaVenda);
          console.log(`[OK] Venda criada: ${dadosVenda.descricao}`);
        }
      }
    } else {
      console.log('[AVISO] Não foi possível criar vendas. Admin ou Clientes não encontrados.');
    }

    // Seed para transações

    console.log('Gerando transações de exemplo...');
    const transacaoRepo = AppDataSource.getRepository(Transacao);

    const vendaConsultoria = await vendaRepo.findOneBy({ descricao: 'Projeto de Consultoria TI' });
    const vendaLicenca = await vendaRepo.findOneBy({ descricao: 'Pacote de Licenças Office' });
    const vendaPortal = await vendaRepo.findOneBy({ descricao: 'Desenvolvimento Customizado - Portal' });

    if (vendaConsultoria && vendaLicenca && vendaPortal && adminUser) {
      const transacoesExemplo = [
        {
          venda: vendaConsultoria,
          tipo: TipoTransacao.BOLETO,
          valor: 15200.00,
          status: StatusTransacao.CONCLUIDA,
          dataHora: new Date('2025-11-12T10:00:00'),
          quemRealizou: adminUser,
          descricao: 'Pagamento integral via Boleto Bancário'
        },
        {
          venda: vendaLicenca,
          tipo: TipoTransacao.PIX,
          valor: 5000.00,
          status: StatusTransacao.CONCLUIDA,
          dataHora: new Date('2025-11-16T15:00:00'),
          quemRealizou: adminUser,
          descricao: 'Pix recebido - Chave CNPJ'
        },
        {
          venda: vendaPortal,
          tipo: TipoTransacao.TRANSFERENCIA,
          valor: 12500.00, 
          status: StatusTransacao.PENDENTE,
          dataHora: new Date(),
          quemRealizou: adminUser,
          descricao: 'Entrada de 50% aguardando compensação'
        }
      ];

      for (const trx of transacoesExemplo) {
        const exists = await transacaoRepo.findOneBy({ descricao: trx.descricao });
        if (!exists) {
          const novaTrx = transacaoRepo.create(trx);
          await transacaoRepo.save(novaTrx);
          console.log(`[OK] Transação criada: ${trx.descricao}`);
        }
      }
    }

    // Seed para reembolsos

    console.log('Gerando reembolsos de exemplo...');
    const reembolsoRepo = AppDataSource.getRepository(Reembolso);

    if (adminUser && memberUser) {
      const reembolsosExemplo = [
        // Reembolso feito pelo usuário Admin 
        {
          usuario: adminUser,
          categoria: CategoriaReembolso.COMBUSTIVEL,
          descricao: 'Viagem para visita ao Cliente ABC',
          justificativa: 'Visita técnica contratual.',
          valor: 120.00,
          dataDespesa: new Date('2025-10-10'),
          status: StatusReembolso.APROVADO,
          comprovanteUrl: 'https://exemplo.com/nota-gasolina.jpg'
        },
        {
          usuario: memberUser,
          categoria: CategoriaReembolso.ALIMENTACAO,
          descricao: 'Almoço de alinhamento com equipe',
          justificativa: 'Alinhamento quinzenal de projetos.',
          valor: 85.50,
          dataDespesa: new Date('2025-11-20'),
          status: StatusReembolso.PENDENTE,
          comprovanteUrl: undefined
        },
        {
          usuario: memberUser,
          categoria: CategoriaReembolso.MATERIAL_ESCRITORIO,
          descricao: 'Compra de Mouse Ergonômico',
          justificativa: undefined,
          valor: 245.30,
          dataDespesa: new Date('2025-11-22'),
          status: StatusReembolso.RASCUNHO,
          comprovanteUrl: undefined
        }
      ];

      for (const item of reembolsosExemplo) {
        // Verifica se já existe esse reembolso pelo campo da descrição 
        const exists = await reembolsoRepo.findOneBy({ descricao: item.descricao });
        if (!exists) {
          const novoReembolso = reembolsoRepo.create(item);
          await reembolsoRepo.save(novoReembolso);
          console.log(`[OK] Reembolso criado: ${item.descricao}`);
        }
      }
    }

    // Seed para relatórios

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