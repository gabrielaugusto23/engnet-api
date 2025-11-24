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
import { UserEntity } from '../user/user.entity';
import { Cliente } from '../client/client.entity';
import { CategoriaVenda, StatusVenda } from './venda.enums';
import { Expose } from 'class-transformer'; 

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn('uuid', { name: 'id_venda' })
  id: string;

  @Column({ name: 'codigo_sequencial', type: 'int' })
  @Generated('increment') 
  codigoSequencial: number;

  @Expose() 
  get codigo(): string {
    return `VND-${this.codigoSequencial.toString().padStart(3, '0')}`;
  }

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'id_vendedor' })
  vendedor: UserEntity;

  @Column({ name: 'id_vendedor', nullable: true })
  vendedorId: string;

  @ManyToOne(() => Cliente, { eager: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ name: 'id_cliente', nullable: true })
  clienteId: string;

  @Column({ 
    name: 'categoria', 
    type: 'enum', 
    enum: CategoriaVenda 
  })
  categoria: CategoriaVenda;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ name: 'data_hora', type: 'timestamp' })
  dataHora: Date;

  @Column({ 
    name: 'status', 
    type: 'enum', 
    enum: StatusVenda,
    default: StatusVenda.PENDENTE 
  })
  status: StatusVenda;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}