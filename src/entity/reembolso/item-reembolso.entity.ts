import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reembolso } from './reembolso.entity';
import { TipoDespesa } from '../tipo-despesa/tipo-despesa.entity';

@Entity('item_reembolso')
export class ItemReembolso {
  @PrimaryGeneratedColumn('uuid', { name: 'id_item_reembolso' })
  id: string;

  @Column({ name: 'data_despesa', type: 'date' })
  dataDespesa: Date;

  @Column({ name: 'descricao', length: 255 })
  descricao: string;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ name: 'comprovante', nullable: true }) // URL da imagem/arquivo
  comprovante: string;

  // FK para Reembolso
  @ManyToOne(() => Reembolso, (reembolso) => reembolso.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'FK_REEMBOLSO_id_reembolso' })
  reembolso: Reembolso;

  // FK para TipoDespesa
  @ManyToOne(() => TipoDespesa)
  @JoinColumn({ name: 'FK_TIPO_DESPESA_id_tipo_despesa' })
  tipoDespesa: TipoDespesa;
}