import { Body, Controller, Post } from '@nestjs/common';
import { RegisterEpisodeDTO } from 'src/dto/register-episode.dto';
import { EpisodeService } from 'src/services/episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly epService: EpisodeService) {}
  @Post()
  async register(@Body() ep: RegisterEpisodeDTO) {
    return await this.epService.register(ep);
  }
}
