import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { UserService } from 'src/services/user.service';
import { UserEntity } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async register(@Body() input: RegisterUserDTO): Promise<void | UserEntity> {
    return await this.userService.register(input);
  }
}
