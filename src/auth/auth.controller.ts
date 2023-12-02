import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(
      body.firstName,
      body.lastName,
      body.username,
      body.email,
      body.password,
    );
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body.emailOrUsername, body.password);
  }
}
