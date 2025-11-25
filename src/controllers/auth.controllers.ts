import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from "../application/auth/auth.service";
import { LogindDto } from "../application/auth/dto/LogindDto";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: LogindDto) {
    return await this.authService.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'Realiza logout do usuário' })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso.' })
  async logout() {
    return await this.authService.logout();
  }
  
}