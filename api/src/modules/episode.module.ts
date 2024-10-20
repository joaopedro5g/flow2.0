import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeController } from 'src/controller/episode.controller';
import { EpisodeEntity } from 'src/entities/episode.entity';
import { InvitedEntity } from 'src/entities/inveted.entity';
import { UserEntity } from 'src/entities/user.entity';
import { EpisodeService } from 'src/services/episode.service';
import { UserModule } from './user.module';
import { EpisodeRepository } from 'src/repositories/episode.repository';
import { UploadService } from 'src/services/upload.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([EpisodeEntity, InvitedEntity, UserEntity]),
    UserModule,
    ClientsModule.register([
      {
        name: 'VIDEO_PROCESSOR',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'video_queue',
          queueOptions: {
            durable: false,
          },
          headers: {
            service: 'API-MAIN',
          },
        },
      },
    ]),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          endpoint: `https://${configService.get('CLOUDFLARE_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
          accessKeyId: configService.get('CLOUDFLARE_ACCESS_KEY'),
          secretAccessKey: configService.get('CLOUDFLARE_KEY_SECRET'),
          signatureVersion: 'v4',
        }),
      },
      services: [S3],
    }),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService, EpisodeRepository, UploadService],
})
export class EpisodeModule {}
