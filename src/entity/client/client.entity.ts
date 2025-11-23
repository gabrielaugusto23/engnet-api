import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client')
export class Cliente {
  @PrimaryGeneratedColumn('uuid', { name: 'id_cliente' })
  id: string;

  @Column({ name: 'nome', length: 100 })
  nome: string;

  @Column({ name: 'tipo', length: 20 }) // Exemplo: PF ou PJ
  tipo: string;

  @Column({ name: 'documento', length: 20 }) // CPF ou CNPJ
  documento: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'telefone', length: 20 })
  telefone: string;
}