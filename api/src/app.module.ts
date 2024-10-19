import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeModule } from './modules/episode.module';
import { UserModule } from './modules/user.module';
import { FlowConnectModule } from './modules/flow-connect.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
        }),
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('DATABASE_URL'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASS'),
        database: config.get<string>('DATABASE_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    EpisodeModule,
    UserModule,
    FlowConnectModule,
  ],
})
export class AppModule {}
