import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_despesa')
export class TipoDespesa {
  @PrimaryGeneratedColumn('uuid', { name: 'id_tipo_despesa' })
  id: string;

  @Column({ name: 'nome', length: 50 })
  nome: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao: string;
}