import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../entity/user/user.entity'; 
import { CriarUsuarioDto } from './dto/create-user.dto';
import { AtualizarUsuarioDto } from './dto/update-user.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usuarioRepository: Repository<UserEntity>,
  ) {}

  async criar(dto: CriarUsuarioDto): Promise<UserEntity> {
    // Aqui Verifica se o email já existe
    const usuarioExistente = await this.usuarioRepository.findOneBy({ email: dto.email });
    if (usuarioExistente) {
      throw new ConflictException('Este email já está cadastrado no sistema.');
    }

    // Aqui acontece a criptografia da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(dto.senha, salt);

    // Cria a instância
    const novoUsuario = this.usuarioRepository.create({
      ...dto,
      senha: senhaHash,
    });

    // Salva e retorna
    return await this.usuarioRepository.save(novoUsuario);
  }

  async obterTodos(): Promise<UserEntity[]> {
    return this.usuarioRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async obterPorId(id: string): Promise<UserEntity> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return usuario;
  }

  async obterParaLogin(email: string): Promise<UserEntity | null> {
    return this.usuarioRepository.findOne({
      where: { email },
      select: ['id', 'nome', 'email', 'senha', 'role', 'ativo', 'avatarUrl'], 
    });
  }

  async atualizar(id: string, dto: AtualizarUsuarioDto): Promise<UserEntity> {
    const usuario = await this.obterPorId(id);

    // Se estiver trocando de email ele verificar se o email daqui já não pertence a outra conta
    if (dto.email && dto.email !== usuario.email) {
      const emailEmUso = await this.usuarioRepository.findOneBy({ email: dto.email });
      if (emailEmUso) {
        throw new ConflictException('Este email já está sendo usado por outro usuário.');
      }
    }

    // Se tiver senha nova ele criptografa a senha
    const dadosAtualizados = { ...dto };
    if (dadosAtualizados.senha) {
      const salt = await bcrypt.genSalt(10);
      dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, salt);
    }

    // Aqui acontece o merge e o salvamento
    this.usuarioRepository.merge(usuario, dadosAtualizados);
    return this.usuarioRepository.save(usuario);
  }

  async remover(id: string): Promise<void> {
    const usuario = await this.obterPorId(id); 
    try {
      await this.usuarioRepository.remove(usuario);
    } catch (error: any) {
      // Código 23503 dn Postgres significa violação de chave estrangeira
      if (error?.code === '23503') {
        throw new BadRequestException(
          // Se esse usuário já está sendo usado em outra tabela retorna esse erro
          'Não é possível excluir este usuário pois ele possui histórico no sistema (Vendas, Reembolsos, etc.). Recomendamos desativá-lo alterando o campo "ativo" para false.',
        );
      }
      throw error;
    }
  }
}