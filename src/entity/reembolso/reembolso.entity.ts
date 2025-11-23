import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ItemReembolso } from './item-reembolso.entity';

export enum StatusReembolso {
  EM_ANALISE = 'EM_ANALISE',
  APROVADO = 'APROVADO',
  REJEITADO = 'REJEITADO',
}

@Entity('reembolso')
export class Reembolso {
  @PrimaryGeneratedColumn('uuid', { name: 'id_reembolso' })
  id: string;

  @Column({ name: 'data_solicitacao', type: 'timestamp' })
  dataSolicitacao: Date;

  @Column({ name: 'data_aprovacao', type: 'timestamp', nullable: true })
  dataAprovacao: Date;

  @Column({ name: 'status', type: 'enum', enum: StatusReembolso, default: StatusReembolso.EM_ANALISE })
  status: StatusReembolso;

  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @Column({ name: 'observacao', type: 'text', nullable: true })
  observacao: string;

  // FK para Usuario (como colocado no DLD: FK_USUARIO_id_usuario)
  @ManyToOne(() => UserEntity, (usuario) => usuario.reembolsos)
  @JoinColumn({ name: 'FK_USUARIO_id_usuario' }) 
  usuario: UserEntity;

  @OneToMany(() => ItemReembolso, (item) => item.reembolso, { cascade: true })
  itens: ItemReembolso[];
}