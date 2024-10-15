import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEpisodeDTO } from 'src/dto/register-episode.dto';
import { EpisodeEntity } from 'src/entities/episode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(EpisodeEntity)
    private readonly epRepo: Repository<EpisodeEntity>,
  ) {}
  async register(input: RegisterEpisodeDTO): Promise<EpisodeEntity> {
    const ep = this.epRepo.create(input);
    return await this.epRepo.save(ep);
  }
}
