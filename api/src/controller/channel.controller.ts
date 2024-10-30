import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { RegisterChannelDTO } from 'src/dto/register-channel.dto';
import { Role } from 'src/entities/user.entity';
import { ChannelService } from 'src/services/channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @Auth(Role.ADMIN)
  @Post()
  async create(@Body() createDto: RegisterChannelDTO) {
    return await this.service.create(createDto);
  }
}
