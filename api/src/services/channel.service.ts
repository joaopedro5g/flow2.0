import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterChannelDTO } from 'src/dto/register-channel.dto';
import { ChannelRepository } from 'src/repositories/channel.repository';

@Injectable()
export class ChannelService {
  constructor(private readonly repository: ChannelRepository) {}

  async create(createDto: RegisterChannelDTO) {
    const app = await this.repository.findOne(createDto.name);
    if (app)
      throw new ConflictException({
        message: `${createDto.name} podcast channel exist`,
      });
    return await this.repository.create(createDto);
  }
}
