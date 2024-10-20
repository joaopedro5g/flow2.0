import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEpisodeDTO } from 'src/dto/register-episode.dto';
import { EpisodeEntity } from 'src/entities/episode.entity';
import { IRepository } from 'src/interfaces/repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodeRepository extends IRepository<EpisodeEntity> {
  constructor(
    @InjectRepository(EpisodeEntity)
    private readonly epRepo: Repository<EpisodeEntity>,
  ) {
    super();
  }
  async create(input: RegisterEpisodeDTO): Promise<EpisodeEntity> {
    const ep = this.epRepo.create(input);
    return await this.epRepo.save(ep);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(input: unknown): Promise<void | EpisodeEntity | EpisodeEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<EpisodeEntity[]> {
    return this.epRepo.find();
  }
}
