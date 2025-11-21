import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {Repository} from "typeorm";
import {UserEntity} from "../../entity/user/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {LogindDto} from "./dto/LogindDto";
import {LoginResponse} from "./response/LoginResponse";

@Injectable()
export class AuthServiceImplemantation  {

    constructor(@InjectRepository(UserEntity)private userRepository : Repository<UserEntity>,private jwtService: JwtService) {}


    async login(login: LogindDto): Promise<LoginResponse> {
        const user = await this.userRepository.findOne({where : { email: login.email }});

        if (!user) {
            throw new Error('O email ou senha estão incorretos');
        }

        const senhaInserida = login.password;
        const senhaHash = user.password;

        const usuarioAutenticado = await bcrypt.compare(senhaInserida, senhaHash);

        if (!usuarioAutenticado) {
          throw new Error('O email ou senha estão incorretos');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
