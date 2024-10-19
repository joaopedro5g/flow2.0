import { Injectable } from '@nestjs/common';
import { RegisterEpisodeDTO } from 'src/dto/register-episode.dto';
import { EpisodeEntity } from 'src/entities/episode.entity';
import { EpisodeRepository } from 'src/repositories/episode.repository';

@Injectable()
export class EpisodeService {
  constructor(private readonly repository: EpisodeRepository) {}
  async create(input: RegisterEpisodeDTO): Promise<EpisodeEntity | void> {
    return await this.repository.create(input);
  }

  async findAll() {
    return this.repository.findAll();
  }
}
