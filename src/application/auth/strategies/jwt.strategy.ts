import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'JWT_SECRET', // Tem que ser igual ao do AuthModule
    });
  }

  async validate(payload: any) {
    // O retorno desse método é injetado automaticamente no objeto 'request.user'
    return { 
      id: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}