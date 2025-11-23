import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  CategoriaRelatorio,
  TipoRelatorio,
  PeriodoRelatorio,
  StatusRelatorio,
} from './relatorio.enums';

@Entity('relatorios')
export class Relatorio {
  @PrimaryGeneratedColumn('uuid', { name: 'id_relatorio' })
  id: string;

  @Column()
  nome: string;

  @Column({
    type: 'enum',
    enum: CategoriaRelatorio,
  })
  categoria: CategoriaRelatorio;

  @Column({
    type: 'enum',
    enum: TipoRelatorio,
  })
  tipo: TipoRelatorio;

  @Column({
    type: 'enum',
    enum: PeriodoRelatorio,
  })
  periodo: PeriodoRelatorio;

  @Column({ type: 'timestamp' })
  dataHora: Date;

  @Column({
    type: 'enum',
    enum: StatusRelatorio,
    default: StatusRelatorio.DISPONIVEL,
  })
  status: StatusRelatorio;

  @Column({ type: 'text', nullable: true }) 
  descricao: string | null;

  @Column({ type: 'varchar', nullable: true })
  arquivoCsv: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}