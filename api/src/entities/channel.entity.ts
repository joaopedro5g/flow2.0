/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { EpisodeEntity } from './episode.entity';

@Entity('channel')
export class ChannelEntity {
  @PrimaryColumn({ default: randomUUID() })
  id: string;

  @Column()
  name: string;

  @Column()
  backdrop: string;

  @OneToMany((_episode) => EpisodeEntity, (episode) => episode.channel, {
    nullable: true,
  })
  episodes: EpisodeEntity[];
}
