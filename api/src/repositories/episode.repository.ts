import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEpisodeDTO } from 'src/dto/register-episode.dto';
import { EpisodeEntity } from 'src/entities/episode.entity';
import { IRepository } from 'src/interfaces/repository.interface';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';

@Injectable()
export class EpisodeRepository extends IRepository<EpisodeEntity> {
  constructor(
    @InjectRepository(EpisodeEntity)
    private readonly repository: Repository<EpisodeEntity>,
  ) {
    super();
  }
  async create(input: RegisterEpisodeDTO): Promise<EpisodeEntity> {
    const id = randomUUID();
    const ep = this.repository.create({ ...input, id });
    return await this.repository.save(ep);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(input: unknown): Promise<void | EpisodeEntity | EpisodeEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<EpisodeEntity[]> {
    return this.repository.find();
  }
}
