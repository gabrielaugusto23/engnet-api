import { 
  Injectable, 
  NotFoundException, 
  ConflictException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../entity/client/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repo: Repository<Cliente>,
  ) {}

  async create(dto: CreateClientDto) {
    // Aqui verifica duplicidade de email
    const exists = await this.repo.findOneBy({ email: dto.email });
    if (exists) {
      throw new ConflictException('Já existe um cliente com este e-mail.');
    }

    const cliente = this.repo.create(dto);
    return await this.repo.save(cliente);
  }

  async findAll() {
    // Ordena pelo código sequencial (1, 2, 3...) para ficar igual ao código padrão (CLI001...)
    return await this.repo.find({
      order: { codigoSequencial: 'ASC' }
    });
  }

  async findOne(id: string) {
    const cliente = await this.repo.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async update(id: string, dto: UpdateClientDto) {
    const cliente = await this.findOne(id);

    // Quando tiver mudando o email, verifica se o email já não pertence a outro cliente
    if (dto.email && dto.email !== cliente.email) {
      const emailEmUso = await this.repo.findOneBy({ email: dto.email });
      if (emailEmUso) {
        throw new ConflictException('Este e-mail já está em uso por outro cliente.');
      }
    }

    this.repo.merge(cliente, dto);
    return await this.repo.save(cliente);
  }

  async remove(id: string) {
    const cliente = await this.findOne(id);
    
    try {
      return await this.repo.remove(cliente);
    } catch (error) {
      if (error?.code === '23503') {
        throw new BadRequestException(
          'Não é possível excluir este cliente pois ele possui vendas ou histórico vinculado. Recomendamos alterar o status para INATIVO.',
        );
      }
      throw error; 
    }
  }
}