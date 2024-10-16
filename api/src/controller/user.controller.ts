import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly epService: UserService) {}
  @Post()
  async register(@Body() ep: RegisterUserDTO) {
    return await this.epService.register(ep);
  }
}
