import { Body, Controller, Post } from '@nestjs/common';
import { RegisterEpisodeDTO } from 'src/dto/register-episode.dto';
import { EpisodeService } from 'src/services/episode.service';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from 'src/entities/user.entity';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly epService: EpisodeService) {}

  @Auth(Role.ADMIN)
  @Post()
  async create(@Body() ep: RegisterEpisodeDTO) {
    return await this.epService.create(ep);
  }
}
