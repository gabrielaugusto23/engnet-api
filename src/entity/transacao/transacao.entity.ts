import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn,
  Generated 
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Venda } from '../venda/venda.entity'; 
import { UserEntity } from '../user/user.entity'; 
import { TipoTransacao, StatusTransacao } from './transacao.enums';

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn('uuid', { name: 'id_transacao' })
  id: string;

  @Column({ name: 'codigo_sequencial', type: 'int' })
  @Generated('increment')
  codigoSequencial: number;

  @Expose()
  get codigo(): string {
    return `TRX-${this.codigoSequencial.toString().padStart(3, '0')}`;
  }

  @ManyToOne(() => Venda, { eager: true }) 
  @JoinColumn({ name: 'id_venda' })
  venda: Venda;

  @Column({ name: 'id_venda', nullable: true })
  vendaId: string; 

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'id_usuario_executor' })
  quemRealizou: UserEntity;

  @Column({ name: 'id_usuario_executor', nullable: true })
  quemRealizouId: string;

  @Column({ 
    name: 'tipo', 
    type: 'enum', 
    enum: TipoTransacao 
  })
  tipo: TipoTransacao;

  @Column({ 
    name: 'valor', 
    type: 'decimal', 
    precision: 10, 
    scale: 2 
  })
  valor: number;

  @Column({ name: 'data_hora', type: 'timestamp' })
  dataHora: Date;

  @Column({ 
    name: 'status', 
    type: 'enum', 
    enum: StatusTransacao,
    default: StatusTransacao.PENDENTE 
  })
  status: StatusTransacao;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao: string;

  @Column({ name: 'documento_pdf', type: 'varchar', length: 255, nullable: true })
  documentoPdf: string; 

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}