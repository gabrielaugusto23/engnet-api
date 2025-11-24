import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  Generated 
} from 'typeorm';
import { Expose } from 'class-transformer';
import { StatusCliente } from './client.enums';

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

  @Column({ name: 'nome', length: 255 })
  nome: string;

  @Column({ name: 'email', length: 255, unique: true })
  email: string;

  @Column({ name: 'telefone', length: 20 })
  telefone: string;

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