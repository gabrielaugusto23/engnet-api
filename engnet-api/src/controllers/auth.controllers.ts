import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {AuthServiceImplemantation} from "../application/auth/auth.service";
import {LogindDto} from "../application/auth/dto/LogindDto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServiceImplemantation) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: LogindDto) {
    return await this.authService.login(user);
  }
}
