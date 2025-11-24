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
import { UserEntity } from '../user/user.entity'; 
import { CategoriaReembolso, StatusReembolso } from './reembolso.enums';

@Entity('reembolso')
export class Reembolso {
  @PrimaryGeneratedColumn('uuid', { name: 'id_reembolso' })
  id: string;

  @Column({ name: 'codigo_sequencial', type: 'int' })
  @Generated('increment')
  codigoSequencial: number;

  @Expose()
  get codigo(): string {
    return `R${this.codigoSequencial.toString().padStart(3, '0')}`;
  }

  @ManyToOne(() => UserEntity, { eager: true }) 
  @JoinColumn({ name: 'id_usuario' })
  usuario: UserEntity;

  @Column({ name: 'id_usuario', nullable: true })
  usuarioId: string;

  @Column({ 
    name: 'categoria', 
    type: 'enum', 
    enum: CategoriaReembolso 
  })
  categoria: CategoriaReembolso;

  @Column({ name: 'descricao', type: 'text' }) 
  descricao: string;

  @Column({ name: 'justificativa_comercial', type: 'text', nullable: true })
  justificativa: string;

  @Column({ 
    name: 'valor', 
    type: 'decimal', 
    precision: 10, 
    scale: 2 
  })
  valor: number;

  @Column({ name: 'data_despesa', type: 'date' })
  dataDespesa: Date; // A data que ocorreu a despesa (pode ser diferente da data criada (criadoEm))

  @Column({ 
    name: 'status', 
    type: 'enum', 
    enum: StatusReembolso,
    default: StatusReembolso.RASCUNHO 
  })
  status: StatusReembolso;

  @Column({ name: 'comprovante_url', type: 'varchar', length: 255, nullable: true })
  comprovanteUrl: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date; 

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}