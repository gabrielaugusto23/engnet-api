import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from './entidades/usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criar(criarUsuarioDto: CriarUsuarioDto): Promise<UsuarioEntity> {
    const { email, senha } = criarUsuarioDto;

    const usuarioExistente = await this.usuarioRepository.findOneBy({ email });
    if (usuarioExistente) {
      throw new ConflictException('Este email já está cadastrado no sistema');
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = this.usuarioRepository.create({
      ...criarUsuarioDto,
      senha: senhaHash,
    });

    try {
      return await this.usuarioRepository.save(novoUsuario);
    } catch (erro: any) {
      if (erro?.code === '23505') {
        throw new ConflictException('Email já cadastrado');
      }
      throw new BadRequestException('Erro ao criar usuário: ' + (erro?.message || 'desconhecido'));
    }
  }

  async obterTodos(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find({
      select: ['id', 'nome', 'email', 'ativo', 'avatar_url', 'criadoEm'],
    });
  }

  async obterPorId(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async obterPorEmail(email: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOneBy({ email });
  }

  async atualizar(id: string, atualizarUsuarioDto: AtualizarUsuarioDto): Promise<UsuarioEntity> {
    const usuario = await this.obterPorId(id);

    if (atualizarUsuarioDto.senha) {
      const salt = await bcrypt.genSalt(10);
      atualizarUsuarioDto.senha = await bcrypt.hash(atualizarUsuarioDto.senha, salt);
    }

    const usuarioAtualizado = this.usuarioRepository.merge(usuario, atualizarUsuarioDto);

    return this.usuarioRepository.save(usuarioAtualizado);
  }

  async remover(id: string): Promise<void> {
    const usuario = await this.obterPorId(id);
    await this.usuarioRepository.remove(usuario);
  }

  async verificarSenha(senhaPlana: string, senhaHash: string): Promise<boolean> {
    return bcrypt.compare(senhaPlana, senhaHash);
  }
}
