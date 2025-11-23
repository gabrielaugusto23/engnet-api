import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt' //importo uma biblioteca de cripto
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  //create
  async create(createUserDto: CreateUserDto): Promise<User> {
    const x = await bcrypt.genSalt();
    const hashSenha = await bcrypt.hash(createUserDto.password, x);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashSenha,    //coloco nome, email e etc e a senha vai ser trocada por uma criptografada
    });
    try{
      return await this.userRepository.save(newUser);
    }catch (error){
      if(error.code === '23505'){ //violacao de unicidade (o email ja existe)
        throw new ConflictException('Este email já está cadastrado');
      }
      throw error;
    }
  }

  //Read
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException(`Membro com ID ${id} não encontrado.`)
      return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  //Update
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Se o usuário estiver tentando mudar a senha, precisamos criptografar de novo
    if (updateUserDto.password) {
      const x = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, x);
    }
    const user = await this.userRepository.preload({  //o preload pega o usuario que ja existe e substitui a senha 
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException(`Membro com ID ${id} não encontrado.`);
    return this.userRepository.save(user);
  }

  //Remove
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
