import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelController } from 'src/controller/channel.controller';
import { ChannelEntity } from 'src/entities/channel.entity';
import { ChannelRepository } from 'src/repositories/channel.repository';
import { ChannelService } from 'src/services/channel.service';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity]), UserModule],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelRepository],
})
export class ChannelModule {}
