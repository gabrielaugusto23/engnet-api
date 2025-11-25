import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../user/usuarios.service';
import { LogindDto } from './dto/LogindDto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LogindDto) {
    const user = await this.usuariosService.obterParaLogin(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.senha, user.senha))) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        avatar: user.avatarUrl
      }
    };
  }
  
  async logout() {
    return { message: 'Logout realizado com sucesso', status: true };
  }
}