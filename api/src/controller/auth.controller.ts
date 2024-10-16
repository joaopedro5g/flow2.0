import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() auth: AuthDTO) {
    return await this.authService.login(auth);
  }
}
