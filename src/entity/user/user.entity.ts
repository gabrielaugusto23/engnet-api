import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Reembolso } from '../reembolso/reembolso.entity';
@Entity('usuario')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario' })
  id: string;

  @Column({ name: 'nome', length: 100 })
  nome: string;

  @Column({ name: 'email', unique: true, length: 100 })
  email: string;
  
  // select: false que é para esconder a senha no retorno
  @Column({ name: 'senha', select: false }) 
  senha: string;

  @Column({ name: 'ativo', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  // Aqui os relacionamentos
  @OneToMany(() => Reembolso, (reembolso) => reembolso.usuario)
  reembolsos: Reembolso[];
  
  // Adicionar a parte das notificações posteriormente 
}