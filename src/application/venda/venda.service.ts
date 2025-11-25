import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from '../../entity/venda/venda.entity';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { StatusVenda } from '../../entity/venda/venda.enums';
import { ClientService } from '../client/client.service';
import { UsuariosService } from '../user/usuarios.service';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private readonly repo: Repository<Venda>,
    private readonly clientService: ClientService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(dto: CreateVendaDto) {
    const vendedor = await this.usuariosService.obterPorId(dto.vendedorId);
    const cliente = await this.clientService.findOne(dto.clienteId);

    const dataFinal = dto.dataHora ? new Date(dto.dataHora) : new Date();

    const venda = this.repo.create({
      ...dto,
      dataHora: dataFinal,
      vendedor: vendedor,
      cliente: cliente
    });

    const vendaSalva = await this.repo.save(venda);

    // Se a venda for concluida, aqui ele atualiza o total de compra do cliente
    if (vendaSalva.status === StatusVenda.CONCLUIDA) {
      const novoTotal = Number(cliente.totalCompras) + Number(vendaSalva.valor);
      await this.clientService.update(cliente.id, { totalCompras: novoTotal });
    }

    return vendaSalva;
  }

  async findAll() {
    return await this.repo.find({
      order: { codigoSequencial: 'DESC' }, 
      relations: ['vendedor', 'cliente'], 
    });
  }

  async findOne(id: string) {
    const venda = await this.repo.findOne({
      where: { id },
      relations: ['vendedor', 'cliente'],
    });
    if (!venda) throw new NotFoundException(`Venda com ID ${id} não encontrada.`);
    return venda;
  }

  async update(id: string, dto: UpdateVendaDto) {
    const venda = await this.findOne(id);
    
    const dadosAtualizados = { ...dto };
    if (dto.dataHora) {
       // @ts-ignore
      dadosAtualizados.dataHora = new Date(dto.dataHora);
    }

    this.repo.merge(venda, dadosAtualizados);
    return await this.repo.save(venda);
  }

  async remove(id: string) {
    const venda = await this.findOne(id);
    return await this.repo.remove(venda);
  }
}