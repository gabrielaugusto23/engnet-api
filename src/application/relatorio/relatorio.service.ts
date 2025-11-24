import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relatorio } from '../../entity/relatorio/relatorio.entity';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
import { StatusRelatorio } from '../../entity/relatorio/relatorio.enums';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto';

@Injectable()
export class RelatorioService {
  constructor(
    @InjectRepository(Relatorio)
    private readonly repo: Repository<Relatorio>,
  ) {}

  async create(dto: CreateRelatorioDto) {
    const dataFinal = dto.dataHora ? new Date(dto.dataHora) : new Date();
    const relatorio = this.repo.create({
      ...dto,
      // Define a data de agora
      dataHora: dataFinal, 
      // Status começa processando
      status: StatusRelatorio.PROCESSANDO 
    });
    return await this.repo.save(relatorio);
  }

  async findAll() {
    return await this.repo.find({ order: { dataHora: 'DESC' } });
  }

  async findOne(id: string) {
    const relatorio = await this.repo.findOneBy({ id });
    if (!relatorio) throw new NotFoundException('Relatório não encontrado');
    return relatorio;
  }

  async update(id: string, dto: UpdateRelatorioDto) {
    const relatorio = await this.findOne(id);
    const dadosAtualizados = { ...dto };
    
    if (dto.dataHora) {
      // @ts-ignore
      dadosAtualizados.dataHora = new Date(dto.dataHora);
    }

    this.repo.merge(relatorio, dadosAtualizados);

    // Aqui salva as alterações
    return await this.repo.save(relatorio);
  }
}