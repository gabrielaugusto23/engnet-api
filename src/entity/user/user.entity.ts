import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany 
} from 'typeorm';
import { Reembolso } from '../reembolso/reembolso.entity';
import { UserRole } from './user.enums'; 

@Entity('usuario')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario' })
  id: string;

  @Column({ name: 'nome', type: 'varchar', length: 255 }) 
  nome: string;

  @Column({ name: 'email', type: 'varchar', unique: true, length: 255 })
  email: string;
  
  @Column({ name: 'senha', type: 'varchar', select: false, length: 255 }) 
  senha: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER, 
  })
  role: UserRole;

  @Column({ name: 'ativo', default: true })
  ativo: boolean;

  @Column({ name: 'avatar_url', type: 'varchar', length: 255, nullable: true })
  avatarUrl: string;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' }) 
  dataAtualizacao: Date;

  @OneToMany(() => Reembolso, (reembolso) => reembolso.usuario)
  reembolsos: Reembolso[];
}