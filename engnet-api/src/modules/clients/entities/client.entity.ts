import{Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';
import{ClientStatus} from './client-status.enum'; //estou importando o menu de opcoes (Enum)

@Entity('clientes')
export class Cliente{
    @PrimaryGeneratedColumn('uuid') //estou criando a chave primaria da tabela
    id: string;

    @Column()       //coluna basica, por padrao ela eh obrigatoria
    name: string;

    @Column({unique : true}) //crio uma regra que diz que ngm pode ter o mesmo email
    email: string;

    @Column()
    phone: string;

    @Column({
        type: 'enum',
        enum: ClientStatus,
        default: ClientStatus.NOVO,
    })
    status: ClientStatus;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    })
    totalCompras: number;

    @CreateDateColumn()
    createdAt: Date;
}