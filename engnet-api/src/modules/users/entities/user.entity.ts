import{Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity('users') //nome da tabela
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true  //email unico pra login
    })
    email: string;

    @Column()
    password: string;
    
    @Column({
        default: true //por padrao, o membro que entrar eh ativo
    })
    isActive: boolean;

    @Column({
        nullable: true
    })
    avatarUrl: string;

    @CreateDateColumn()
    createdAt: Date;
} 
