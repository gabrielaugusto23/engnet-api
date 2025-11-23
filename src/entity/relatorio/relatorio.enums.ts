export enum CategoriaRelatorio {
  VENDAS = 'Vendas',
  ESTOQUE = 'Estoque',
  CLIENTES = 'Clientes',
  FINANCEIRO = 'Financeiro',
  ANALISE = 'Análise',
  REEMBOLSOS = 'Reembolsos',
}

export enum TipoRelatorio {
  VENDAS_MENSAIS = 'Vendas Mensais',
  VENDAS_DIARIAS = 'Vendas Diárias',
  PERFORMANCE_VENDAS = 'Performance de Vendas',
  META_REALIZADO = 'Meta vs Realizado',
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