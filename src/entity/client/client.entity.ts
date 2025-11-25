import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  Generated 
} from 'typeorm';
import { Expose } from 'class-transformer';
import { StatusCliente, EstadosBrasil } from './client.enums';

@Entity('client')
export class Cliente {
  @PrimaryGeneratedColumn('uuid', { name: 'id_cliente' })
  id: string;

  @Column({ name: 'codigo_sequencial', type: 'int' })
  @Generated('increment') 
  codigoSequencial: number;

  @Expose() 
  get codigo(): string {
    return `CLI${this.codigoSequencial.toString().padStart(3, '0')}`;
  }

  @Column({ name: 'nome_empresa', length: 255 })
  nomeEmpresa: string;

  @Column({ name: 'nome_contato', length: 255 })
  nome: string;

  @Column({ name: 'email', length: 255, unique: true })
  email: string;

  @Column({ name: 'telefone', length: 20 })
  telefone: string;

  @Column({ name: 'cnpj', length: 20, nullable: true })
  cnpj: string;

  @Column({ name: 'endereco', type: 'text', nullable: true })
  endereco: string;

  @Column({ name: 'cidade', length: 100, nullable: true })
  cidade: string;

  @Column({ 
    name: 'estado', 
    type: 'enum', 
    enum: EstadosBrasil, 
    nullable: true 
  })
  estado: EstadosBrasil;

  @Column({ name: 'cep', length: 10, nullable: true })
  cep: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao: string;

  @Column({ 
    name: 'total_compras', 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    default: 0 
  })
  totalCompras: number;

  @Column({ 
    name: 'status', 
    type: 'enum', 
    enum: StatusCliente,
    default: StatusCliente.NOVO 
  })
  status: StatusCliente;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}