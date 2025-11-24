import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transacao } from '../../entity/transacao/transacao.entity';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { StatusTransacao } from '../../entity/transacao/transacao.enums';
import { VendaService } from '../venda/venda.service';
import { UsuariosService } from '../user/usuarios.service';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly repo: Repository<Transacao>,
    private readonly vendaService: VendaService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(dto: CreateTransacaoDto) {
   
    const venda = await this.vendaService.findOne(dto.vendaId);
    const usuario = await this.usuariosService.obterPorId(dto.quemRealizouId);

    const dataFinal = dto.dataHora ? new Date(dto.dataHora) : new Date();

    const transacao = this.repo.create({
      ...dto,
      dataHora: dataFinal,
      status: dto.status || StatusTransacao.PENDENTE,
      venda: venda,
      quemRealizou: usuario
    });

    return await this.repo.save(transacao);
  }

  async findAll() {
    return await this.repo.find({
      order: { dataHora: 'DESC' },
      relations: ['venda', 'quemRealizou'], 
    });
  }

  async findOne(id: string) {
    const transacao = await this.repo.findOne({
      where: { id },
      relations: ['venda', 'quemRealizou'],
    });
    if (!transacao) throw new NotFoundException(`Transação com ID ${id} não encontrada.`);
    return transacao;
  }

  async update(id: string, dto: UpdateTransacaoDto) {
    const transacao = await this.findOne(id);

    const dadosAtualizados = { ...dto };
    if (dto.dataHora) {
      // @ts-ignore
      dadosAtualizados.dataHora = new Date(dto.dataHora);
    }

    this.repo.merge(transacao, dadosAtualizados);
    return await this.repo.save(transacao);
  }

  async remove(id: string) {
    const transacao = await this.findOne(id);
    return await this.repo.remove(transacao);
  }
}