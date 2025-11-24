export enum TipoTransacao {
  BOLETO = 'Boleto',
  TRANSFERENCIA = 'Transferencia',
  CARTAO_CREDITO = 'Cartao Credito',
  CHEQUE = 'Cheque',
  PIX = 'PIX',
  DINHEIRO = 'Dinheiro',
}

export enum StatusTransacao {
  CONCLUIDA = 'Concluida', 
  PENDENTE = 'Pendente',
  CANCELADA = 'Cancelada',
  PROCESSANDO = 'Processando',
  FALHA = 'Falha',
}