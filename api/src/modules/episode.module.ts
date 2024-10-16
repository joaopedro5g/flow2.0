import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeController } from 'src/controller/episode.controller';
import { EpisodeEntity } from 'src/entities/episode.entity';
import { InvitedEntity } from 'src/entities/inveted.entity';
import { UserEntity } from 'src/entities/user.entity';
import { EpisodeService } from 'src/services/episode.service';
import { UserModule } from './user.module';
import { EpisodeRepository } from 'src/repositories/episode.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EpisodeEntity, InvitedEntity, UserEntity]),
    UserModule,
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService, EpisodeRepository],
})
export class EpisodeModule {}
