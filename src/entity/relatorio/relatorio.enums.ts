export enum CategoriaRelatorio {
  VENDAS = 'Vendas',
  ESTOQUE = 'Estoque',
  CLIENTES = 'Clientes',
  FINANCEIRO = 'Financeiro',
  ANALISE = 'Análise',
  REEMBOLSOS = 'Reembolsos',
}

export enum TipoRelatorio {
  // Vendas
  VENDAS_MENSAIS = 'Vendas Mensais',
  VENDAS_DIARIAS = 'Vendas Diárias',
  PERFORMANCE_VENDAS = 'Performance de Vendas',
  META_REALIZADO = 'Meta vs Realizado',
  // Estoque 
  ESTOQUE_DETALHADO = 'Estoque Detalhado',
  MOVIMENTACAO_ESTOQUE = 'Movimentação de Estoque',
  PRODUTOS_MAIS_VENDIDOS = 'Produtos Mais Vendidos',
  NIVEIS_CRITICOS = 'Níveis Críticos',

  // Clientes 
  CLIENTES_ATIVOS = 'Clientes Ativos',
  CLIENTES_INATIVOS = 'Clientes Inativos',
  ANALISE_RISCO = 'Análise de Risco',
  SATISFACAO_CLIENTE = 'Satisfação do Cliente',

  // Financeiro
  FLUXO_CAIXA = 'Fluxo de Caixa',
  REEMBOLSOS_PENDENTES = 'Reembolsos Pendentes',
  CONTAS_PAGAR = 'Contas a Pagar',
  CONTAS_RECEBER = 'Contas a Receber',

  // Análise 
  ANALISE_COMPARATIVA = 'Análise Comparativa',
  TENDENCIAS = 'Tendências',
  PREVISOES = 'Previsões',
  INDICES_DESEMPENHO = 'Índices de Desempenho',

  // Reembolsos
  REEMBOLSOS_FUNCIONARIO = 'Reembolsos por Funcionário',
  REEMBOLSOS_CATEGORIA = 'Reembolsos por Categoria',
  STATUS_REEMBOLSOS = 'Status de Reembolsos',
  ANALISE_DESPESAS = 'Análise de Despesas',
}

export enum PeriodoRelatorio {
  DIARIO = 'Diário',
  SEMANAL = 'Semanal',
  MENSAL = 'Mensal',
  TRIMESTRAL = 'Trimestral',
  ANUAL = 'Anual',
  PERSONALIZADO = 'Personalizado',
}

export enum StatusRelatorio {
  DISPONIVEL = 'Disponível',
  PROCESSANDO = 'Processando',
  ERRO = 'Erro',
  ARQUIVADO = 'Arquivado',
}