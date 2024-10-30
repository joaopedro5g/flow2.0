import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepository } from 'src/interfaces/repository.interface';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { RegisterChannelDTO } from 'src/dto/register-channel.dto';
import { ChannelEntity } from 'src/entities/channel.entity';

@Injectable()
export class ChannelRepository extends IRepository<ChannelEntity> {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly repository: Repository<ChannelEntity>,
  ) {
    super();
  }
  async create(input: RegisterChannelDTO): Promise<ChannelEntity> {
    const id = randomUUID();
    const ch = this.repository.create({ ...input, id });
    return await this.repository.save(ch);
  }

  async findOne(
    input: string,
  ): Promise<void | ChannelEntity | ChannelEntity[]> {
    return await this.repository.findOneBy({ id: input });
  }
  async findAll(): Promise<ChannelEntity[]> {
    return await this.repository.find();
  }
}
