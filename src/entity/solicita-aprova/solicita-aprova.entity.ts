import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Reembolso } from '../reembolso/reembolso.entity';

@Entity('solicita_aprova')
export class SolicitaAprova {

  @PrimaryGeneratedColumn('uuid', { name: 'id_solicita_aprova' })
  id: string;

  @CreateDateColumn({ name: 'data_aprovacao', type: 'timestamp' })
  dataAprovacao: Date;

  // FK para Usuario
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'FK_USUARIO_id_usuario' })
  usuario: UserEntity;

  // FK para Reembolso
  @ManyToOne(() => Reembolso, { eager: true })
  @JoinColumn({ name: 'FK_REEMBOLSO_id_reembolso' })
  reembolso: Reembolso;
}