import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reembolso } from '../../entity/reembolso/reembolso.entity';
import { CreateReembolsoDto } from './dto/create-reembolso.dto';
import { UpdateReembolsoDto } from './dto/update-reembolso.dto';
import { StatusReembolso } from '../../entity/reembolso/reembolso.enums';
import { UsuariosService } from '../user/usuarios.service';

@Injectable()
export class ReembolsoService {
  constructor(
    @InjectRepository(Reembolso)
    private readonly repo: Repository<Reembolso>,
    private readonly usuariosService: UsuariosService,
  ) {}

  // Recebe o ID do usuário logado separadamente do DTO
  async create(usuarioId: string, dto: CreateReembolsoDto) {
    // Busca o usuário
    const usuario = await this.usuariosService.obterPorId(usuarioId);
    // Cria a entidade
    const reembolso = this.repo.create({
      ...dto,
      dataDespesa: new Date(dto.dataDespesa),
      status: dto.status || StatusReembolso.RASCUNHO,
      usuario: usuario
    });

    return await this.repo.save(reembolso);
  }

  async findAll() {
    return await this.repo.find({
      order: { codigoSequencial: 'DESC' },
      relations: ['usuario'], 
    });
  }

  async findOne(id: string) {
    const reembolso = await this.repo.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!reembolso) throw new NotFoundException(`Reembolso com ID ${id} não encontrado.`);
    return reembolso;
  }

  async update(id: string, dto: UpdateReembolsoDto) {
    const reembolso = await this.findOne(id);
    
    const dadosAtualizados = { ...dto };
    
    if (dto.dataDespesa) {
      // @ts-ignore
      dadosAtualizados.dataDespesa = new Date(dto.dataDespesa);
    }

    this.repo.merge(reembolso, dadosAtualizados);
    return await this.repo.save(reembolso);
  }

  async remove(id: string) {
    const reembolso = await this.findOne(id);
    return await this.repo.remove(reembolso);
  }
}