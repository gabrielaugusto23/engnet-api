import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'; 
import {Repository} from 'typeorm';
import {CriacaoClienteDto} from './dto/create-client.dto';
import {UpdateClientDto} from './dto/update-client.dto';
import {Cliente} from './entities/client.entity';

@Injectable()
export class ClientsService{
  constructor(
    @InjectRepository(Cliente) 
    private readonly clienteRepository: Repository<Cliente>
  ) {}
  //CRUD Create
  async create(CriacaoClienteDto: CriacaoClienteDto): Promise<Cliente>{
    const cliente = this.clienteRepository.create(CriacaoClienteDto);
    return this.clienteRepository.save(cliente);
  }

  //READ
  //ler todos
  async findAll(): Promise<Cliente[]>{
    return this.clienteRepository.find();
  }
  //ler um
  async findOne(id: string): Promise<Cliente>{
    const cliente = await this.clienteRepository.findOneBy({id});
    if(!cliente){
      throw new NotFoundException(`Cliente com ID "${id}" não encontrado.`);
    }else{
      return cliente;
    }
  }

  //UPDATE
  async update(id: string, updateClientDto: UpdateClientDto): Promise<Cliente>{
    const cliente = await this.clienteRepository.preload({
      id: id,
      ...updateClientDto,
    });
    if(!cliente){
      throw new NotFoundException(`Cliente com ID "${id}" não encontrado.`)
    }else{
      return this.clienteRepository.save(cliente);
    }
  }

  //DELETE
  async remove(id: string): Promise<void>{
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
